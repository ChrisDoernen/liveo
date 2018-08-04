using Ninject;
using NLog;
using Service.Startup;
using System;
using System.Reflection;
using Topshelf;

namespace Service
{
    class Program
    {
        public static void Main()
        {
            var logger = LogManager.GetCurrentClassLogger();
            logger.Info("Beginning startup...");

            IKernel kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());
            var livestreamService = kernel.Get<LivestreamService>();
            
            var rc = HostFactory.Run(x =>
            {
                x.Service<LivestreamService>(s =>
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
