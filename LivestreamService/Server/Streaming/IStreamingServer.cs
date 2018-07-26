using System.Collections.Generic;

namespace Server.Streaming
{
    public interface IStreamingServer
    {
        void Start();
        void Stop();
        IEnumerable<LiveStream> GetStreams();
    }
}
