using LivestreamApp.Server.Streaming.Environment.Devices;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServerAdapter
    {
        void StartWebSocketServer();
        void StopWebSocketServer();
        void AddStreamingWebSocketService(string path, IStreamingDevice device);
        void RemoveWebSocketService(string path);
    }
}