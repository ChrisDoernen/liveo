using Ninject.Modules;

namespace LivestreamApp.Service.AppConfiguration
{
    class ServiceModule : NinjectModule
    {
        public override void Load()
        {
            Bind<Service>().To<Service>();
        }
    }
}
