using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Environment
{
    public class AudioHardware : IAudioHardware
    {
        private readonly IAudioInputDetector _audioInputDetector;

        public AudioHardware(IAudioInputDetector audioInputDetector)
        {
            _audioInputDetector = audioInputDetector;
        }

        public List<AudioInput> GetAudioInputs()
        {
            return _audioInputDetector.GetAudioInputs();
        }
    }
}
