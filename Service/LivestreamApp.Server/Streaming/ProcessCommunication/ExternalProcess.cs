using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;

namespace LivestreamApp.Server.Streaming.ProcessCommunication
{
    public class ExternalProcess : IExternalProcess
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;
        private byte[] _buffer;

        public delegate void OnStdOutBytesReceived(byte[] streamBytes);
        public event OnStdOutBytesReceived OutputBytesReceived;

        public delegate void OnStdOutDataReceived(object sender, CustomDataReceivedEventArgs e);
        public event OnStdOutDataReceived OutputDataReceived;

        public delegate void OnStdErrDataReceived(object sender, CustomDataReceivedEventArgs e);
        public event OnStdErrDataReceived ErrorDataReceived;

        public delegate void OnProcessReturned(object sender, EventArgs e);
        public event OnProcessReturned ProcessExited;

        public ExternalProcess(ILogger logger)
        {
            _logger = logger;
        }

        public int ExecuteCommand(string command)
        {
            Process process = SetupProcess(command);
            process.WaitForExit();
            var exitCode = process.ExitCode;
            process.Dispose();

            return exitCode;
        }

        public void ExecuteCommandAsync(string command)
        {
            Process process = SetupProcess(command);
        }

        private Process SetupProcess(string command)
        {
            var processInfo = new ProcessStartInfo("cmd.exe", "/c " + command)
            {
                CreateNoWindow = true,
                UseShellExecute = false,
                RedirectStandardError = true,
                RedirectStandardOutput = true
            };

            var process = Process.Start(processInfo);
            _process = process;

            if (process == null) throw new Exception("Process handle is null.");

            process.OutputDataReceived += OutDataReceived;
            process.ErrorDataReceived += ErrDataReceived;
            process.Exited += ProcessExit;
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            process.StandardOutput.BaseStream.BeginRead(
                _buffer, 0, _buffer.Length, ReadStdOutBaseStream, null);

            _isProcessRunning = true;

            _logger.Info("Starting external process.");
            _logger.Info($"Process command: {command}");
            _logger.Info($"PID: {_process.Id}");

            return process;
        }

        public void Kill()
        {
            _process.Kill();
            _process.Close();
            _process.Dispose();
            _isProcessRunning = false;

            _logger.Info($"Killed external process wit PID {_process.Id}.");
        }

        public bool IsRunning()
        {
            return _isProcessRunning;
        }

        public bool IsResponding()
        {
            return _process.Responding;
        }

        private void ReadStdOutBaseStream(IAsyncResult result)
        {
            int bytesRead = _process.StandardOutput.BaseStream.EndRead(result);
            var memoryStream = new MemoryStream();
            memoryStream.Write(_buffer, 0, bytesRead);
            OutDataReceived(memoryStream.ToArray());

            _process.StandardOutput.BaseStream.BeginRead(_buffer, 0, _buffer.Length,
                ReadStdOutBaseStream, null);
        }

        private void OutDataReceived(byte[] bytes)
        {
            OutputBytesReceived?.Invoke(bytes);
        }

        private void OutDataReceived(object sender, DataReceivedEventArgs e)
        {
            OutputDataReceived?.Invoke(sender, new CustomDataReceivedEventArgs(e));
        }

        private void ErrDataReceived(object sender, DataReceivedEventArgs e)
        {
            ErrorDataReceived?.Invoke(sender, new CustomDataReceivedEventArgs(e));
        }

        private void ProcessExit(object sender, EventArgs e)
        {
            ProcessExited?.Invoke(sender, e);
            _isProcessRunning = false;
        }
    }
}
