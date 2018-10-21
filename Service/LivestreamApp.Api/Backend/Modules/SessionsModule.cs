using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
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
        public SessionsModule(ILogger logger, ISessionService sessionService) : base("/api")
        {
            this.RequiresAuthentication();

            Get["/sessions"] = _ => sessionService.GetSessions();

            Post["/sessions"] = request =>
            {
                var session = this.Bind<SessionBackendEntity>();
                sessionService.CreateSession(session);
                return HttpStatusCode.Created;
            };

            Put["/sessions"] = request =>
            {
                var session = this.Bind<SessionBackendEntity>();
                sessionService.UpdateSession(session);
                return HttpStatusCode.OK;
            };

            Delete["/sessions/{id}"] = request =>
            {
                string id = request.id;
                sessionService.DeleteSession(id);
                return HttpStatusCode.OK;
            };

            Get["/sessions/active"] = request =>
            {
                var session = sessionService.GetCurrentSession<SessionBackendEntity>();
                if (session == null)
                {
                    logger.Debug("No session available.");
                    return HttpStatusCode.NoContent;
                }
                logger.Debug($"Returning session with id {session.Id}.");
                return session;
            };

            Post["/sessions/active"] = request =>
            {
                var sessionId = this.Request.Body.AsString();
                sessionService.SetCurrentSession(sessionId);
                return HttpStatusCode.OK;
            };

            Post["/sessions/active/start"] = request =>
            {
                sessionService.CurrentSession.Start();
                return HttpStatusCode.OK;
            };

            Post["/sessions/active/end"] = request =>
            {
                sessionService.CurrentSession.End();
                return HttpStatusCode.OK;
            };

            Post["/sessions/active/pause"] = request =>
            {
                sessionService.CurrentSession.Pause();
                return HttpStatusCode.OK;
            };

            Post["/sessions/active/resume"] = request =>
            {
                sessionService.CurrentSession.Resume();
                return HttpStatusCode.OK;
            };
        }
    }
}
