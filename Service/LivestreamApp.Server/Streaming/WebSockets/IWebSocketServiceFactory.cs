using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServiceFactory
    {
        StreamingWebSocketService GetAudioStreamingWebSocketervice(AudioDevice audioDevice);
    }
}