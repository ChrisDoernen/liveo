using Nancy;

namespace LiveStreamService.Api.Modules
{
    public class StreamsModule : NancyModule
    {
        public StreamsModule()
        {
            Get["/levestreams"] = _ => "Dummy response";
        }

    }
}