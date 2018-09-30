using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.System
{
    public class SystemService : ISystemService
    {
        private readonly ILogger _logger;

        public SystemService(ILogger logger)
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
