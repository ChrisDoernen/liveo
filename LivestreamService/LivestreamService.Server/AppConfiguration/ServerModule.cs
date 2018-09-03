using AutoMapper;
using LivestreamService.Server.Configuration;
using LivestreamService.Server.Environment;
using LivestreamService.Server.Streaming;
using LivestreamService.Server.Utilities;
using Ninject.Modules;

namespace LivestreamService.Server.AppConfiguration
{
    public class ServerModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IStreamingServer>().To<StreamingServer>().InSingletonScope();
            Bind<ILivestreamsConfiguration>().To<LivestreamsConfiguration>();
            Bind<IAudioHardware>().To<AudioHardware>();
            Bind<IExternalProcess>().To<ExternalProcess>();
            Bind<IMapper>().ToConstant(Mapper.Instance);
        }
    }
}