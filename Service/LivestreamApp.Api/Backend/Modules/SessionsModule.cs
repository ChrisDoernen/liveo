using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
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
                logger.Debug("GET request on api/sessions.");
                return sessionManager.GetSessions();
            };

            Post["/sessions"] = request =>
            {
                logger.Debug("POST request on api/sessions.");
                var session = this.Bind<SessionBackendEntity>();
                sessionManager.CreateSession(session);
                return HttpStatusCode.Created;
            };

            Put["/sessions/{id}"] = request =>
            {
                string id = request.id;
                logger.Debug($"PUT request on api/sessions/{id}.");
                var session = this.Bind<SessionBackendEntity>();
                sessionManager.UpdateSession(session);
                return HttpStatusCode.OK;
            };

            Delete["/sessions/{id}"] = request =>
            {
                string id = request.id;
                logger.Debug($"DELETE request on api/sessions/{id}.");
                sessionManager.DeleteSession(id);
                return HttpStatusCode.OK;
            };
        }
    }
}
