using LivestreamService.Server.Streaming;
using LiveStreamService.Api.Server;
using Ninject.Modules;

namespace LivestreamService.Service.Configuration
{
    public class NinjectDependencies : NinjectModule
    {
        public override void Load()
        {
            Bind<IApiServer>().To<ApiServer>();
            Bind<Startup.LivestreamService>().To<Startup.LivestreamService>();
            Bind<StreamingServer>().To<StreamingServer>();
        }
    }
}