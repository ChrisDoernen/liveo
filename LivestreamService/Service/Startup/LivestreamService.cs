using Api.Server;
using NLog;
using Server.Streaming;

namespace Service.Startup
{
    public class LivestreamService
    {
        private readonly StreamingServerHost streamingServerHost;
        private readonly IApiServer apiServer;
        private readonly ILogger logger;

        public LivestreamService(IApiServer apiServer)
        {
            this.streamingServerHost = StreamingServerHost.GetInstance();
            this.apiServer = apiServer;
            this.logger = LogManager.GetCurrentClassLogger();

            logger.Info("LiveStreamService instantiated.");
        }

        public void Start()
        {
            this.streamingServerHost.Initialize();
            this.apiServer.Start();
            
            logger.Info("LivestreamService started.");
        }

        public void Stop() {
            this.apiServer.Stop();

            logger.Info("LivestreamService stopped.");
        }
    }
}
