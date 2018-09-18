using AutoMapper;
using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Ninject.Modules;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IStreamingServerCore>().To<StreamingServerCore>().InSingletonScope();
            Bind<ILivestreamsConfiguration>().To<LivestreamsConfiguration>();
            Bind<IHardware>().To<Hardware>();
            Bind<IProcessAdapter>().To<ProcessAdapter>();
            Bind<IMapper>().ToConstant(Mapper.Instance);
            Bind<IAudioDeviceDetector>().To<AudioDeviceDetector>();
            Bind<IStreamingService>().To<StreamingService>();
            Bind<IStreamingServiceFactory>().To<StreamingServiceFactory>();
        }
    }
}