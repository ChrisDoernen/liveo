using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using Ninject.Syntax;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public class StreamingDeviceManger : IStreamingDeviceManager
    {
        private readonly ILogger _logger;
        private readonly IDeviceDetector _deviceDetector;
        private readonly IDeviceFactory _deviceFactory;
        private readonly List<IStreamingDevice> _devices = new List<IStreamingDevice>();
        private IStreamingDevice _invalidDevice;

        public StreamingDeviceManger(IResolutionRoot kernel, ILogger logger,
            IProcessAdapter processAdapter, IDeviceDetector deviceDetector, IDeviceFactory deviceFactory)
        {
            _logger = logger;
            _deviceDetector = deviceDetector;
            _deviceFactory = deviceFactory;
        }

        public void InitializeAvailableDevices()
        {
            _invalidDevice = new InvalidDevice();
            var availableDeviceIds = _deviceDetector.GetAvailableDevices();
            foreach (var deviceId in availableDeviceIds)
            {
                _devices.Add(_deviceFactory.GetDevice(deviceId.Key, deviceId.Value));
                _logger.Info($"Initialized {deviceId}.");
            }
            _logger.Info($"Found {_devices.Count} devices.");
        }

        public IStreamingDevice GetDevice(string id)
        {
            return _devices.DefaultIfEmpty(_invalidDevice).FirstOrDefault(d => d.Id.Equals(id));
        }
    }
}
