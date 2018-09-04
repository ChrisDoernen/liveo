namespace LivestreamApp.Shared
{
    public interface IAppSettingsProvider
    {
        int GetIntValue(AppSetting setting);
        string GetStringValue(AppSetting setting);
    }
}