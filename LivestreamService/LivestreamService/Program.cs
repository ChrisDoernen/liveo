using System;
using Topshelf;

namespace LivestreamService
{
    class Program
    {
        public static void Main()
        {
            var rc = HostFactory.Run(x =>
            {
                x.Service<Bootstrapper>(s =>
                {
                    s.ConstructUsing(name => new Bootstrapper());
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
