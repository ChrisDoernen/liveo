using Api.Server;
using Ninject.Modules;
using Server.Streaming;
using Service.Startup;

namespace Api.Configuration
{
    public class Dependencies : NinjectModule
    {
        public override void Load()
        {
            Bind<IHttpServer>().To<HttpServer>();
            Bind<LivestreamService>().To<LivestreamService>();
            Bind<IStreamingServer>().To<StreamingServer>();
        }
    }
}