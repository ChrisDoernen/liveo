using NLog;
using Server.Configuration;
using System.Collections.Generic;

namespace Server.Streaming
{
    public class StreamingServer : IStreamingServer
    {
        private readonly IConfigurationManager ConfigurationManager;
        private readonly ILogger logger;

        public StreamingServer(IConfigurationManager configurationManager)
        {
            this.ConfigurationManager = configurationManager;
            logger = LogManager.GetCurrentClassLogger();
        }

        public IEnumerable<LiveStream> GetStreams()
        {
            return ConfigurationManager.GetLiveStreamsFromConfig();
        }

        public void Start()
        {
            logger.Info("StreamingServer started.");
        }

        public void Stop()
        {
            logger.Info("StreamingServer stopped.");
        }
    }
}
