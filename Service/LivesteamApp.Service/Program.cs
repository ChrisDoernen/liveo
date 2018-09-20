using LivestreamApp.Service.AppConfiguration;
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
            // Loading Ninject kernel
            IKernel kernel = new StandardKernel();
            kernel.Load(new ServiceModule(), new SharedModule());
            var livestreamApp = kernel.Get<Service>();

            // Get logger for top level logging
            var logger = kernel.Get<ILoggerFactory>().GetCurrentClassLogger();

            // Url registrations
            var appSettingsprovider = kernel.Get<IAppSettingsProvider>();
            var webServerPort = appSettingsprovider.GetIntValue(AppSetting.DefaultPort);
            var webSocketPort = appSettingsprovider.GetIntValue(AppSetting.DefaultWebSocketPort);

            // Run Topshelf
            var host = HostFactory.New(x =>
            {
                x.UseNLog();
                x.Service<Service>(s =>
                {
                    s.ConstructUsing(name => livestreamApp);
                    s.WhenStarted(ls => ls.Start());
                    s.WhenStopped(ls => ls.Stop());
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
