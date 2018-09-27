using LivestreamApp.Server.Streaming.ProcessSettings;

namespace LivestreamApp.Server.Streaming.Devices
{
    public class UnknownDevice : IDevice
    {
        public string Id { get; }
        public DeviceState DeviceState { get; set; } = DeviceState.Unknown;
        public DeviceType DeviceType { get; } = DeviceType.Unknown;
        public IProcessSettings StreamingProcessSettings { get; }

        public UnknownDevice(string id)
        {
            Id = id;
            StreamingProcessSettings = null;
        }
    }
}
