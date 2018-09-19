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
        private readonly IStreamingServiceFactory _streamingServiceFactory;
        private readonly ILogger _logger;

        public Livestream(ILogger logger, IStreamingServiceFactory streamingServiceFactory,
            IUriConfiguration uriConfiguration)
        {
            _streamingServiceFactory = streamingServiceFactory;
            _uriConfiguration = uriConfiguration;
            _logger = logger;
        }

        public void InitializeWebSocketServer()
        {
            var wsUri = _uriConfiguration.GetWsUri();
            _webSocketServer = new WebSocketServer(wsUri);
            _webSocketServer.AddWebSocketService(Id,
                () => _streamingServiceFactory.GetStreamingService(AudioDevice));

            IsInitialized = true;
        }

        public void ValidateAudioInput(List<AudioDevice> audioDevices)
        {
            HasValidAudioInput = audioDevices.FirstOrDefault(d => d.Id == AudioDevice.Id) != null;
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
