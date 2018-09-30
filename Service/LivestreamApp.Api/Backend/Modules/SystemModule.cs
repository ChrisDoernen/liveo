using LivestreamApp.Server.Shutdown;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class SystemModule : NancyModule
    {
        public SystemModule(ILogger logger, IShutdownService shutdownService)
            : base("/api")
        {
            Get["/system/shutdown"] = _ =>
            {
                logger.Info("/system/shutdown was invoked, trying to shut down server.");
                shutdownService.ShutdownServer();
                return HttpStatusCode.Accepted;
            };
        }
    }
}
