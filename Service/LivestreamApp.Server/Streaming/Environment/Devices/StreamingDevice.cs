using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class StreamingDevice : IStreamingDevice
    {
        public string Id { get; }
        public DeviceType DeviceType { get; }
        public bool IsValidDevice { get; } = true;
        public event EventHandler<BytesReceivedEventArgs> BytesReceived;

        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly ProcessSettings _processSettings;

        public StreamingDevice(ILogger logger, IProcessAdapter processAdapter, string id,
            DeviceType deviceType, IStreamingConfiguration streamingConfiguration)
        {
            Id = id;
            _logger = logger;
            DeviceType = deviceType;
            _processAdapter = processAdapter;
            _processSettings = new ProcessSettings(streamingConfiguration.FileName,
                streamingConfiguration.GetArguments(id), streamingConfiguration.BufferSize);
            _logger.Info($"Initialized device {Id}.");
        }

        public override bool Equals(object obj)
        {
            var audioDevice = (StreamingDevice)obj;
            return audioDevice != null && audioDevice.Id == Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public void StartStreaming()
        {
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            _processAdapter.ProcessExited += ProcessExitedHandler;
            _processAdapter.ExecuteAndReadBinaryAsync(_processSettings);

            _logger.Info($"Started capturing on input {Id}.");
        }

        public void StopStreaming()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.KillProcess();

            _logger.Info($"Stopped capturing on input {Id}.");
        }

        private void OutputBytesReceivedHandler(object sender, BytesReceivedEventArgs e)
        {
            // Forward the data from the process to any observer, i.e. streaming services.
            BytesReceived?.Invoke(this, e);
        }

        private void ProcessExitedHandler(object sender, EventArgs e)
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _logger.Info("The process exited.");
        }
    }
}
