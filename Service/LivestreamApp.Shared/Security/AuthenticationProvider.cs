using LivestreamApp.Shared.AppSettings;
using Nancy.Security;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace LivestreamApp.Shared.Security
{
    public class AuthenticationProvider : IAuthenticationProvider
    {
        private readonly ILogger _logger;
        private readonly IAppSettingsProvider _appSettingsProvider;

        public AuthenticationProvider(ILogger logger, IAppSettingsProvider appSettingsProvider)
        {
            _logger = logger;
            _appSettingsProvider = appSettingsProvider;
        }

        public void SetAuthenticationHash(string password)
        {
            var md5Hash = GetMd5Hash(password);
            _appSettingsProvider.SetStringValue(AppSetting.AuthenticationHash, md5Hash);
        }

        private string GetMd5Hash(string password)
        {
            var md5Hash = MD5.Create();
            var bytes = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
            var sBuilder = new StringBuilder();

            foreach (var b in bytes)
            {
                sBuilder.Append(b.ToString("x2"));
            }

            return sBuilder.ToString();
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
    }
}
