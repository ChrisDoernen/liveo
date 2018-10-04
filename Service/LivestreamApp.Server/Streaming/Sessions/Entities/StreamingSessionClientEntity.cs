using LivestreamApp.Server.Streaming.Streams;
using System;

namespace LivestreamApp.Server.Streaming.Sessions.Entities
{
    public class StreamingSessionClientEntity
    {
        public string Id;
        public string Title;
        public DateTime? TimeStarted;
        public DateTime? TimeEnded;
        public DateTime? TimeStarting;
        public DateTime? TimeEnding;
        public Livestreams Livestreams;
    }
}
