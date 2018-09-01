using LivestreamService.Server.Streaming;
using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;

namespace LivestreamService.Service.Startup
{
    public class LivestreamService
    {
        private readonly StreamingServer _streamingServer;
        private readonly NancyHost _nancyHost;
        private readonly ILogger _logger;

        public LivestreamService(ILogger logger, StreamingServer streamingServer)
        {
            _logger = logger;
            _streamingServer = streamingServer;
            _nancyHost = AppConfiguration.Nancy.GetHost();
        }

        public void Start()
        {
            _streamingServer.Start();
            _nancyHost.Start();

            _logger.Info("LivestreamService started.");
        }

        public void Stop()
        {
            _streamingServer.Stop();
            _nancyHost.Stop();

            _logger.Info("LivestreamService stopped.");
        }
    }
}
