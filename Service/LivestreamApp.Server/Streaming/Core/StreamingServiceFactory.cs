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

        public StreamingService GetStreamingService(AudioDevice audioDevice)
        {
            return _resolutionRoot.Get<StreamingService>(
                new ConstructorArgument("audioDevice", audioDevice));
        }
    }
}
