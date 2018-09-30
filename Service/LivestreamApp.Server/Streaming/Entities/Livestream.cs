using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Streaming.StreamingSources;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Streaming.Entities
{
    public class Livestream
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string Input { get; set; }
        public bool StartOnServiceStartup { get; set; }
        public bool IsStarted { get; private set; }
        public bool HasValidInputSource { get; set; }
        public bool IsInitialized { get; set; }

        private IStreamingSource Source { get; set; }

        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly IStreamingSourceFactory _streamingSourceFactory;
        private readonly ILogger _logger;

        public Livestream(ILogger logger, IWebSocketServerAdapter webSocketServerAdapter,
            IStreamingSourceFactory streamingSourceFactory)
        {
            _logger = logger;
            _streamingSourceFactory = streamingSourceFactory;
            _webSocketServerAdapter = webSocketServerAdapter;
        }

        public void Initialize()
        {
            Source = _streamingSourceFactory.GetStreamingSourceByDeviceId(Input);
            HasValidInputSource = Source.HasValidDevice();
            if (!HasValidInputSource) _logger.Warn($"Livestream {Id} has invalid input source.");
            IsInitialized = true;
        }

        public void Start()
        {
            if (IsInitialized && HasValidInputSource && StartOnServiceStartup)
            {
                Source.StartStreaming();
                _webSocketServerAdapter.AddStreamingWebSocketService($"/livestreams/{Id}", Source);
                _webSocketServerAdapter.AddLoggingWebSocketService($"/livestreams/log/{Id}", Source);
                IsStarted = true;
            }
        }

        public void Stop()
        {
            if (IsStarted)
            {
                Source.StopStreaming();
                _webSocketServerAdapter.RemoveWebSocketService($"/livestreams/{Id}");
                _webSocketServerAdapter.RemoveWebSocketService($"/livestreams/log/{Id}");
                IsStarted = false;
            }
        }
    }
}
