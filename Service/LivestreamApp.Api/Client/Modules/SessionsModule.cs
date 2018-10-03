using LivestreamApp.Server.Streaming.Sessions;
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
                var currentSession = sessionService.CurrentSession;
                logger.Info("GET request on api/sessions/current.");
                if (currentSession == null)
                {
                    logger.Info("No current session available, returning http code no content.");
                    return HttpStatusCode.NoContent;
                }
                logger.Info($"Returning current session with id: {currentSession.Id}.");
                return currentSession;
            };
        }
    }
}
