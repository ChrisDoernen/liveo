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
            Bind<IApiServer>().To<ApiServer>();
            Bind<LivestreamService>().To<LivestreamService>();
            Bind<StreamingServerHost>().To<StreamingServerHost>();
        }
    }
}