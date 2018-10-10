using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions
{
    public class Sessions
    {
        public List<Session> SessionList = new List<Session>();

        private readonly ILogger _logger;

        public Sessions(ILogger logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    }
}
