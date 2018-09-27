using LivestreamApp.Server.Streaming.Configuration;
using LivestreamApp.Server.Streaming.ProcessSettings;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System;

namespace LivestreamApp.Server.Streaming.StreamingSources
{
    public class StreamingSourceFactory : IStreamingSourceFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly IStreamingConfiguration _audioStreamingConfiguration;

        public StreamingSourceFactory(IResolutionRoot kernel)
        {
            _kernel = kernel;
            _audioStreamingConfiguration = new Mp3StreamingConfiguration();
        }

        public IStreamingSource GetDevice(string deviceId, ContentType contentType)
        {
            IStreamingSource source;

            switch (contentType)
            {
                case ContentType.Audio:
                    source = _kernel.Get<IStreamingSource>(new ConstructorArgument("id", deviceId),
                        new ConstructorArgument("streamingConfiguration", _audioStreamingConfiguration));
                    break;
                default:
                    throw new NotImplementedException("Video streaming is not yet supported.");
            }

            return source;
        }
    }
}
