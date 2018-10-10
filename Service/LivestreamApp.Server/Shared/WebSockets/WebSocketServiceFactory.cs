using LivestreamApp.Server.Shared.Logging;
using LivestreamApp.Server.Streaming.StreamingSources;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System;

namespace LivestreamApp.Server.Shared.WebSockets
{
    public class WebSocketServiceFactory : IWebSocketServiceFactory
    {
        private readonly IResolutionRoot _kernel;

        public WebSocketServiceFactory(IResolutionRoot kernel)
        {
            _kernel = kernel ?? throw new ArgumentNullException(nameof(kernel));
        }

        public StreamingWebSocketService GetStreamingWebSocketervice(IStreamingSource source)
        {
            var service = _kernel.Get<StreamingWebSocketService>(
                new ConstructorArgument("source", source));

            return service;
        }

        public LoggingWebSocketService GetLoggingWebSocketervice(ILoggingSource source)
        {
            var service = _kernel.Get<LoggingWebSocketService>(
                new ConstructorArgument("source", source));

            return service;
        }
    }
}
