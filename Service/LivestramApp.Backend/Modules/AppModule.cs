using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Apps.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger)
            : base("/app")
        {
            Get["/"] = _ => View["Client/Index"];
        }
    }
}
