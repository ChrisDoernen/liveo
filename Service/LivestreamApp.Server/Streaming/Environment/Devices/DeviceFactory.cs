using LivestreamApp.Server.Streaming.Configuration;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class DeviceFactory : IDeviceFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly List<AudioDevice> _audioDevices = new List<AudioDevice>();

        public DeviceFactory(IResolutionRoot kernel)
        {
            _kernel = kernel;
        }

        public AudioDevice GetAudioDevice(string deviceId)
        {
            var streamer = _audioDevices.FirstOrDefault(d => d.Id == deviceId);

            if (streamer != null)
            {
                return streamer;
            }

            var streamingConfiguration = new Mp3StreamingConfiguration();

            var newStreamer = _kernel.Get<AudioDevice>(new ConstructorArgument("id", deviceId),
                new ConstructorArgument("streamingConfiguration", streamingConfiguration));
            _audioDevices.Add(newStreamer);

            return newStreamer;
        }
    }
}
