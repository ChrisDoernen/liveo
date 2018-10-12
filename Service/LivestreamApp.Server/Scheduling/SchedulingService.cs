using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Scheduling
{
    public class SchedulingService
    {
        private readonly ILogger _logger;

        public SchedulingService(ILogger logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }


    }
}
