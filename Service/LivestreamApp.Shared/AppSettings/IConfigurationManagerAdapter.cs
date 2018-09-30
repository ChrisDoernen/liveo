namespace LivestreamApp.Shared.AppSettings
{
    public interface IConfigurationManagerAdapter
    {
        string GetAppSetting(string appSetting);
        void SetAppSetting(string appSetting, string newValue);
    }
}
