using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public class StreamingSource : IStreamingSource
    {
        public IDevice Device { get; }
        public ContentType ContentType { get; }

        public event EventHandler<DataReceivedEventArgs> LogLineReceived;
        public event EventHandler<BytesReceivedEventArgs> BytesReceived;

        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;

        public StreamingSource(ILogger logger, IProcessAdapter processAdapter, IDevice device)
        {
            _logger = logger;
            Device = device;
            _processAdapter = processAdapter;
            ContentType = (ContentType)Device.DeviceType;
            _logger.Info($"Initialized a source for {Device.Id}.");
        }

        public bool HasValidDevice()
        {
            return Device.DeviceType != DeviceType.Unknown
                   && Device.DeviceState != DeviceState.Unknown;
        }

        public void StartStreaming()
        {
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            _processAdapter.ProcessExited += ProcessExitedHandler;
            _processAdapter.ErrorDataReceived += StandardErrorDataReceived;
            _processAdapter.ExecuteAndReadBinaryAsync(Device.StreamingProcessSettings);
            _logger.Info($"Started capturing on input {Device.Id}.");
        }

        public void StopStreaming()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.ProcessExited -= ProcessExitedHandler;
            _processAdapter.ErrorDataReceived -= StandardErrorDataReceived;
            _processAdapter.KillProcess();
            _logger.Info($"Stopped capturing on input {Device.Id}.");
        }

        private void OutputBytesReceivedHandler(object sender, BytesReceivedEventArgs e)
        {
            // Forward the data from the process to any observer, i.e. streaming services.
            BytesReceived?.Invoke(this, e);
        }

        private void StandardErrorDataReceived(object sender, DataReceivedEventArgs e)
        {
            LogLineReceived?.Invoke(this, e);
        }

        private void ProcessExitedHandler(object sender, EventArgs e)
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _logger.Info("The process exited.");
        }
    }
}
