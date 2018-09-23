using LivestreamApp.Server.Streaming.Streamer;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public class WebSocketServiceFactory : IWebSocketServiceFactory
    {
        private readonly IResolutionRoot _kernel;

        public WebSocketServiceFactory(IResolutionRoot kernel)
        {
            _kernel = kernel;
        }

        public StreamingWebSocketService GetStreamingWebSocketervice(IStreamable source)
        {
            var service = _kernel.Get<StreamingWebSocketService>(
                new ConstructorArgument("source", source));

            return service;
        }
    }
}
