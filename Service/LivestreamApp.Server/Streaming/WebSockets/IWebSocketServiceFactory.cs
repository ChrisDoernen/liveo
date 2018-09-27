using LivestreamApp.Server.Streaming.StreamingSources;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServiceFactory
    {
        StreamingWebSocketService GetStreamingWebSocketervice(IStreamingSource streamer);
    }
}