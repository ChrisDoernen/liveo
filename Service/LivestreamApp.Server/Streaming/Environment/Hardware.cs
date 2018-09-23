using LivestreamApp.Server.Streaming.Environment.Devices;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment
{
    public class Hardware : IHardware
    {
        private readonly IAudioDeviceDetector _audioDeviceDetector;

        public Hardware(IAudioDeviceDetector audioDeviceDetector)
        {
            _audioDeviceDetector = audioDeviceDetector;
        }

        public List<AudioDevice> GetAudioDevices()
        {
            return _audioDeviceDetector.GetAudioDevices();
        }
    }
}
