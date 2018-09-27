namespace LivestreamApp.Server.Streaming.ProcessSettings
{
    public interface IProcessSettingsProvider
    {
        IProcessSettings GetListDevicesProcessSettings();
        IProcessSettings GetAudioStreamingProcessSettings(string audioDeviceId);
    }
}