using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Service.Startup
{
    public class LivestreamApp
    {
        private NancyHost _nancyHost;
        private readonly NancyStartup _nancyStartup;
        private readonly ILogger _logger;

        public LivestreamApp(ILogger logger, NancyStartup nancyStartup)
        {
            _logger = logger;
            _nancyStartup = nancyStartup;
        }

        public void Start()
        {
            _nancyHost = _nancyStartup.GetHost();
            _nancyHost.Start();
            _logger.Info("LivestreamApp started.");
        }

        public void Stop()
        {
            _nancyHost.Stop();
            _logger.Info("LivestreamApp stopped.");
        }
    }
}
