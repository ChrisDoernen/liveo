using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Sessions.Entities
{
    public class StreamingSessions
    {
        public List<StreamingSession> Sessions = new List<StreamingSession>();

        private readonly ILogger _logger;

        public StreamingSessions(ILogger logger)
        {
            _logger = logger;
        }
    }
}
