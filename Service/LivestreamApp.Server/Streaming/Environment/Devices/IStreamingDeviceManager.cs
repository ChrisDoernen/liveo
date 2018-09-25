namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IStreamingDeviceManager
    {
        void InitializeAvailableDevices();
        IStreamingDevice GetDevice(string id);
    }
}
