using LivestreamApp.Server.Streaming.Devices;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public class StreamingSourceFactory : IStreamingSourceFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly IDeviceDetector _deviceDetector;

        public StreamingSourceFactory(IResolutionRoot kernel, IDeviceDetector deviceDetector)
        {
            _kernel = kernel ?? throw new ArgumentNullException(nameof(kernel));
            _deviceDetector = deviceDetector ?? throw new ArgumentNullException(nameof(deviceDetector));
        }

        public IStreamingSource GetStreamingSourceByDeviceId(string deviceId)
        {
            var device = _deviceDetector.GetDeviceById(deviceId);
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", device));

            if (device.DeviceState == DeviceState.Available)
                device.DeviceState = DeviceState.InUse;

            return source;
        }
    }
}
