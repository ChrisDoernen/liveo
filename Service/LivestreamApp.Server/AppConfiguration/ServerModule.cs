using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Environment.Devices;
using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.WebSockets;
using Ninject.Modules;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IStreamingService>().To<StreamingService>().InSingletonScope();
            Bind<ILivestreamsConfiguration>().To<LivestreamsConfiguration>();
            Bind<IHardware>().To<Hardware>();
            Bind<IProcessAdapter>().To<ProcessAdapter>();
            Bind<IAudioDeviceDetector>().To<AudioDeviceDetector>();
            Bind<AudioDevice>().ToSelf();
            Bind<IDeviceManager>().To<DeviceManager>().InSingletonScope();
            Bind<IWebSocketServerAdapter>().To<WebSocketServerAdapter>().InSingletonScope();
            Bind<IWebSocketServiceFactory>().To<WebSocketServiceFactory>().InSingletonScope();
        }
    }
}