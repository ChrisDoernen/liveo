namespace LivestreamApp.Server.Streaming.Environment.Devices
{
    public interface IDeviceManager
    {
        AudioDevice GetAudioDevice(string deviceId);
    }
}
