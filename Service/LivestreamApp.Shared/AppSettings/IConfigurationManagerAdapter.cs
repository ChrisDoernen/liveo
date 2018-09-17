namespace LivestreamApp.Shared.AppSettings
{
    public interface IConfigurationManagerAdapter
    {
        string GetAppSetting(string appSetting);
    }
}