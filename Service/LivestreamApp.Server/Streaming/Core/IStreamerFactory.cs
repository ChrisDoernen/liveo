using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.Core
{
    public interface IStreamerFactory
    {
        Mp3Streamer GetStreamer(AudioDevice audioDevice);
    }
}
