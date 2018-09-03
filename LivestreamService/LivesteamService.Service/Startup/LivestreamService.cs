using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;

namespace LivestreamService.Service.Startup
{
    public class LivestreamService
    {
        private NancyHost _nancyHost;
        private readonly NancyStartup _nancyStartup;
        private readonly ILogger _logger;

        public LivestreamService(ILogger logger, NancyStartup nancyStartup)
        {
            _logger = logger;
            _nancyStartup = nancyStartup;
        }

        public void Start()
        {
            _nancyHost = _nancyStartup.GetHost();
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
