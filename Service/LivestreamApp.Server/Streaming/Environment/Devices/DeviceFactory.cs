using LivestreamApp.Server.Streaming.Configuration;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class DeviceFactory : IDeviceFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly IStreamingConfiguration _audioStreamingConfiguration;

        public DeviceFactory(IResolutionRoot kernel)
        {
            _kernel = kernel;
            _audioStreamingConfiguration = new Mp3StreamingConfiguration();
        }

        public IStreamingDevice GetDevice(string deviceId, DeviceType deviceType)
        {
            IStreamingDevice device;

            switch (deviceType)
            {
                case DeviceType.AudioDevice:
                    device = _kernel.Get<IStreamingDevice>(new ConstructorArgument("id", deviceId),
                        new ConstructorArgument("streamingConfiguration", _audioStreamingConfiguration));
                    break;
                default:
                    throw new NotImplementedException("Video streaming is not yet supported.");
            }

            return device;
        }
    }
}
