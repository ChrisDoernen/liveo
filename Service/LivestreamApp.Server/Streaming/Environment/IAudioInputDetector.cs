using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment
{
    public interface IAudioInputDetector
    {
        List<AudioInput> GetAudioInputs();
    }
}