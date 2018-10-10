using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Shutdown
{
    public class ShutdownService : IShutdownService
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;

        public ShutdownService(ILogger logger, IProcessAdapter processAdapter)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _processAdapter = processAdapter ?? throw new ArgumentNullException(nameof(processAdapter));
        }

        public void ShutdownServer()
        {
            var settings = new ProcessSettings("shutdown.exe", "-s -t 10");
            _processAdapter.ExecuteAsync(settings);
            _logger.Info("Shutting down server in 10 seconds.");
        }

        public void RestartServer()
        {
            var settings = new ProcessSettings("shutdown.exe", "-s -t 10");
            _processAdapter.ExecuteAsync(settings);
            _logger.Info("Restarting server in 10 seconds.");
        }
    }
}
