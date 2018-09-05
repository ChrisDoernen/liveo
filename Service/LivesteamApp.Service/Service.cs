using Ninject.Extensions.Logging;

namespace LivestreamApp.Service
{
    public class Service
    {
        private readonly ILogger _logger;

        public Service(ILogger logger)
        {
            _logger = logger;
        }

        public bool Start()
        {
            _logger.Info("LivestreamApp.Service started. _____________");
            return true;
        }

        public bool Stop()
        {
            _logger.Info("LivestreamApp.Service stopped. _____________");
            return true;
        }
    }
}
