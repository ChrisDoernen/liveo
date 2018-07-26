using Api.Server;
using NLog;
using Server.Streaming;

namespace Service.Startup
{
    public class LivestreamService
    {
        private readonly IStreamingServer StreamingServer;
        private readonly IHttpServer HttpServer;
        private readonly ILogger logger;

        public LivestreamService(IStreamingServer streamingServer, IHttpServer httpServer)
        {
            this.StreamingServer = streamingServer;
            this.HttpServer = httpServer;
            logger = LogManager.GetCurrentClassLogger();
        }

        public void Start()
        {
            this.StreamingServer.Start();
            this.HttpServer.Start();
            logger.Info("LivestreamService started.");
        }

        public void Stop() {
            this.StreamingServer.Stop();
            this.HttpServer.Stop();
            logger.Info("LivestreamService stopped.");
        }
    }
}