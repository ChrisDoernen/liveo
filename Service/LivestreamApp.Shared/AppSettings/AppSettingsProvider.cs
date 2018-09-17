using System;

namespace LivestreamApp.Shared.AppSettings
{
    public class AppSettingsProvider : IAppSettingsProvider
    {
        private readonly IConfigurationManagerAdapter _configurationManagerAdapter;

        public AppSettingsProvider(IConfigurationManagerAdapter configurationManagerAdapter)
        {
            _configurationManagerAdapter = configurationManagerAdapter;
        }

        public int GetIntValue(AppSetting setting)
        {
            var value = GetValue(setting);
            try
            {
                var convertedValue = Convert.ToInt32(value);
                return convertedValue;
            }
            catch (Exception ex)
            {
                throw new ArgumentException($"Parsing app setting {setting} failed.", ex);
            }
        }

        public string GetStringValue(AppSetting setting)
        {
            return GetValue(setting);
        }

        private string GetValue(AppSetting setting)
        {
            return _configurationManagerAdapter.GetAppSetting(setting.ToString());
        }
    }
}
