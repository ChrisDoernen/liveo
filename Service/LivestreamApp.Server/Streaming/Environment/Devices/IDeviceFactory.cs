namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IDeviceFactory
    {
        AudioDevice GetAudioDevice(string deviceId);
    }
}
