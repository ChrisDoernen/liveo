using Ninject.Modules;

namespace LivestreamService.Shared.AppConfiguration
{
    public class SharedModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IAppSettingsProvider>().To<AppSettingsProvider>();
        }
    }
}