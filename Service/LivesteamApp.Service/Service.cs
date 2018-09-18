using LivestreamApp.Shared.Network;
using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Service
{
    public class Service
    {
        private readonly ILogger _logger;
        private readonly IUriConfiguration _uriConfiguration;
        private NancyHost _host;

        public Service(ILogger logger, IUriConfiguration uriConfiguration)
        {
            _logger = logger;
            _uriConfiguration = uriConfiguration;
        }

        public bool Start()
        {
            try
            {
                var uri = _uriConfiguration.GetHttpUri();
                var host = new NancyHost(new Uri(uri));
                _host = host;
                _host.Start();
                _logger.Error("NancyHost started.");
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
                _logger.Error("NancyHost stopped.");
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
