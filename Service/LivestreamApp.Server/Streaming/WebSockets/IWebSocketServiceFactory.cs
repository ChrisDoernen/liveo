using LivestreamApp.Server.Streaming.Environment;
using WebSocketSharp.Server;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServiceFactory
    {
        WebSocketBehavior GetAudioStreamingWebSocketervice(AudioDevice audioDevice);
    }
}