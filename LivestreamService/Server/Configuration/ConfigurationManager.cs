using Server.Streaming;
using System.Collections.Generic;

namespace Server.Configuration
{
    public class ConfigurationManager : IConfigurationManager
    {
        public IEnumerable<LiveStream> GetLiveStreamsFromConfig()
        {
            var stream = new LiveStream("Deutsch", "Originalton", "de", "Mikrofon (2- USB Audio Device)");

            var streams = new List<LiveStream>();
            streams.Add(stream);

            return streams;
        }
    }
}
