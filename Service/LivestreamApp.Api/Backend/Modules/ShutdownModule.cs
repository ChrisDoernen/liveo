using LivestreamApp.Server.Shutdown;
using Nancy;
using Nancy.Security;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class ShutdownModule : NancyModule
    {
        public ShutdownModule(ILogger logger, IShutdownService shutdownService)
            : base("/api")
        {
            this.RequiresAuthentication();

            Get["/system/shutdown"] = _ =>
            {
                shutdownService.ShutdownServer();
                return HttpStatusCode.Accepted;
            };

            Get["/system/restart"] = _ =>
            {
                shutdownService.RestartServer();
                return HttpStatusCode.Accepted;
            };
        }
    }
}
