using LivestreamApp.Service.UriReservation;
using LivestreamApp.Shared.AppConfiguration;
using LivestreamApp.Shared.AppSettings;
using Ninject;
using Ninject.Extensions.Logging;
using System;
using Topshelf;

namespace LivestreamApp.Service
{
    internal class Program
    {
        public static void Main()
        {
            // Load Ninject kernel
            IKernel kernel = new StandardKernel();
            kernel.Load(new SharedModule());

            // Validate app settings before startup
            var appSettingsProvider = kernel.Get<IAppSettingsProvider>();
            appSettingsProvider.ValidateAppSettingsKeys();

            // Construct service
            var livestreamApp = kernel.Get<Service>();

            // Get logger for top level logging
            var logFactory = kernel.Get<ILoggerFactory>();
            var logger = logFactory.GetCurrentClassLogger();

            // Get ports  for url registrations
            var webServerPort = appSettingsProvider.GetIntValue(AppSetting.DefaultPort);
            var webSocketPort = appSettingsProvider.GetIntValue(AppSetting.DefaultWebSocketPort);

            // Run Topshelf
            var host = HostFactory.New(x =>
            {
                x.UseNLog();
                x.Service<Service>(s =>
                {
                    s.ConstructUsing(name => livestreamApp);
                    s.WhenStarted(ls => ls.Start());
                    s.WhenStopped(ls => ls.Stop());
                    s.WhenPaused(ls => ls.Stop());
                    s.WhenContinued(ls => ls.Start());
                });
                x.WithUriReservation(r =>
                {
                    r.AddHost("http", "localhost", webServerPort);
                    r.AddHost("ws", "localhost", webSocketPort);
                    r.CreateUrlReservationsOnInstall();
                    r.DeleteReservationsOnUnInstall();
                    r.OpenFirewallPortsOnInstall("LivestreamApp.Service");
                });
                x.OnException(ex =>
                {
                    logger.Error("An top level exception occurred.");
                    logger.Error(ex.ToString());
                });
                x.RunAsLocalSystem();
                x.RunAsNetworkService();
                x.SetDescription("A service for live streaming app");
                x.SetDisplayName("LivestreamApp.Service");
                x.SetServiceName("LivestreamApp.Service");
            });

            host.Run();

            Console.WriteLine("Please press enter to exit.");
            Console.ReadLine();
        }
    }
}
