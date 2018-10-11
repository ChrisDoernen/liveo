using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.Livestreams.Manager;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class StreamsModule : NancyModule
    {
        public StreamsModule(ILogger logger, IStreamManager streamManager)
            : base("/api")
        {
            this.RequiresAuthentication();

            Get["/streams"] = _ => streamManager.GetStreams();

            Post["/streams"] = request =>
            {
                var stream = this.Bind<StreamBackendEntity>();
                streamManager.CreateStream(stream);
                return HttpStatusCode.Created;
            };

            Put["/streams/{id}"] = request =>
            {
                string id = request.id;
                var stream = this.Bind<StreamBackendEntity>();
                streamManager.UpdateStream(stream);
                return HttpStatusCode.OK;
            };

            Delete["/streams/{id}"] = request =>
            {
                string id = request.id;
                streamManager.DeleteStream(id);
                return HttpStatusCode.OK;
            };
        }
    }
}
