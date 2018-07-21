using System.Collections.Generic;

namespace Server.Streaming
{
    public interface IStreamingServer
    {
        void StartStreaming();

        IEnumerable<LiveStream> GetStreams();
    }
}
