using LivestreamApp.Server.Streaming.Environment;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamingServiceFactory : IStreamingServiceFactory
    {
        private readonly IResolutionRoot _resolutionRoot;

        public StreamingServiceFactory(IResolutionRoot resolutionRoot)
        {
            _resolutionRoot = resolutionRoot;
        }

        public Mp3StreamingService GetAudioInputMp3Streamer(AudioDevice audioDevice)
        {
            return _resolutionRoot.Get<Mp3StreamingService>(
                new ConstructorArgument("audioDevice", audioDevice));
        }
    }
}
