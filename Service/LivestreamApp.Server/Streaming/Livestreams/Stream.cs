using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Streaming.StreamingSources;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.Livestreams
{
    public class Stream
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

        public Stream(ILogger logger, IWebSocketServerAdapter webSocketServerAdapter,
            IStreamingSourceFactory streamingSourceFactory)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _streamingSourceFactory =
                streamingSourceFactory ?? throw new ArgumentNullException(nameof(streamingSourceFactory));
            _webSocketServerAdapter =
                webSocketServerAdapter ?? throw new ArgumentNullException(nameof(webSocketServerAdapter));
        }

        public void Initialize()
        {
            Source = _streamingSourceFactory.GetStreamingSourceByDeviceId(Input);
            HasValidInputSource = Source.HasValidDevice();
            if (!HasValidInputSource) _logger.Warn($"Stream {Id} has invalid input source.");
            IsInitialized = true;
        }

        public void Start()
        {
            if (IsInitialized && HasValidInputSource && StartOnServiceStartup)
            {
                Source.StartStreaming();
                _webSocketServerAdapter.AddStreamingWebSocketService($"/streams/{Id}", Source);
                _webSocketServerAdapter.AddLoggingWebSocketService($"/streams/log/{Id}", Source);
                IsStarted = true;
            }
        }

        public void Stop()
        {
            if (IsStarted)
            {
                Source.StopStreaming();
                _webSocketServerAdapter.RemoveWebSocketService($"/streams/{Id}");
                _webSocketServerAdapter.RemoveWebSocketService($"/streams/log/{Id}");
                IsStarted = false;
            }
        }
    }
}
