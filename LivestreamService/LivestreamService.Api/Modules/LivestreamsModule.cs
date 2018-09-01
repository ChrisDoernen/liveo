using Nancy;

namespace LiveStreamService.Api.Modules
{
    public class LivestreamsModule : NancyModule
    {
        public LivestreamsModule()
        {
            Get["/livestreams"] = _ => "Dummy response";
        }
    }
}