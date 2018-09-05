using Nancy;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Backend.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule(ILogger logger)
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
