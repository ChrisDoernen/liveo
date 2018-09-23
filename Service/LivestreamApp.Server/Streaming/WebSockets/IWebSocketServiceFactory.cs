using LivestreamApp.Server.Streaming.Streamer;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServiceFactory
    {
        StreamingWebSocketService GetStreamingWebSocketervice(IStreamer streamer);
    }
}