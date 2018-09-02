using Nancy;
using Ninject.Extensions.Logging;

namespace LiveStreamService.Api.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger)
            : base("/api")
        {
            Get["/livestreams"] = _ =>
            {
                //var livestreams = streamingServer.GetStartedLiveStreams();
                logger.Info("Api: /livestreams was invoked.");

                return "Dummy response";
            };

        }
    }
}