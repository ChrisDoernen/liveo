using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Streaming.Devices;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public class StreamingSource : IStreamingSource
    {
        public IDevice Device { get; }
        public ContentType ContentType { get; }

        public event EventHandler<MessageReceivedEventArgs> LogLineReceived;
        public event EventHandler<BytesReceivedEventArgs> BytesReceived;

        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;

        public StreamingSource(ILogger logger, IProcessAdapter processAdapter, IDevice device)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            Device = device ?? throw new ArgumentNullException(nameof(device));
            _processAdapter = processAdapter ?? throw new ArgumentNullException(nameof(processAdapter));
            ContentType = (ContentType)Device.DeviceType;
            _logger.Debug($"Initialized a source for {Device.Id}.");
        }

        public bool HasValidDevice()
        {
            return Device.DeviceType != DeviceType.Unknown
                   && Device.DeviceState != DeviceState.Unknown;
        }

        public void StartStreaming()
        {
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            _processAdapter.ErrorDataReceived += StandardErrorDataReceived;
            _processAdapter.ProcessExited += ProcessExitedHandler;
            _processAdapter.ExecuteAndReadBinaryAsync(Device.StreamingProcessSettings);
            _logger.Debug($"Started capturing on input {Device.Id}.");
        }

        public void StopStreaming()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.ProcessExited -= ProcessExitedHandler;
            _processAdapter.ErrorDataReceived -= StandardErrorDataReceived;
            _processAdapter.KillProcess();
            _logger.Debug($"Stopped capturing on input {Device.Id}.");
        }

        private void OutputBytesReceivedHandler(object sender, BytesReceivedEventArgs e)
        {
            // Forward the data from the process to any observer, i.e. streaming services.
            BytesReceived?.Invoke(this, e);
        }

        private void StandardErrorDataReceived(object sender, MessageReceivedEventArgs e)
        {
            LogLineReceived?.Invoke(this, e);
        }

        private void ProcessExitedHandler(object sender, EventArgs e)
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.ErrorDataReceived -= StandardErrorDataReceived;
            _logger.Debug("The process exited.");
        }
    }
}
