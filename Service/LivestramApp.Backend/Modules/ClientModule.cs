using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Apps.Modules
{
    public class ClientModule : NancyModule
    {
        public ClientModule(ILogger logger)
            : base("/app")
        {
            Get["/"] = _ => View["Client/Index"];
        }
    }
}
