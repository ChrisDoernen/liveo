using Ninject.Modules;

namespace LivestreamApp.Service.AppConfiguration
{
    class ServiceModule : NinjectModule
    {
        public override void Load()
        {
            Bind<Startup.Service>().To<Startup.Service>();
        }
    }
}
