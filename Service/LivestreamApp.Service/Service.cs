using LivestreamApp.Service.AppConfiguration;
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
        private readonly NancyBootstrapper _nancyBootstrapper;
        private NancyHost _nancyHost;

        public Service(ILogger logger, INetworkConfiguration networkConfiguration,
            NancyBootstrapper nancyBootstrapper)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _networkConfiguration = networkConfiguration ?? throw new ArgumentNullException(nameof(networkConfiguration));
            _nancyBootstrapper = nancyBootstrapper ?? throw new ArgumentNullException(nameof(nancyBootstrapper));
        }

        public bool Start()
        {
            _logger.Info("Starting application service.");

            try
            {
                StartWebServer();
                return true;
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while starting the service.");
                _logger.Error(ex.ToString());
            }

            return false;
        }

        private void StartWebServer()
        {
            var webServerUri = _networkConfiguration.WebServerUri;
            var hostConfiguration = new HostConfiguration { UrlReservations = { CreateAutomatically = true } };
            var host = new NancyHost(_nancyBootstrapper, hostConfiguration, new Uri(webServerUri));
            _nancyHost = host;
            _nancyHost.Start();
            _logger.Info($"Http server started, listening on {webServerUri}.");
        }

        public bool Stop()
        {
            _logger.Info("Stopping application service.");

            try
            {
                StopWebServer();
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while stopping the service.");
                _logger.Error(ex.ToString());
            }

            return true;
        }

        private void StopWebServer()
        {
            _nancyHost.Stop();
            _nancyHost.Dispose();
            _logger.Info("Http server stopped.");
        }
    }
}
