using Ninject.Modules;

namespace LivestreamApp.Service.AppConfiguration
{
    public class ServiceModule : NinjectModule
    {
        public override void Load()
        {
            Bind<Startup.LivestreamApp>().To<Startup.LivestreamApp>();
            Bind<Startup.NancyStartup>().To<Startup.NancyStartup>();
        }
    }
}