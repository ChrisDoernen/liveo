using System;

namespace LivestreamApp.Server.Streaming.Sessions.Entities
{
    public class SessionBackendEntity
    {
        public string Id;
        public string Title;
        public string InternalTitle;
        public string Description;
        public DateTime? TimeStarted;
        public DateTime? TimeEnded;
        public DateTime? TimeStarting;
        public DateTime? TimeEnding;
        public DateTime? TimeServerShutdown;
        public Streams.Streams Streams;
    }
}
