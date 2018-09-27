using LivestreamApp.Server.Streaming.StreamingSources;
using LivestreamApp.Server.Streaming.WebSockets;
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

        private bool IsInitialized { get; set; }
        private bool HasValidInputSource { get; set; }
        private IStreamingSource Source { get; set; }

        private readonly IWebSocketServerAdapter _webSocketServerAdapter;
        private readonly IStreamingSourceManager _streamingSourceManager;
        private readonly ILogger _logger;
        private string _path;

        public Livestream(ILogger logger, IWebSocketServerAdapter webSocketServerAdapter,
            IStreamingSourceManager streamingSourceManager)
        {
            _logger = logger;
            _streamingSourceManager = streamingSourceManager;
            _webSocketServerAdapter = webSocketServerAdapter;
        }

        public void Initialize()
        {
            Source = _streamingSourceManager.GetDevice(Id);
            HasValidInputSource = Source.IsValidDevice;
            if (!HasValidInputSource) _logger.Warn($"Livestream {Id} has invalid input source.");
            _path = $"/{Id}";
            IsInitialized = true;
        }

        public void Start()
        {
            if (IsInitialized && HasValidInputSource && StartOnServiceStartup)
            {
                Source.StartStreaming();
                _webSocketServerAdapter.AddStreamingWebSocketService(_path, Source);
                IsStarted = true;
            }
            else
            {
                _logger.Info(
                    $"Livestream {Id} was not started because one of the following is false: " +
                    $"IsInitialized: {IsInitialized}, HasValidInputSource: {HasValidInputSource}, " +
                    $"Start on service startup {StartOnServiceStartup}.");
            }
        }

        public void Stop()
        {
            if (IsStarted)
            {
                Source.StopStreaming();
                _webSocketServerAdapter.RemoveWebSocketService(_path);
                IsStarted = false;
            }
        }
    }
}
