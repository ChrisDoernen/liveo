using AutoMapper;
using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.Livestreams.Manager;
using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using Ninject.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.AppConfiguration
{
    public class SessionValueResolver : IValueResolver<SessionType, Session, List<Stream>>
    {
        private readonly IStreamManager _streamManager;
        private readonly ILogger _logger;

        public SessionValueResolver(ILogger logger, IStreamManager streamManager)
        {
            _logger = logger;
            _streamManager = streamManager;
        }

        public List<Stream> Resolve(SessionType source, Session destination,
            List<Stream> member, ResolutionContext context)
        {
            var ids = source.Streams.ToList();
            var streams = _streamManager.GetStreams().Where(s => ids.Contains(s.Id)).ToList();
            var selectedIds = streams.Select(s => s.Id).ToList();
            ids.RemoveAll(i => selectedIds.Contains(i));

            foreach (var id in ids)
            {
                _logger.Warn($"No matching stream with id {id} on session with id {source.Id}.");
            }

            return streams;
        }
    }
}
