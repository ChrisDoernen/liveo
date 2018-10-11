using LivestreamApp.Server.Streaming.Livestreams.Entities;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions.Entities
{
    public class SessionBackendEntity
    {
        public string Id;
        public string Title;
        public string InternalTitle;
        public string Description;
        public DateTime? TimeStarting;
        public DateTime? TimeEnding;
        public DateTime? TimeServerShutdown;
        public List<StreamBackendEntity> Streams;
    }
}
