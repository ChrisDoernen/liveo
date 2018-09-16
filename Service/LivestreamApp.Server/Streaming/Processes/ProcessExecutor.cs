using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;

namespace LivestreamApp.Server.Streaming.Processes
{
    public class ProcessExecutor : IProcessExecutor
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;
        private byte[] _buffer;
        private bool _enableOutputBytesReceivedEvent;

        public delegate void OnStdOutBytesReceived(byte[] streamBytes);
        public event OnStdOutBytesReceived OutputBytesReceived;

        public delegate void OnStdOutDataReceived(object sender, CustomDataReceivedEventArgs e);
        public event OnStdOutDataReceived OutputDataReceived;

        public delegate void OnStdErrDataReceived(object sender, CustomDataReceivedEventArgs e);
        public event OnStdErrDataReceived ErrorDataReceived;

        public delegate void OnProcessReturned(object sender, EventArgs e);
        public event OnProcessReturned ProcessExited;

        public ProcessExecutor(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        ///     Executes the specified process synchronously
        /// </summary>
        /// <param name="processStartInfo">Contains information about the process</param>
        /// <returns>The exit code returned from the process</returns>
        public int ExecuteProcess(ProcessStartInfo processStartInfo)
        {
            Process process = SetupProcessAndStart(processStartInfo);
            process.WaitForExit();
            var exitCode = process.ExitCode;
            process.Dispose();

            _logger.Info($"Process exited with code {exitCode}.");

            return exitCode;
        }

        /// <summary>
        ///     Executes the specified process asynchronously
        /// </summary>
        /// <param name="processStartInfo">Contains information about the process</param>
        public void ExecuteProcessAsync(ProcessStartInfo processStartInfo)
        {
            SetupProcessAndStart(processStartInfo);
        }

        /// <summary>
        ///     Executes the specified process asynchronously with enabled binary output
        ///     using the domain specific buffer size
        /// </summary>
        /// <param name="processStartInfo">Contains information about the process</param>
        /// <param name="bufferSize">The size of the internal buffer</param>
        public void ExecuteProcessAsync(ProcessStartInfo processStartInfo, int bufferSize)
        {
            _enableOutputBytesReceivedEvent = true;
            _buffer = new byte[bufferSize];
            SetupProcessAndStart(processStartInfo);
        }

        private Process SetupProcessAndStart(ProcessStartInfo processStartInfo)
        {
            var process = Process.Start(processStartInfo);
            _process = process;

            if (process == null) throw new Exception("Process handle is null.");

            process.OutputDataReceived += OutDataReceived;
            process.ErrorDataReceived += ErrDataReceived;
            process.Exited += ProcessExit;
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            if (_enableOutputBytesReceivedEvent)
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
