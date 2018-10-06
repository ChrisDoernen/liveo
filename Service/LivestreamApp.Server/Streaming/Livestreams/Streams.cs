using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Livestreams
{
    public class Streams
    {
        public List<Stream> StreamList { get; set; } = new List<Stream>();

        private readonly ILogger _logger;

        public Streams(ILogger logger)
        {
            _logger = logger;
        }
    }
}
