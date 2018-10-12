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

            Post["/sessions/current/start"] = request =>
            {
                sessionService.CurrentSession.Start();
                return HttpStatusCode.OK;
            };

            Post["/sessions/current/end"] = request =>
            {
                sessionService.CurrentSession.End();
                return HttpStatusCode.OK;
            };

            Post["/sessions/current/pause"] = request =>
            {
                sessionService.CurrentSession.Pause();
                return HttpStatusCode.OK;
            };

            Post["/sessions/current/resume"] = request =>
            {
                sessionService.CurrentSession.Resume();
                return HttpStatusCode.OK;
            };
        }
    }
}
