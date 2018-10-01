namespace LivestreamApp.Server.Shared.ProcessSettings
{
    public interface IProcessSettingsProvider
    {
        IProcessSettings GetListDevicesProcessSettings();
        IProcessSettings GetAudioStreamingProcessSettings(string audioDeviceId);
    }
}