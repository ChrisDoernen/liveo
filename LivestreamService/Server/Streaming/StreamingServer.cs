using System.Collections.Generic;

namespace Server.Streaming
{
    public class StreamingServer : IStreamingServer
    {
        public void Initialize(IEnumerable<AudioInput> inputs)
        {
            throw new System.NotImplementedException();
        }

        public void Shutdown()
        {
            throw new System.NotImplementedException();
        }

        public void StartStream(AudioInput input)
        {
            throw new System.NotImplementedException();
        }

        public void StopStream(AudioInput input)
        {
            throw new System.NotImplementedException();
        }
    }
}
