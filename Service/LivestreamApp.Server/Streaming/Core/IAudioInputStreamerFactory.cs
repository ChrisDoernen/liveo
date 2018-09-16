using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IAudioInputStreamerFactory
    {
        AudioInputMp3Streamer GetAudioInputMp3Streamer(AudioInput audioInput);
    }
}
