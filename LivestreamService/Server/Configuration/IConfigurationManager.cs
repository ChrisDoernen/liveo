using Server.Streaming;
using System.Collections.Generic;

namespace Server.Configuration
{
    public interface IConfigurationManager
    {
        IEnumerable<LiveStream> GetLiveStreamsFromConfig();
    }
}
