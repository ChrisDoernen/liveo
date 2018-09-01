using LivestreamService.Server.Streaming;
using LiveStreamService.Api.Server;
using NLog;

namespace LivestreamService.Service.Startup
{
    public class LivestreamService
    {
        private readonly StreamingServer _streamingServer;
        private readonly IApiServer _apiServer;
        private readonly ILogger _logger;

        public LivestreamService(IApiServer apiServer)
        {
            _streamingServer = StreamingServer.GetInstance();
            _apiServer = apiServer;
            _logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            _streamingServer.Initialize();
            _streamingServer.StartStreams();
            _apiServer.Start();

            _logger.Info("LivestreamService started.");
        }

        public void Stop()
        {
            _streamingServer.Shutdown();
            _apiServer.Stop();

            _logger.Info("LivestreamService stopped.");
        }
    }
}
