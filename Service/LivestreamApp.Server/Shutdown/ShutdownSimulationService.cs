using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Shutdown
{
    public class ShutdownSimulationService : IShutdownService
    {
        private readonly ILogger _logger;

        public ShutdownSimulationService(ILogger logger)
        {
            _logger = logger;
        }

        public void ShutdownServer()
        {
            _logger.Info("Simulating shutting down server - shutdown will not be executed.");
        }

        public void RestartServer()
        {
            _logger.Info("Simulating restarting server - restart will not be executed.");
        }
    }
}
