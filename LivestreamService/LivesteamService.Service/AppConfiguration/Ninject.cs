using LivestreamService.Server.Streaming;
using Ninject.Modules;

namespace LivestreamService.Service.AppConfiguration
{
    public class Ninject : NinjectModule
    {
        public override void Load()
        {
            Bind<Startup.LivestreamService>().To<Startup.LivestreamService>();
            Bind<IStreamingServer>().To<StreamingServer>().InSingletonScope();
        }
    }
}