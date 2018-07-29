using Api.Server;
using NLog;
using Server.Streaming;
using Service.Configuration;
using Service.Entities;

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
            var availableLiveStreams = GetAvailableLiveStreams();
            


            this.HttpServer.Start();
            
            logger.Info("LivestreamService started.");
        }

        public void Stop() {
            this.HttpServer.Stop();
            logger.Info("LivestreamService stopped.");
        }

        private LiveStreams GetAvailableLiveStreams()
        {
            var liveStreamManager = new LiveStreamManager();
            return liveStreamManager.GetAvailableStreams();
        }
    }
}
