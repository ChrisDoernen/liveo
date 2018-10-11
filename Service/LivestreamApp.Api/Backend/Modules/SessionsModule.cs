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
                return sessionManager.GetSessions();
            };

            Post["/sessions"] = request =>
            {
                var session = this.Bind<SessionBackendEntity>();
                sessionManager.CreateSession(session);
                return HttpStatusCode.Created;
            };

            Put["/sessions/{id}"] = request =>
            {
                string id = request.id;
                var session = this.Bind<SessionBackendEntity>();
                sessionManager.UpdateSession(session);
                return HttpStatusCode.OK;
            };

            Delete["/sessions/{id}"] = request =>
            {
                string id = request.id;
                sessionManager.DeleteSession(id);
                return HttpStatusCode.OK;
            };
        }
    }
}
