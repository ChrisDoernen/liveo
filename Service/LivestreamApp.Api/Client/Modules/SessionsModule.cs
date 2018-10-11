using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Client.Modules
{
    public class SessionsModule : NancyModule
    {
        public SessionsModule(ILogger logger, ISessionService sessionService)
            : base("/api")
        {
            Get["/sessions/current"] = _ =>
            {
                var currentSession = sessionService.CurrentSessionClientEntity;
                if (currentSession == null)
                {
                    logger.Info("No current session available.");
                    return HttpStatusCode.NoContent;
                }
                logger.Info($"Returning current session with id: {currentSession.Id}.");
                return currentSession;
            };
        }
    }
}
