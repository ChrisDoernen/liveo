using LivestreamService.Service.Configuration;
using Ninject;
using System;
using System.Reflection;
using Topshelf;

namespace LivestreamService.Service
{
    internal class Program
    {
        public static void Main()
        {
            // Loading Ninject kernel
            IKernel kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());
            var livestreamService = kernel.Get<Startup.LivestreamService>();

            // Loading AutoMapper profile
            AutoMapperProfile.Initialize();

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
