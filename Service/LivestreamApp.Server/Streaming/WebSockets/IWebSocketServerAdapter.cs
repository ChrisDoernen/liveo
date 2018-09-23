﻿using LivestreamApp.Server.Streaming.Streamer;

namespace LivestreamApp.Server.Streaming.WebSockets
{
    public interface IWebSocketServerAdapter
    {
        void StartWebSocketServer();
        void StopWebSocketServer();
        void AddStreamingWebSocketService(string path, IStreamable streamer);
        void RemoveWebSocketService(string path);
    }
}