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
        private NancyHost _nancyHost;

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
                _nancyHost = host;
                _nancyHost.Start();
                _logger.Info($"Http server started, listening on {uri}.");
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while starting the http server.");
                _logger.Error(ex.Message);
            }

            return true;
        }

        public bool Stop()
        {
            try
            {
                _nancyHost.Stop();
                _logger.Info("Http server stopped.");
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while stopping the http server.");
                _logger.Error(ex.Message);
            }

            return true;
        }
    }
}
