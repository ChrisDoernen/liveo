using LivestreamApp.Shared.AppSettings;
using Ninject.Extensions.Logging;
using System;
using System.Security.Cryptography;
using System.Text;

namespace LivestreamApp.Server.Security
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ILogger _logger;
        private readonly IAppSettingsProvider _appSettingsProvider;

        public AuthenticationService(ILogger logger, IAppSettingsProvider appSettingsProvider)
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

        public bool ValidateHash(string input)
        {
            var hash = _appSettingsProvider.GetStringValue(AppSetting.AuthenticationHash);
            var isAuthenticated = VerifyHash(hash, input);
            if (!isAuthenticated) _logger.Warn("Access denied. Wrong hash provided.");
            return isAuthenticated;
        }

        private bool VerifyHash(string hash, string input)
        {
            var comparer = StringComparer.OrdinalIgnoreCase;
            return 0 == comparer.Compare(input, hash);
        }
    }
}
