using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Streamer;
using LivestreamApp.Server.Streaming.WebSockets;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Entities
{
    public class Livestream
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }

        public Device Device { get; set; }
        public bool StartOnServiceStartup { get; set; }
        public bool IsStarted { get; private set; }
        public bool IsInitialized { get; private set; }
        public bool HasValidAudioInput { get; private set; }

        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly IStreamerFactory _streamerFactory;
        private readonly ILogger _logger;
        private IStreamer _streamer;
        private string _path;

        public Livestream(ILogger logger, IStreamerFactory streamerFactory,
            IWebSocketServerAdapter webSocketServerAdapter)
        {
            _logger = logger;
            _streamerFactory = streamerFactory;
            _webSocketServerAdapter = webSocketServerAdapter;
        }

        public void Initialize(List<AudioDevice> audioDevices)
        {
            ValidateAudioInput(audioDevices);
            _path = $"/{Id}";

            if (HasValidAudioInput)
            {
                _streamer = _streamerFactory.GetStreamer(Device);
            }
            else
            {
                _logger.Warn($"Livestream {Id} has invalid audio input.");
            }

            IsInitialized = true;
        }

        public void ValidateAudioInput(List<AudioDevice> audioDevices)
        {
            HasValidAudioInput = audioDevices.FirstOrDefault(d => d.Equals(Device)) != null;
        }

        public void Start()
        {
            if (IsInitialized && HasValidAudioInput && StartOnServiceStartup)
            {
                _streamer.Start();
                _webSocketServerAdapter.AddStreamingWebSocketService(_path, _streamer);
                IsStarted = true;
            }
        }

        public void Stop()
        {
            if (IsStarted)
            {
                _streamer.Stop();
                _webSocketServerAdapter.RemoveWebSocketService(_path);
                IsStarted = false;
            }
        }
    }
}
