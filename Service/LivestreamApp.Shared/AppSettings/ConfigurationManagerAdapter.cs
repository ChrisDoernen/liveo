using System.Configuration;

namespace LivestreamApp.Shared.AppSettings
{
    public class ConfigurationManagerAdapter : IConfigurationManagerAdapter
    {
        public string GetAppSetting(string appSetting)
        {
            return ConfigurationManager.AppSettings[appSetting];
        }

        public void SetAppSetting(string appSetting, string newValue)
        {
            ConfigurationManager.AppSettings[appSetting] = newValue;
        }
    }
}
