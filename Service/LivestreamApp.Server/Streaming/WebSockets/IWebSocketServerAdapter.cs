using LivestreamApp.Server.Streaming.Environment;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServerAdapter
    {
        void StartWebSocketServer();
        void StopWebSocketServer();
        void AddAudioStreamingWebSocketService(string path, AudioDevice audioDevice);
        void RemoveWebSocketService(string path);
    }
}