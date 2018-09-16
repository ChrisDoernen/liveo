using LivestreamApp.Server.Streaming.Environment;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;

namespace LivestreamApp.Server.Streaming.Core
{
    public class AudioInputStreamerFactory : IAudioInputStreamerFactory
    {
        private readonly IResolutionRoot _resolutionRoot;

        public AudioInputStreamerFactory(IResolutionRoot resolutionRoot)
        {
            _resolutionRoot = resolutionRoot;
        }

        public AudioInputMp3Streamer GetAudioInputMp3Streamer(AudioInput audioInput)
        {
            return _resolutionRoot.Get<AudioInputMp3Streamer>(
                new ConstructorArgument("audioInput", audioInput));
        }
    }
}
