using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;

namespace LivestreamService.Service.Startup
{
    public class LivestreamService
    {
        private NancyHost _nancyHost;
        private readonly ILogger _logger;

        public LivestreamService(ILogger logger)
        {
            _logger = logger;
        }

        public void Start()
        {
            _nancyHost = Nancy.GetHost();
            _nancyHost.Start();
            _logger.Info("LivestreamService started.");
        }

        public void Stop()
        {
            _nancyHost.Stop();
            _logger.Info("LivestreamService stopped.");
        }
    }
}
