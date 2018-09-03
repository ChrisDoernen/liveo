using AutoMapper;
using Ninject;
using System;
using Topshelf;

namespace LivestreamService.Service
{
    internal class Program
    {
        public static void Main()
        {
            // Loading AutoMapper profiles
            Mapper.Initialize(config => config.AddProfiles(new[] {
                    typeof(Server.AppConfiguration.ServerProfile)
                })
            );
            Mapper.AssertConfigurationIsValid();

            // Loading Ninject kernel
            IKernel kernel = new StandardKernel();
            kernel.Load(new AppConfiguration.ServiceModule());
            var livestreamService = kernel.Get<Startup.LivestreamService>();

            // Run Topshelf
            var rc = HostFactory.Run(x =>
            {
                x.Service<Startup.LivestreamService>(s =>
                {
                    s.ConstructUsing(name => livestreamService);
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
