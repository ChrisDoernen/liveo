using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Environment;
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

        public AudioStreamingWebSocketService GetAudioStreamingWebSocketervice(AudioDevice audioDevice)
        {
            var steamer = _streamerFactory.GetStreamer(audioDevice);

            var service = _kernel.Get<AudioStreamingWebSocketService>(
                new ConstructorArgument("streamer", steamer));

            return service;
        }
    }
}
