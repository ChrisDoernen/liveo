using Api.Server;
using NLog;

namespace Service.Startup
{
    public class LivestreamService
    {
        private IHttpServer ApiServer;
        private Logger logger;

        public LivestreamService()
        {
            this.ApiServer = new HttpServer();
            logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            ApiServer.Start();
            logger.Info("LivestreamService started.");
        }

        public void Stop() {
            logger.Info("LivestreamService stopped.");
        }
    }
}