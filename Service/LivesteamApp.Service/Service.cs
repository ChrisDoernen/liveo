using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Service
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
            try
            {
                var host = new NancyHost(new Uri("http://localhost:80"));
                _host = host;
                _host.Start();
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while starting the service.");
                _logger.Error(ex.Message);
            }

            _logger.Info("LivestreamApp.Service started.");
            return true;
        }

        public bool Stop()
        {
            try
            {
                _host.Stop();
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while stopping the service.");
                _logger.Error(ex.Message);
            }

            _logger.Info("LivestreamApp.Service stopped.");
            return true;
        }
    }
}
