using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Utilities;
using Nancy.Security;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Shared.Authentication
{
    public class AuthenticationProvider : IAuthenticationProvider, IDisposable
    {
        private readonly ILogger _logger;
        private readonly IAppSettingsProvider _appSettingsProvider;
        private readonly IHashGenerator _hashGenerator;

        public AuthenticationProvider(ILogger logger, IAppSettingsProvider appSettingsProvider,
            IHashGenerator hashGenerator)
        {
            _logger = logger;
            _hashGenerator = hashGenerator;
            _appSettingsProvider = appSettingsProvider;
        }

        public void SetAuthenticationHash(string password)
        {
            var md5Hash = _hashGenerator.GetMd5Hash(password);
            _appSettingsProvider.SetStringValue(AppSetting.AuthenticationHash, md5Hash);
        }

        public IUserIdentity Validate(string input)
        {
            var hash = _appSettingsProvider.GetStringValue(AppSetting.AuthenticationHash);
            var isAuthenticated = VerifyHash(hash, input);
            if (!isAuthenticated) _logger.Warn("Access denied. Wrong hash provided.");

            return isAuthenticated
                ? new UserIdentity("Admin", new List<string> { "ACCESS-BACKEND" })
                : null;
        }

        private bool VerifyHash(string hash, string input)
        {
            var comparer = StringComparer.OrdinalIgnoreCase;
            return 0 == comparer.Compare(input, hash);
        }

        public void Dispose()
        {
            _hashGenerator.Dispose();
        }
    }
}
