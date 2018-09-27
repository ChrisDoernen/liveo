using LivestreamApp.Server.Streaming.StreamingSources;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServerAdapter
    {
        void StartWebSocketServer();
        void StopWebSocketServer();
        void AddStreamingWebSocketService(string path, IStreamingSource source);
        void RemoveWebSocketService(string path);
    }
}