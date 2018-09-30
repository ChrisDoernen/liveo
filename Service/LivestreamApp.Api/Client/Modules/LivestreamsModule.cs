using LivestreamApp.Server.Streaming.Core;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Client.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger, IStreamingService streamingService)
            : base("/api")
        {
            Get["/livestreams"] = _ =>
            {
                var livestreams = streamingService.GetStartedLiveStreams();

                logger.Info($"api/livestreams was invoked, returned {livestreams.Count} livestreams.");

                return livestreams;
            };
        }
    }
}