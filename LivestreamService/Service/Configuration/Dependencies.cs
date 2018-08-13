using Api.Server;
using Ninject.Modules;
using Server.Streaming;
using Service.Startup;

namespace Service.Configuration
{
    public class Dependencies : NinjectModule
    {
        public override void Load()
        {
            Bind<IApiServer>().To<ApiServer>();
            Bind<LivestreamService>().To<LivestreamService>();
            Bind<StreamingServer>().To<StreamingServer>();
        }
    }
}