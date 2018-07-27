using System.Collections.Generic;

namespace Server.Streaming
{
    public interface IStreamingServer
    {
        void Initialize(IEnumerable<AudioInput> inputs);
        void StartStream(AudioInput input);
        void StopStream(AudioInput input);
        void Shutdown();
    }
}
