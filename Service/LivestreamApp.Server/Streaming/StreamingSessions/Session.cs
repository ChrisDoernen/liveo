using LivestreamApp.Server.Streaming.Livestreams;
using LivestreamApp.Server.Streaming.StreamingSessions.States;
using Ninject.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.StreamingSessions
{
    public class Session : ISession
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string InternalTitle { get; set; }
        public string Description { get; set; }
        public DateTime? TimeStarted { get; set; }
        public DateTime? TimeEnded { get; set; }
        public DateTime? TimeStarting { get; set; }
        public DateTime? TimeEnding { get; set; }
        public DateTime? TimeServerShutdown { get; set; }

        public List<Stream> Streams { get; set; }

        private readonly ILogger _logger;
        private ISessionState _sessionState;

        public Session(ILogger logger, ISessionStateFactory sessionStateFactory)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _sessionState = sessionStateFactory.GetSessionState<InitialSessionState>(this);
        }

        public void Start()
        {
            _sessionState = _sessionState.StartSession();
        }

        public void End()
        {
            _sessionState = _sessionState.EndSession();
        }

        public void Pause()
        {
            _sessionState = _sessionState.Pause();
        }

        public void Resume()
        {
            _sessionState = _sessionState.Resume();
        }

        public void StartStreams()
        {
            foreach (var stream in Streams)
            {
                stream.Initialize();
                stream.Start();
            }
        }

        public void StopStreams()
        {
            foreach (var stream in Streams)
                stream.Stop();
        }
    }
}
