using AutoMapper;
using LivestreamService.Server.Configuration;
using LivestreamService.Server.Utilities;
using Ninject.Modules;

namespace LivestreamService.Server.AppConfiguration
{
    public class Ninject : NinjectModule
    {
        public override void Load()
        {
            Bind<LivestreamsConfiguration>().To<LivestreamsConfiguration>();
            Bind<AudioConfiguration>().To<AudioConfiguration>();
            Bind<IExternalProcess>().To<ExternalProcess>();
            Bind<IMapper>().ToConstant(Mapper.Instance);
        }
    }
}