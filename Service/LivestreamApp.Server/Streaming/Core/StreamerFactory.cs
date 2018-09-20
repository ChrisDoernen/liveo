using LivestreamApp.Server.Streaming.Environment;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamerFactory : IStreamerFactory
    {
        private readonly IResolutionRoot _resolutionRoot;

        public StreamerFactory(IResolutionRoot resolutionRoot)
        {
            _resolutionRoot = resolutionRoot;
        }

        public Mp3Streamer GetStreamingService(AudioDevice audioDevice)
        {
            return _resolutionRoot.Get<Mp3Streamer>(
                new ConstructorArgument("audioDevice", audioDevice));
        }
    }
}
