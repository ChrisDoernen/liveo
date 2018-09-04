using LivestreamApp.Server.Streaming;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger, IStreamingServer streamingServer)
            : base("/api")
        {
            Get["/livestreams"] = _ =>
            {
                var livestreams = streamingServer.GetStartedLiveStreams();
                logger.Info($"api/livestreams was invoked, returned {livestreams.Count} livestreams.");
                return livestreams;
            };
        }
    }
}