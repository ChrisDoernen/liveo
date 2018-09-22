using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Streamer;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public class WebSocketServiceFactory : IWebSocketServiceFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly IStreamerFactory _streamerFactory;

        public WebSocketServiceFactory(IResolutionRoot kernel, IStreamerFactory streamerFactory)
        {
            _kernel = kernel;
            _streamerFactory = streamerFactory;
        }

        public StreamingWebSocketService GetAudioStreamingWebSocketervice(AudioDevice audioDevice)
        {
            var steamer = _streamerFactory.GetAudioStreamer(audioDevice);

            var service = _kernel.Get<StreamingWebSocketService>(
                new ConstructorArgument("streamer", steamer));

            return service;
        }
    }
}
