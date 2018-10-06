using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public class Sessions
    {
        public List<Session> SessionList { get; set; }

        private readonly ILogger _logger;

        public Sessions(ILogger logger)
        {
            _logger = logger;
        }
    }
}
