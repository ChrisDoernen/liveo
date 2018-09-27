using LivestreamApp.Server.Streaming.Devices;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public class StreamingSourceFactory : IStreamingSourceFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly IDeviceDetector _deviceDetector;

        public StreamingSourceFactory(IResolutionRoot kernel, IDeviceDetector deviceDetector)
        {
            _kernel = kernel;
            _deviceDetector = deviceDetector;
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
