using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Extensions.Logging;
using Ninject.Syntax;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public class StreamingSourceManger : IStreamingSourceManager
    {
        private readonly ILogger _logger;
        private readonly IDeviceDetector _deviceDetector;
        private readonly IStreamingSourceFactory _streamingSourceFactory;
        private readonly List<IStreamingSource> _devices = new List<IStreamingSource>();
        private IStreamingSource _invalidSource;

        public StreamingSourceManger(IResolutionRoot kernel, ILogger logger,
            IProcessAdapter processAdapter, IDeviceDetector deviceDetector,
            IStreamingSourceFactory streamingSourceFactory)
        {
            _logger = logger;
            _deviceDetector = deviceDetector;
            _streamingSourceFactory = streamingSourceFactory;
        }

        public void InitializeAvailableSources()
        {
            _invalidSource = new InvalidSource();
            var availableDeviceIds = _deviceDetector.DetectAvailableDevices();
            foreach (var deviceId in availableDeviceIds)
            {
                _devices.Add(_streamingSourceFactory.GetDevice(deviceId.Key, deviceId.Value));
                _logger.Info($"Initialized {deviceId}.");
            }
            _logger.Info($"Found {_devices.Count} devices.");
        }

        public IStreamingSource GetStreamingSourceByDeviceId(string id)
        {
            // Id matches an available device
            // -> return source from device and set device to in use
            var device = _deviceDetector.Devices.Where(d => d.Id == id);

            // No device with id is found or device is already in use
            // -> return__ set livestream invalid input



            return _devices.DefaultIfEmpty(_invalidSource).FirstOrDefault(d => d.Id.Equals(id));
        }
    }
}
