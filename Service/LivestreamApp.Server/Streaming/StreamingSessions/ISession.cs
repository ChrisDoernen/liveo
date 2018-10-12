using LivestreamApp.Server.Streaming.Livestreams;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions
{
    public interface ISession
    {
        string Description { get; set; }
        string Id { get; set; }
        string InternalTitle { get; set; }
        List<Stream> Streams { get; set; }
        DateTime? TimeEnded { get; set; }
        DateTime? TimeEnding { get; set; }
        DateTime? TimeServerShutdown { get; set; }
        DateTime? TimeStarted { get; set; }
        DateTime? TimeStarting { get; set; }
        string Title { get; set; }

        void End();
        void Pause();
        void Resume();
        void Start();
        void StartStreams();
        void StopStreams();
    }
}