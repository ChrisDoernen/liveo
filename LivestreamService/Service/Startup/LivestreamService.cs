using Api.Server;
using NLog;
using Server.Streaming;

namespace Service.Startup
{
    public class LivestreamService
    {
        private readonly StreamingServer _streamingServerHost;
        private readonly IApiServer _apiServer;
        private readonly ILogger _logger;

        public LivestreamService(IApiServer apiServer)
        {
            _streamingServerHost = StreamingServer.GetInstance();
            _apiServer = apiServer;
            _logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            _streamingServerHost.Initialize();
            _streamingServerHost.StartStreams();
            _apiServer.Start();
            
            _logger.Info("LivestreamService started.");
        }

        public void Stop() {
            _apiServer.Stop();

            _logger.Info("LivestreamService stopped.");
        }
    }
}
