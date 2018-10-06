using LivestreamApp.Server.Streaming.Livestreams.Entities;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Entities
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
        public List<StreamClientEntity> Streams;
    }
}
