using LivestreamApp.Server.Streaming.Environment.Devices;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment
{
    public class Hardware : IHardware
    {
        private readonly IAudioDeviceManager _audioDeviceManager;

        public Hardware(IAudioDeviceManager audioDeviceManager)
        {
            _audioDeviceManager = audioDeviceManager;
        }

        public List<AudioDevice> GetAudioDevices()
        {
            return _audioDeviceManager.GetAudioDevices();
        }
    }
}
