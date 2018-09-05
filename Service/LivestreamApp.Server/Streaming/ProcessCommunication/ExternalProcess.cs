using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;

namespace LivestreamApp.Server.Streaming.ProcessCommunication
{
    public class ExternalProcess : IExternalProcess
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;

        public delegate void OnOutDataReceived(object sender, CustomDataReceivedEventArgs e);
        public event OnOutDataReceived OutputDataReceived;

        public delegate void OnErrorDataReceived(object sender, CustomDataReceivedEventArgs e);
        public event OnErrorDataReceived ErrorDataReceived;

        public delegate void OnProcessReturned(object sender, EventArgs e);
        public event OnProcessReturned ProcessExited;


        public ExternalProcess(ILogger logger)
        {
            _logger = logger;
        }

        public int ExecuteCommandAndWaitForExit(string command)
        {
            var processInfo = new ProcessStartInfo("cmd.exe", "/c " + command)
            {
                CreateNoWindow = true,
                UseShellExecute = false,
                RedirectStandardError = true,
                RedirectStandardOutput = true
            };

            var process = Process.Start(processInfo);

            process.OutputDataReceived += OutDataReceived;
            process.ErrorDataReceived += ErrDataReceived;
            process.Exited += ProcessExit;
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            _process = process;
            _isProcessRunning = true;

            _logger.Info("Starting external process.");
            _logger.Info($"Process command: {command}");
            _logger.Info($"PID: {_process.Id}");

            process.WaitForExit();
            return process.ExitCode;
        }

        public void Kill()
        {
            _process.Kill();
            _process.Close();
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
        }
    }
}
