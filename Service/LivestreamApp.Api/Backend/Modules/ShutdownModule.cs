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
                logger.Info("api/system/shutdown was invoked, trying to shut down server.");
                shutdownService.ShutdownServer();
                return HttpStatusCode.Accepted;
            };
        }
    }
}
