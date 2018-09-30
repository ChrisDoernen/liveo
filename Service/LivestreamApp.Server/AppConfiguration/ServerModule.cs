using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.ProcessSettings;
using LivestreamApp.Server.Streaming.StreamingSources;
using Ninject.Modules;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IStreamingService>().To<StreamingService>().InSingletonScope();
            Bind<ILivestreamsConfiguration>().To<LivestreamsConfiguration>();
            Bind<IProcessSettingsProvider>().To<ProcessSettingsProvider>().InSingletonScope();
            Bind<IProcessAdapter>().To<ProcessAdapter>();
            Bind<IStreamingSource>().To<StreamingSource>();
            Bind<IDeviceDetector>().To<DeviceDetector>().InSingletonScope();
            Bind<IStreamingSourceFactory>().To<StreamingSourceFactory>().InSingletonScope();
            Bind<IWebSocketServerAdapter>().To<WebSocketServerAdapter>().InSingletonScope();
            Bind<IWebSocketServiceFactory>().To<WebSocketServiceFactory>().InSingletonScope();
        }
    }
}