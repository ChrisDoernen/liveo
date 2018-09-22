using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.Streamer
{
    public interface IStreamerFactory
    {
        IStreamer GetAudioStreamer(AudioDevice audioDevice);
    }
}
