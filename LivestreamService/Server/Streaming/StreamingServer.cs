using Server.Configuration;
using System.Collections.Generic;

namespace Server.Streaming
{
    public class StreamingServer : IStreamingServer
    {
        private readonly IConfigurationManager ConfigurationManager;

        public StreamingServer(IConfigurationManager configurationManager)
        {
            this.ConfigurationManager = configurationManager;
        }

        public IEnumerable<LiveStream> GetStreams()
        {
            return ConfigurationManager.GetLiveStreamsFromConfig();
        }

        public void StartStreaming()
        {
            throw new System.NotImplementedException();
        }
    }
}
