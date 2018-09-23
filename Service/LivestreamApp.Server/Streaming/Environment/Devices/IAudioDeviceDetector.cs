using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IAudioDeviceDetector
    {
        List<AudioDevice> GetAudioDevices();
    }
}