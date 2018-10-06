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
        public SessionsModule(ILogger logger, ISessionManager sessionManager)
            : base("/api")
        {
            this.RequiresAuthentication();

            Get["/sessions"] = _ =>
            {
                logger.Info("GET request on api/sessions.");
                return sessionManager.Sessions;
            };

            Put["/sessions"] = (sessionJson) =>
            {
                logger.Info("PUT request on api/sessions.");
                var session = this.Bind<SessionBackendEntity>();
                sessionManager.UpdateSession(session);
                return HttpStatusCode.OK;
            };

            Delete["/sessions/{id}"] = x =>
            {
                logger.Info("DELETE request on api/sessions.");
                string id = x.id;
                sessionManager.DeleteSession(id);
                return HttpStatusCode.OK;
            };
        }
    }
}
