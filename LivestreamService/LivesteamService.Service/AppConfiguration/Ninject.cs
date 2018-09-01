using AutoMapper;
using LivestreamService.Server.Configuration;
using LivestreamService.Server.Streaming;
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
            Bind<AudioInputConfiguration>().To<AudioInputConfiguration>();
            Bind<IMapper>().ToConstant(Mapper.Instance);
        }
    }
}