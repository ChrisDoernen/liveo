using System;

namespace LivestreamApp.Server.Streaming.Sessions.Entities
{
    public class SessionClientEntity
    {
        public string Id;
        public string Title;
        public string Description;
        public DateTime? TimeStarted;
        public DateTime? TimeEnded;
        public DateTime? TimeStarting;
        public DateTime? TimeEnding;
        public Streams.Streams Streams;
    }
}
