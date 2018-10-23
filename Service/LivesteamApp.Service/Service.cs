using LivestreamApp.Shared.Network;
using Nancy.Hosting.Self;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Service
{
    public class Service
    {
        private readonly ILogger _logger;
        private readonly INetworkConfiguration _networkConfiguration;
        private NancyHost _nancyHost;

        public Service(ILogger logger, INetworkConfiguration networkConfiguration)
        {
            _logger = logger;
            _networkConfiguration = networkConfiguration;
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
            var webServerUri = _networkConfiguration.WebServerUri;
            var host = new NancyHost(new Uri(webServerUri));
            _nancyHost = host;
            _nancyHost.Start();
            _logger.Info($"Http server started, listening on {webServerUri}.");
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
