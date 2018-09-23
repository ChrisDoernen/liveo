using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IAudioDeviceManager
    {
        List<AudioDevice> GetAudioDevices();
    }
}