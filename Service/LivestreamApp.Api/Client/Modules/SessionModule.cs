using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Client.Modules
{
    public class SessionModule : NancyModule
    {
        public SessionModule(ILogger logger, ISessionService sessionService) : base("/api")
        {
            Get["/session"] = _ =>
            {
                var session = sessionService.GetCurrentSession<SessionClientEntity>();
                if (session == null)
                {
                    logger.Info("No session available.");
                    return HttpStatusCode.NoContent;
                }
                logger.Info($"Returning session with id {session.Id}.");
                return session;
            };
        }
    }
}
