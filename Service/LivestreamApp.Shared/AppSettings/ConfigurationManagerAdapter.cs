using System.Configuration;

namespace LivestreamApp.Shared.AppSettings
{
    public class ConfigurationManagerAdapter : IConfigurationManagerAdapter
    {
        public string GetAppSetting(string appSetting)
        {
            return ConfigurationManager.AppSettings[appSetting];
        }
    }
}
