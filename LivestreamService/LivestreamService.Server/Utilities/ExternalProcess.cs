using Ninject.Extensions.Logging;
using System.Diagnostics;

namespace LivestreamService.Server.Utilities
{
    public class ExternalProcess
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;

        public delegate void OnOutDataReceived(object sender, DataReceivedEventArgs e);
        public event OnOutDataReceived OutDataReceived;

        public delegate void OnErrorDataReceived(object sender, DataReceivedEventArgs e);
        public event OnErrorDataReceived ErrDataReceived;

        public delegate void OnProcessReturned(object sender, DataReceivedEventArgs e);
        public event OnProcessReturned ProcessReturned;


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

            process.OutputDataReceived += OutputDataReceived;
            process.ErrorDataReceived += ErrorDataReceived;
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            _process = process;
            _isProcessRunning = true;

            _logger.Info($"Starting external process with command {command} and PID {_process.Id}");

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

        private void OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            OutDataReceived?.Invoke(sender, e);
        }

        private void ErrorDataReceived(object sender, DataReceivedEventArgs e)
        {
            ErrDataReceived?.Invoke(sender, e);
        }
    }
}
