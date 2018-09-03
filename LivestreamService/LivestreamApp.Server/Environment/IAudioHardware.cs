using LivestreamApp.Server.Entities;
using System.Collections.Generic;

namespace LivestreamApp.Server.Environment
{
    public interface IAudioHardware
    {
        List<AudioInput> GetAudioInputs();
    }
}