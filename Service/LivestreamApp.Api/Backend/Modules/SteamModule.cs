using LivestreamApp.Server.Streaming.Streams.Entities;
using LivestreamApp.Server.Streaming.Streams.Manager;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Api.Backend.Modules
{
    public class StreamModule : NancyModule
    {
        public StreamModule(ILogger logger, IStreamManager streamManager)
            : base("/api")
        {
            this.RequiresAuthentication();

            Get["/streams"] = _ =>
            {
                logger.Info("GET request on api/streams.");
                return streamManager.Streams;
            };

            Post["/streams"] = request =>
            {
                logger.Info("POST request on api/streams.");
                var stream = this.Bind<StreamBackendEntity>();
                streamManager.CreateStream(stream);
                return HttpStatusCode.Created;
            };

            Put["/streams/{id}"] = request =>
            {
                string id = request.id;
                logger.Info($"PUT request on api/streams/{id}.");
                var stream = this.Bind<StreamBackendEntity>();
                streamManager.UpdateStream(stream);
                return HttpStatusCode.OK;
            };

            Delete["/streams/{id}"] = request =>
            {
                string id = request.id;
                logger.Info($"DELETE request on api/streams/{id}.");
                streamManager.DeleteStream(id);
                return HttpStatusCode.OK;
            };
        }
    }
}
