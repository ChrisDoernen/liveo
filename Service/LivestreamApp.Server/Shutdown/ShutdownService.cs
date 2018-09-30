using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Shutdown
{
    public class ShutdownService : IShutdownService
    {
        private readonly ILogger _logger;

        public ShutdownService(ILogger logger)
        {
            _logger = logger;
        }

        public void ShutdownServer()
        {
            _logger.Info("Shutting down server.");
        }

        public void RestartServer()
        {
            _logger.Info("Restarting server.");
        }
    }
}
