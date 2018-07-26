using Api.Server;
using NLog;

namespace Service.Startup
{
    public class LivestreamService
    {
        private IHttpServer ApiServer;
        private ILogger logger;

        public LivestreamService(IHttpServer httpServer)
        {
            this.ApiServer = httpServer;
            logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            ApiServer.Start();
            logger.Info("LivestreamService started.");
        }

        public void Stop() {
            ApiServer.Stop();
            logger.Info("LivestreamService stopped.");
        }
    }
}