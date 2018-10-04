using LivestreamApp.Server.Streaming.Sessions;
using LivestreamApp.Server.Streaming.Sessions.Entities;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class SessionsModule : NancyModule
    {
        public SessionsModule(ILogger logger, ISessionsManager sessionsManager)
            : base("/api")
        {
            this.RequiresAuthentication();

            Get["/sessions"] = _ =>
            {
                logger.Info("GET request on api/sessions.");
                return sessionsManager.StreamingSessions;
            };

            Put["/session"] = (sessionJson) =>
            {
                var session = this.Bind<StreamingSessionBackendEntity>();
                logger.Info("PUT request on api/sessions.");
                sessionsManager.UpdateStreaminSession(session);
                return HttpStatusCode.OK;
            };
        }
    }
}
