using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Shared.Network;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using WebSocketSharp.Server;

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
        private WebSocketServer _webSocketServer;

        private readonly IUriConfiguration _uriConfiguration;
        private readonly IStreamerFactory _streamerFactory;
        private readonly ILogger _logger;

        public Livestream(ILogger logger, IStreamerFactory streamerFactory,
            IUriConfiguration uriConfiguration)
        {
            _streamerFactory = streamerFactory;
            _uriConfiguration = uriConfiguration;
            _logger = logger;
        }

        public void InitializeWebSocketServer()
        {
            var wsUri = _uriConfiguration.GetWsUri();
            var fullWsUri = wsUri + "/" + Id;
            _webSocketServer = new WebSocketServer(fullWsUri);
            _webSocketServer.AddWebSocketService("/mp3",
                () => _streamerFactory.GetStreamingService(AudioDevice));

            IsInitialized = true;
        }

        public void ValidateAudioInput(List<AudioDevice> audioDevices)
        {
            HasValidAudioInput = audioDevices.FirstOrDefault(d => d.Equals(AudioDevice)) != null;
        }

        public void Start()
        {
            _webSocketServer.Start();
            IsStarted = true;
        }

        public void Stop()
        {
            _webSocketServer.Stop();
            IsStarted = false;
        }
    }
}
