using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using Nancy;
using Nancy.Extensions;
using Nancy.ModelBinding;
using Nancy.Security;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class SessionsModule : NancyModule
    {
        public SessionsModule(ILogger logger, ISessionManager sessionManager,
            ISessionService sessionService) : base("/api")
        {
            this.RequiresAuthentication();

            Get["/sessions"] = _ => sessionManager.GetSessions();

            Post["/sessions"] = request =>
            {
                var session = this.Bind<SessionBackendEntity>();
                sessionManager.CreateSession(session);
                return HttpStatusCode.Created;
            };

            Put["/sessions"] = request =>
            {
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

            Get["/sessions/current"] = request =>
            {
                var session = sessionService.GetCurrentSession<SessionBackendEntity>();
                if (session == null)
                {
                    logger.Info("No session available.");
                    return HttpStatusCode.NoContent;
                }
                logger.Info($"Returning session with id: {session.Id}.");
                return session;
            };

            Post["/sessions/current"] = request =>
            {
                var sessionId = this.Request.Body.AsString();
                sessionService.SetCurrentSession(sessionId);
                return HttpStatusCode.OK;
            };
        }
    }
}
