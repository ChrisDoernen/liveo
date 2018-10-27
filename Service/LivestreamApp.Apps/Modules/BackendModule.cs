using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Apps.Modules
{
    public class BackendModule : NancyModule
    {
        public BackendModule(ILogger logger)
            : base("/backend")
        {
            Get["/"] = _ => View["Backend/Index"];
        }
    }
}
