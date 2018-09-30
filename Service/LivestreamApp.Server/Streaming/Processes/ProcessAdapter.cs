using LivestreamApp.Server.Streaming.ProcessSettings;
using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using WebSocketSharp;

namespace LivestreamApp.Server.Streaming.Processes
{
    public class ProcessAdapter : IProcessAdapter, IDisposable
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;
        private byte[] _buffer;
        private int _exitCode;

        public event EventHandler<BytesReceivedEventArgs> OutputBytesReceived;
        public event EventHandler<DataReceivedEventArgs> OutputDataReceived;
        public event EventHandler<DataReceivedEventArgs> ErrorDataReceived;
        public event EventHandler ProcessExited;

        public ProcessAdapter(ILogger logger)
        {
            _logger = logger;
        }

        public ProcessResult ExecuteAndReadSync(IProcessSettings settings)
        {
            var processStartInfo = GetProcessStartInfo(settings.FileName, settings.Arguments);
            Execute(processStartInfo, false, false);
            var output = _process.StandardOutput.ReadToEnd();
            var errorOutput = _process.StandardError.ReadToEnd();
            _process.WaitForExit();

            return new ProcessResult(_exitCode, output, errorOutput);
        }

        public void ExecuteAndReadAsync(IProcessSettings settings)
        {
            var processStartInfo = GetProcessStartInfo(settings.FileName, settings.Arguments);
            Execute(processStartInfo, true, false);
        }

        public void ExecuteAndReadBinaryAsync(IProcessSettings settings)
        {
            var bufferSize = settings.BufferSize ?? throw new ArgumentException("No buffer size provided.");
            _buffer = new byte[bufferSize];
            var processStartInfo = GetProcessStartInfo(settings.FileName, settings.Arguments);
            Execute(processStartInfo, true, true);
        }

        private ProcessStartInfo GetProcessStartInfo(string file, string arguments)
        {
            return new ProcessStartInfo
            {
                FileName = file,
                Arguments = arguments,
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                StandardOutputEncoding = Encoding.UTF8
            };
        }

        private void Execute(ProcessStartInfo processStartInfo,
            bool readAsync, bool readBaseStreamAsync)
        {
            _process = Process.Start(processStartInfo);

            if (_process == null) throw new Exception("Process handle is null.");

            _isProcessRunning = true;
            _process.EnableRaisingEvents = true;
            _process.Exited += ProcessExit;

            if (readAsync)
            {
                //_process.OutputDataReceived += OutDataReceived;
                //_process.BeginOutputReadLine();
                _process.ErrorDataReceived += ErrDataReceived;
                _process.BeginErrorReadLine();
            }

            if (readBaseStreamAsync)
            {
                new Task(ReadBaseStream).Start();
            }

            _logger.Info($"Started {processStartInfo.FileName} with PID: {_process.Id}");
        }

        public void KillProcess()
        {
            _process.Kill();
            _isProcessRunning = false;

            _logger.Info($"Killed process wit PID {_process.Id}.");
        }

        public bool IsRunning()
        {
            return _isProcessRunning;
        }

        public bool IsResponding()
        {
            return _process.Responding;
        }

        private async void ReadBaseStream()
        {
            while (_process.HasExited == false)
            {
                var length = await _process.StandardOutput.BaseStream.ReadAsync(_buffer, 0, _buffer.Length);
                OutDataReceived(_buffer.SubArray(0, length));
            }
        }

        private void OutDataReceived(byte[] bytes)
        {
            OutputBytesReceived?.Invoke(null, new BytesReceivedEventArgs(bytes));
        }

        private void OutDataReceived(object sender, DataReceivedEventArgs e)
        {
            OutputDataReceived?.Invoke(sender, e);
        }

        private void ErrDataReceived(object sender, DataReceivedEventArgs e)
        {
            ErrorDataReceived?.Invoke(sender, e);
        }

        private void ProcessExit(object sender, EventArgs e)
        {
            _exitCode = _process.ExitCode;
            _isProcessRunning = false;
            _logger.Info($"Process exited with code {_exitCode}.");
            ProcessExited?.Invoke(sender, e);
        }

        public void Dispose()
        {
            _process?.Close();
            _process?.Dispose();
            _logger.Info("Process disposed.");
        }
    }
}
