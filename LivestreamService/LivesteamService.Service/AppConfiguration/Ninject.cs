using AutoMapper;
using LivestreamService.Server.Configuration;
using LivestreamService.Server.Streaming;
using LivestreamService.Server.Utilities;
using Ninject.Modules;

namespace LivestreamService.Service.AppConfiguration
{
    public class Ninject : NinjectModule
    {
        public override void Load()
        {
            Bind<Startup.LivestreamService>().To<Startup.LivestreamService>();
            Bind<StreamingServer>().To<StreamingServer>().InSingletonScope();
            Bind<LivestreamsConfiguration>().To<LivestreamsConfiguration>();
            Bind<AudioConfiguration>().To<AudioConfiguration>();
            Bind<ExternalProcess>().To<ExternalProcess>();
            Bind<IMapper>().ToConstant(Mapper.Instance);
        }
    }
}