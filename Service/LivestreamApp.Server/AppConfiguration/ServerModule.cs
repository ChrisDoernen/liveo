using AutoMapper;
using LivestreamApp.Server.Streaming;
using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.ProcessCommunication;
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