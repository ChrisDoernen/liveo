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
            _logger.Info("Starting application service.");

            try
            {
                StartServer();
                return true;
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while starting the service.");
                _logger.Error(ex.ToString());
            }

            return false;
        }

        private void StartServer()
        {
            var uri = _uriConfiguration.GetHttpUri();
            var host = new NancyHost(new Uri(uri));
            _nancyHost = host;
            _nancyHost.Start();
            _logger.Info($"Http server started, listening on {uri}.");
        }

        public bool Stop()
        {
            _logger.Info("Stopping application service.");

            try
            {
                StopServer();
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while stopping the service.");
                _logger.Error(ex.ToString());
            }

            return true;
        }

        private void StopServer()
        {
            _nancyHost.Stop();
            _nancyHost.Dispose();
            _logger.Info("Http server stopped.");
        }
    }
}
