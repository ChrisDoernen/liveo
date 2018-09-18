using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamingServiceFactory
    {
        StreamingService GetAudioInputMp3Streamer(AudioDevice audioDevice);
    }
}
