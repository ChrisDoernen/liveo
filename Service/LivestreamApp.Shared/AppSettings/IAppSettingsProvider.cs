namespace LivestreamApp.Shared.AppSettings
{
    public interface IAppSettingsProvider
    {
        int GetIntValue(AppSetting setting);
        string GetStringValue(AppSetting setting);
        bool GetBooleanValue(AppSetting setting);
        void SetStringValue(AppSetting setting, string newValue);
        void ValidateAppSettingsKeys();
    }
}
