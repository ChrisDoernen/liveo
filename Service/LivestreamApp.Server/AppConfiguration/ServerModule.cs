using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Shared.WebSockets;
using LivestreamApp.Server.Shutdown;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Livestreams.Manager;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using LivestreamApp.Server.Streaming.StreamingSources;
using Ninject.Modules;

namespace LivestreamApp.Server.AppConfiguration
{
    public class ServerModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ISessionService>().To<SessionService>().InSingletonScope();
            Bind<ISessionManager>().To<SessionManager>().InSingletonScope();
            Bind<IStreamManager>().To<StreamManager>().InSingletonScope();
            Bind<IProcessSettingsProvider>().To<ProcessSettingsProvider>();
            Bind<IProcessAdapter>().To<ProcessAdapter>();
            Bind<IConfigAdapter>().To<ConfigAdapter>();
            Bind<IStreamingSource>().To<StreamingSource>();
            Bind<IDeviceDetector>().To<DeviceDetector>().InSingletonScope();
            Bind<IStreamingSourceFactory>().To<StreamingSourceFactory>().InSingletonScope();
            Bind<IWebSocketServerAdapter>().To<WebSocketServerAdapter>().InSingletonScope();
            Bind<IWebSocketServiceFactory>().To<WebSocketServiceFactory>().InSingletonScope();

#if DEBUG
            Bind<IShutdownService>().To<ShutdownSimulationService>();
#else
            Bind<IShutdownService>().To<ShutdownService>();
#endif
        }
    }
}
