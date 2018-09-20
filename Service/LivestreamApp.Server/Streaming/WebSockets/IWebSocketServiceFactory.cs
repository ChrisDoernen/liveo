using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServiceFactory
    {
        AudioStreamingWebSocketService GetAudioStreamingWebSocketervice(AudioDevice audioDevice);
    }
}