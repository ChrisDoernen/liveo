using LivestreamApp.Shared.AppSettings;
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
        private readonly IAppSettingsProvider _appSettingsProvider;
        private NancyHost _nancyHost;

        public Service(ILogger logger, IUriConfiguration uriConfiguration,
            IAppSettingsProvider appSettingsProvider)
        {
            _logger = logger;
            _uriConfiguration = uriConfiguration;
            _appSettingsProvider = appSettingsProvider;
        }

        public bool Start()
        {
            try
            {
                _appSettingsProvider.ValidateAppSettingsKeys();
                StartHttpServer();
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while starting the service.");
                _logger.Error(ex.ToString());
            }

            return true;
        }

        private void StartHttpServer()
        {
            var uri = _uriConfiguration.GetHttpUri();
            var host = new NancyHost(new Uri(uri));
            _nancyHost = host;
            _nancyHost.Start();
            _logger.Info($"Http server started, listening on {uri}.");
        }

        public bool Stop()
        {
            try
            {
                StopHttpServer();
            }
            catch (Exception ex)
            {
                _logger.Error("An exception occurred while stopping the service.");
                _logger.Error(ex.ToString());
            }

            return true;
        }

        private void StopHttpServer()
        {
            _nancyHost.Stop();
            _logger.Info("Http server stopped.");
        }
    }
}
