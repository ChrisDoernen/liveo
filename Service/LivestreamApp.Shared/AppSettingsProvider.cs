using System;
using System.Configuration;

namespace LivestreamApp.Shared
{
    public class AppSettingsProvider : IAppSettingsProvider
    {
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
            return ConfigurationManager.AppSettings[setting.ToString()];
        }
    }
}
