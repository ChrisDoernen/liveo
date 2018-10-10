using LivestreamApp.Server.Shared.ProcessSettings;
using System;

namespace LivestreamApp.Server.Streaming.Devices
{
    public class Device : IDevice
    {
        public string Id { get; }
        public DeviceState DeviceState { get; set; }
        public DeviceType DeviceType { get; }
        public IProcessSettings StreamingProcessSettings { get; }

        public Device(string deviceId, DeviceType deviceType,
            IProcessSettings streamingProcessSettings)
        {
            Id = deviceId ?? throw new ArgumentNullException(nameof(deviceId));
            StreamingProcessSettings = streamingProcessSettings ?? throw new ArgumentNullException(nameof(streamingProcessSettings));
            DeviceType = deviceType;
            DeviceState = DeviceState.Available;
        }
    }
}
