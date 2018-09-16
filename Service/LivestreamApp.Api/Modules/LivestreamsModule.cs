using LivestreamApp.Server.Streaming.Core;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger, IStreamingServerCore streamingServerCore)
            : base("/api")
        {
            Get["/livestreams"] = _ =>
            {
                var livestreams = streamingServerCore.GetStartedLiveStreams();

                logger.Info($"api/livestreams was invoked, returned {livestreams.Count} livestreams.");

                return livestreams;
            };
        }
    }
}