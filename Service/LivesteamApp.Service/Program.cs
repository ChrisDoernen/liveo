using AutoMapper;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Service.AppConfiguration;
using LivestreamApp.Shared.AppConfiguration;
using Ninject;
using System;
using Topshelf;

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
            var LivestreamApp = kernel.Get<Startup.LivestreamApp>();

            // Run Topshelf
            var rc = HostFactory.Run(x =>
            {
                x.Service<Startup.LivestreamApp>(s =>
                {
                    s.ConstructUsing(name => LivestreamApp);
                    s.WhenStarted(ls => ls.Start());
                    s.WhenStopped(ls => ls.Stop());
                });
                x.RunAsLocalSystem();

                x.SetDescription("A backend service for live streaming audio");
                x.SetDisplayName("Livestream Service");
                x.SetServiceName("Livestream Service");
            });

            var exitCode = (int)Convert.ChangeType(rc, rc.GetTypeCode());
            Environment.ExitCode = exitCode;
        }
    }
}
