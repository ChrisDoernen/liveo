using LivestreamApp.Server.Shared.ProcessSettings;

namespace LivestreamApp.Server.Streaming.Devices
{
    public class Device : IDevice
    {
        public string Id { get; }
        public DeviceState DeviceState { get; set; }
        public DeviceType DeviceType { get; }
        public IProcessSettings StreamingProcessSettings { get; }

        public Device(string deviceId, DeviceType deviceType, IProcessSettings streamingProcessSettings)
        {
            Id = deviceId;
            DeviceType = deviceType;
            StreamingProcessSettings = streamingProcessSettings;
            DeviceState = DeviceState.Available;
        }
    }
}
