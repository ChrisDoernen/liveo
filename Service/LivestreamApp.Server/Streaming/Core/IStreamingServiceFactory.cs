using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamingServiceFactory
    {
        Mp3StreamingService GetAudioInputMp3Streamer(AudioInput audioInput);
    }
}
