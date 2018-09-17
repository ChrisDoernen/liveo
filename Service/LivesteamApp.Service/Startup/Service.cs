using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Service.Startup
{
    public class Service
    {
        private readonly ILogger _logger;

        private NancyHost host;

        public Service(ILogger logger)
        {
            _logger = logger;
        }

        public bool Start()
        {
            host = new NancyHost(new Uri("http://localhost"));

            _logger.Info("LivestreamApp.Service started. _____________");
            return true;
        }

        public bool Stop()
        {
            host.Stop();
            _logger.Info("LivestreamApp.Service stopped. _____________");
            return true;
        }
    }
}
