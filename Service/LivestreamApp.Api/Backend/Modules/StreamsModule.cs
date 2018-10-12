using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.Livestreams.Service;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class StreamsModule : NancyModule
    {
        public StreamsModule(ILogger logger, IStreamService streamService)
            : base("/api")
        {
            this.RequiresAuthentication();

            Get["/streams"] = _ => streamService.GetStreams();

            Post["/streams"] = request =>
            {
                var stream = this.Bind<StreamBackendEntity>();
                streamService.CreateStream(stream);
                return HttpStatusCode.Created;
            };

            Put["/streams/{id}"] = request =>
            {
                string id = request.id;
                var stream = this.Bind<StreamBackendEntity>();
                streamService.UpdateStream(stream);
                return HttpStatusCode.OK;
            };

            Delete["/streams/{id}"] = request =>
            {
                string id = request.id;
                streamService.DeleteStream(id);
                return HttpStatusCode.OK;
            };
        }
    }
}
