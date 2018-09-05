using AutoMapper;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Service.AppConfiguration;
using LivestreamApp.Shared;
using LivestreamApp.Shared.AppConfiguration;
using Ninject;
using Topshelf;
using Topshelf.Nancy;

namespace LivestreamApp.Service
{
    internal class Program
    {
        public static void Main()
        {
            // Loading AutoMapper profiles
            Mapper.Initialize(config => config.AddProfiles(typeof(ServerProfile)));
            Mapper.AssertConfigurationIsValid();

            // Loading Ninject kernel
            IKernel kernel = new StandardKernel();
            kernel.Load(new ServiceModule(), new SharedModule());
            var livestreamApp = kernel.Get<Service>();

            // Url registration and firewall
            var appSettingsprovider = kernel.Get<IAppSettingsProvider>();
            var port = appSettingsprovider.GetIntValue(AppSetting.DefaultPort);

            // Run Topshelf
            var host = HostFactory.New(x =>
            {
                x.UseNLog();
                x.Service<Service>(s =>
                {
                    s.ConstructUsing(name => livestreamApp);
                    s.WhenStarted(ls => ls.Start());
                    s.WhenStopped(ls => ls.Stop());
                    s.WithNancyEndpoint(x, c =>
                    {
                        c.AddHost(port: port);
                        c.CreateUrlReservationsOnInstall();
                        c.OpenFirewallPortsOnInstall("LivestreamApp.Service");
                    });
                });
                x.RunAsLocalSystem();
                x.RunAsNetworkService();
                x.SetDescription("A service for live streaming app");
                x.SetDisplayName("LivestreamApp.Service");
                x.SetServiceName("LivestreamApp.Service");
            });

            host.Run();
        }
    }
}
