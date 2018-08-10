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
            this._streamingServerHost = StreamingServer.GetInstance();
            this._apiServer = apiServer;
            this._logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            this._streamingServerHost.Initialize();
            this._streamingServerHost.StartStreams();
            this._apiServer.Start();
            
            _logger.Info("LivestreamService started.");
        }

        public void Stop() {
            this._apiServer.Stop();

            _logger.Info("LivestreamService stopped.");
        }
    }
}
