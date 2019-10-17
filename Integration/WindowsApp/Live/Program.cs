using System;
using Topshelf;

namespace Live
{
    public class Program
    {
        private static void Main(string[] args)
        {
            var shell = new Shell();

            var rc = HostFactory.Run(x =>
            {
                x.Service<Shell>(s =>
                {
                    s.ConstructUsing(name => shell);
                    s.WhenStarted(tc => tc.Start());
                    s.WhenStopped(tc => tc.Stop());
                });
                x.RunAsLocalSystem();
                x.UseNLog();
                x.SetDisplayName("Live Server");
                x.SetServiceName("Live Server");
                x.SetDescription("Live Server - For live streaming audio");
                x.OnException(ex =>
                {
                    Console.WriteLine($"An error occurred: {ex.ToString()}.");
                });
            });

            var exitCode = (int)Convert.ChangeType(rc, rc.GetTypeCode());
            Environment.ExitCode = exitCode;
        }
    }
}
