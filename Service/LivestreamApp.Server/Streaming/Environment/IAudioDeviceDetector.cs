using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment
{
    public interface IAudioDeviceDetector
    {
        List<AudioDevice> GetAudioDevices();
    }
}