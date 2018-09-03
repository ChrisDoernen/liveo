using LivestreamService.Server.Streaming;
using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamService.App.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger, IStreamingServer streamingServer)
            : base("/app")
        {
            Get["/"] = _ =>
            {
                return "Here is the App.";
            };
        }
    }
}