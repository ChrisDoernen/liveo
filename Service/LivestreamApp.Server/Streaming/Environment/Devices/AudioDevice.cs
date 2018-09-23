using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.Streamer;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    /// <summary>
    ///     Represents an audio device with an unique id. It can be used for streaming.
    /// </summary>
    public class AudioDevice : Device, IStreamable
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;
        private readonly ProcessSettings _processSettings;

        public AudioDevice(ILogger logger, IProcessAdapter processAdapter, string id,
            IStreamingConfiguration streamingConfiguration) : base(id)
        {
            _logger = logger;
            _processAdapter = processAdapter;
            _processSettings = new ProcessSettings(streamingConfiguration.FileName,
                streamingConfiguration.GetArguments(id), streamingConfiguration.BufferSize);
            _logger.Info($"Initialized audio device {Id}.");
        }

        public event EventHandler<BytesReceivedEventArgs> BytesReceived;

        public void StartStreaming()
        {
            _processAdapter.OutputBytesReceived += OutputBytesReceivedHandler;
            _processAdapter.ProcessExited += ProcessExitedHandler;
            _processAdapter.ExecuteAndReadBinaryAsync(_processSettings);

            _logger.Info($"Started capturing audio on input {Id}.");
        }

        public void StopStreaming()
        {
            _processAdapter.OutputBytesReceived -= OutputBytesReceivedHandler;
            _processAdapter.KillProcess();

            _logger.Info($"Stopped capturing audio on input {Id}.");
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
