using LivestreamService.Server.Entities;
using System.Collections.Generic;

namespace LivestreamService.Server.Environment
{
    public interface IAudioHardware
    {
        List<AudioInput> GetAudioInputs();
    }
}