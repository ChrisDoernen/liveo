using LivestreamApp.Server.System;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class SystemModule : NancyModule
    {
        public SystemModule(ILogger logger, ISystemService systemService)
            : base("/api")
        {
            Get["/system/shutdown"] = _ =>
            {
                systemService.ShutdownServer();

                logger.Info($"/system/shutdown was invoked, trying to shot down server.");

                return HttpStatusCode.Accepted;
            };
        }
    }
}
