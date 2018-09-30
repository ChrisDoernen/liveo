using LivestreamApp.Shared.AppSettings;
using LivestreamApp.Shared.Network;
using LivestreamApp.Shared.Security;
using Ninject.Modules;

namespace LivestreamApp.Shared.AppConfiguration
{
    public class SharedModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IAppSettingsProvider>().To<AppSettingsProvider>();
            Bind<IConfigurationManagerAdapter>().To<ConfigurationManagerAdapter>();
            Bind<IUriConfiguration>().To<UriConfiguration>();
            Bind<IAuthenticationProvider>().To<AuthenticationProvider>();
        }
    }
}