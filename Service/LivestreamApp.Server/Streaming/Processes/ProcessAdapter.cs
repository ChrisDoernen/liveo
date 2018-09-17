using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;

namespace LivestreamApp.Server.Streaming.Processes
{
    public class ProcessAdapter : IProcessAdapter
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;
        private byte[] _buffer;

        public event EventHandler OutputBytesReceived;
        public event EventHandler OutputDataReceived;
        public event EventHandler ErrorDataReceived;
        public event EventHandler ProcessExited;

        public ProcessAdapter(ILogger logger)
        {
            _logger = logger;
        }

        public int ExecuteAndReadSync(ProcessStartInfo processStartInfo,
            out string output, out string errorOutput)
        {
            Process process = Execute(processStartInfo, false, false);
            process.WaitForExit();
            output = process.StandardOutput.ReadToEnd();
            errorOutput = process.StandardError.ReadToEnd();
            var exitCode = process.ExitCode;

            return exitCode;
        }

        public void ExecuteAndReadAsync(ProcessStartInfo processStartInfo)
        {
            Execute(processStartInfo, true, false);
        }

        public void ExecuteAndReadAsync(ProcessStartInfo processStartInfo, int bufferSize)
        {
            _buffer = new byte[bufferSize];
            Execute(processStartInfo, true, true);
        }

        private Process Execute(ProcessStartInfo processStartInfo,
            bool readAsync, bool readBaseStreamAsync)
        {
            var process = Process.Start(processStartInfo);
            _process = process;

            if (process == null) throw new Exception("Process handle is null.");

            if (readAsync)
            {
                process.OutputDataReceived += OutDataReceived;
                process.BeginOutputReadLine();
            }

            process.ErrorDataReceived += ErrDataReceived;
            process.BeginErrorReadLine();

            process.Exited += ProcessExit;

            if (readBaseStreamAsync)
            {
                process.StandardOutput.BaseStream.BeginRead(
                    _buffer, 0, _buffer.Length, ReadStdOutBaseStream, null);
            }

            _isProcessRunning = true;

            _logger.Info($"Starting external process with PID: {_process.Id}");

            return process;
        }

        public void KillProcess()
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
            var bytesRead = _process.StandardOutput.BaseStream.EndRead(result);

            if (bytesRead > _buffer.Length)
            {
                throw new ArgumentException("The specified buffer size was less than the " +
                                            "chunk size returned from process stdout");
            }

            var memoryStream = new MemoryStream();
            memoryStream.Write(_buffer, 0, bytesRead);
            OutDataReceived(memoryStream.ToArray());

            _process.StandardOutput.BaseStream.BeginRead(_buffer, 0, _buffer.Length,
                ReadStdOutBaseStream, null);
        }

        private void OutDataReceived(byte[] bytes)
        {
            OutputBytesReceived?.Invoke(null, new BytesReceivedEventArgs(bytes));
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

            _logger.Info($"Process exited with code {_process.ExitCode}.");

            _isProcessRunning = false;
            _process.Close();
            _process.Dispose();
        }
    }
}
