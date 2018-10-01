using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Shutdown
{
    public class ShutdownService : IShutdownService
    {
        private readonly ILogger _logger;
        private readonly IProcessAdapter _processAdapter;

        public ShutdownService(ILogger logger, IProcessAdapter processAdapter)
        {
            _logger = logger;
            _processAdapter = processAdapter;
        }

        public void ShutdownServer()
        {
            var settings = new ProcessSettings("shutdown.exe", "-s -t 10");
            _processAdapter.ExecuteAsync(settings);
            _logger.Info("Shutting down server in 10 seconds.");
        }

        public void RestartServer()
        {
            _logger.Info("Restarting server.");
        }
    }
}
