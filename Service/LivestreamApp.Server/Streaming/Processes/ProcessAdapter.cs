﻿using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;

namespace LivestreamApp.Server.Streaming.Processes
{
    public class ProcessAdapter : IProcessAdapter, IDisposable
    {
        private readonly ILogger _logger;
        private Process _process;
        private bool _isProcessRunning;
        private byte[] _buffer;
        private int _exitCode;

        public event EventHandler OutputBytesReceived;
        public event EventHandler OutputDataReceived;
        public event EventHandler ErrorDataReceived;
        public event EventHandler ProcessExited;

        public ProcessAdapter(ILogger logger)
        {
            _logger = logger;
        }

        public ProcessResult ExecuteAndReadSync(ProcessStartInfo processStartInfo)
        {
            Execute(processStartInfo, false, false);

            var output = _process.StandardOutput.ReadToEnd();
            var errorOutput = _process.StandardError.ReadToEnd();
            _process.WaitForExit();

            return new ProcessResult(_exitCode, output, errorOutput);
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
                _process.OutputDataReceived += OutDataReceived;
                _process.BeginOutputReadLine();
                _process.ErrorDataReceived += ErrDataReceived;
                _process.BeginErrorReadLine();
            }

            if (readBaseStreamAsync)
            {
                _process.StandardOutput.BaseStream.BeginRead(
                    _buffer, 0, _buffer.Length, ReadStdOutBaseStream, null);
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