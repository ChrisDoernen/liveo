using AutoMapper;
using LivestreamApp.Server.Configuration;
using LivestreamApp.Server.Environment;
using LivestreamApp.Server.Streaming;
using LivestreamApp.Server.Utilities;
using Ninject.Modules;

namespace LivestreamApp.Server.AppConfiguration
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