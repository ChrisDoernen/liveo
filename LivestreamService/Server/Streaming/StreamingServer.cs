using Server.Configuration;
using System.Collections.Generic;

namespace Server.Streaming
{
    class StreamingServer : IStreamingServer
    {
        private ConfigurationManager configurationManager;

        public StreamingServer()
        {
            this.configurationManager = new ConfigurationManager();
        }

        public IEnumerable<LiveStream> GetStreams()
        {
            return configurationManager.GetLiveStreamsFromConfig();
        }

        public void StartStreaming()
        {
            throw new System.NotImplementedException();
        }
    }
}
