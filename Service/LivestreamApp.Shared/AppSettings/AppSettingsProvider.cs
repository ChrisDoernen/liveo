using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Shared.AppSettings
{
    public class AppSettingsProvider : IAppSettingsProvider
    {
        private readonly ILogger _logger;
        private readonly IConfigurationManagerAdapter _configurationManagerAdapter;

        public AppSettingsProvider(ILogger logger,
            IConfigurationManagerAdapter configurationManagerAdapter)
        {
            _logger = logger;
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
                _logger.Error($"Parsing app setting {setting} failed.");
                _logger.Error(ex.ToString());
                throw ex;
            }
        }

        public string GetStringValue(AppSetting setting)
        {
            return GetValue(setting);
        }

        private string GetValue(AppSetting appSetting)
        {
            var setting = appSetting.ToString();

            try
            {
                var value = _configurationManagerAdapter.GetAppSetting(setting);
                return value ?? throw new ArgumentException();
            }
            catch (Exception ex)
            {
                _logger.Error($"AppSetting was not found: {setting}.");
                _logger.Error(ex.ToString());
                throw ex;
            }
        }

        public bool GetBooleanValue(AppSetting appSetting)
        {
            var setting = appSetting.ToString();

            try
            {
                return bool.Parse(_configurationManagerAdapter.GetAppSetting(setting));
            }
            catch (Exception ex)
            {
                _logger.Error($"Parsing app setting {setting} failed.");
                _logger.Error(ex.ToString());
                throw ex;
            }
        }

        public void SetStringValue(AppSetting setting, string newValue)
        {
            _configurationManagerAdapter
                .SetAppSetting(AppSetting.AuthenticationHash.ToString(), newValue);
        }

        public void ValidateAppSettingsKeys()
        {
            _logger.Info("Validating app.config");
            var appSettingKeys = Enum.GetValues(typeof(AppSetting));

            foreach (var key in appSettingKeys)
            {
                var value = _configurationManagerAdapter.GetAppSetting(key.ToString());

                if (value == null)
                {
                    _logger.Error($"AppSetting was not found: {key}.");
                    throw new ArgumentException($"AppSetting was not found: {key}.");
                }
            }

            _logger.Info("app.config is valid.");
        }
    }
}
