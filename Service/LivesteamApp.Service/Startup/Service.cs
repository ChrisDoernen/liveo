using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Service.Startup
{
    public class Service
    {
        private readonly ILogger _logger;

        private NancyHost _host;

        public Service(ILogger logger)
        {
            _logger = logger;
        }

        public bool Start()
        {
            var host = new NancyHost(new Uri("http://localhost"));
            _host = host;
            _host.Start();

            _logger.Info("LivestreamApp.Service started. _____________");
            return true;
        }

        public bool Stop()
        {
            _host.Stop();
            _logger.Info("LivestreamApp.Service stopped. _____________");
            return true;
        }
    }
}
