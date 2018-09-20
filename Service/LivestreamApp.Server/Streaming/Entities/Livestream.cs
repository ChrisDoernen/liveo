using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Environment;
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
        public AudioDevice AudioDevice { get; set; }
        public bool StartOnServiceStartup { get; set; }
        public bool IsStarted { get; set; }
        public bool HasValidAudioInput { get; set; }
        public bool IsInitialized { get; set; }

        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly IStreamerFactory _streamerFactory;
        private readonly ILogger _logger;
        private Mp3Streamer _streamer;
        private string _path;

        public Livestream(ILogger logger, IStreamerFactory streamerFactory,
            IWebSocketServerAdapter webSocketServerAdapter)
        {
            _logger = logger;
            _streamerFactory = streamerFactory;
            _webSocketServerAdapter = webSocketServerAdapter;
        }

        public void Initialize()
        {
            _path = $"/{Id}";
            _streamer = _streamerFactory.GetStreamer(AudioDevice);
            IsInitialized = true;
        }

        public void ValidateAudioInput(List<AudioDevice> audioDevices)
        {
            HasValidAudioInput = audioDevices.FirstOrDefault(d => d.Equals(AudioDevice)) != null;
        }

        public void Start()
        {
            if (IsInitialized && HasValidAudioInput)
            {
                _streamer.Start();
                _webSocketServerAdapter.AddAudioStreamingWebSocketService(_path, AudioDevice);
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
