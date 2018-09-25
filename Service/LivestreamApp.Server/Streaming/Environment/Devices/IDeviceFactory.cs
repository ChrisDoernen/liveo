namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IDeviceFactory
    {
        IStreamingDevice GetDevice(string deviceId, DeviceType deviceType);
    }
}
