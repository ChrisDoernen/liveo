using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Backend.Modules
{
    public class BackendModule : NancyModule
    {
        public BackendModule(ILogger logger)
            : base("/backend")
        {
            Get["/"] = _ =>
            {
                logger.Info("/backend was invoked.");
                return View["Index"];
            };
        }
    }
}
