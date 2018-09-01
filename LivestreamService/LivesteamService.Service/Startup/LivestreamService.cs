using LivestreamService.Server.Streaming;
using LivestreamService.Service.Configuration;
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
            _nancyHost = NancySetup.GetHost();
        }

        public void Start()
        {
            //_streamingServer.Initialize();
            //_streamingServer.StartStreams();
            _nancyHost.Start();

            _logger.Info("LivestreamService started.");
        }

        public void Stop()
        {
            //_streamingServer.Shutdown();
            _nancyHost.Stop();

            _logger.Info("LivestreamService stopped.");
        }
    }
}
