using LivestreamApp.Server.Streaming.Sessions.States;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Streaming.Sessions
{
    public class Session
    {
        public string Id;
        public string Title;
        public DateTime? TimeStarted;
        public DateTime? TimeEnded;
        public DateTime? TimeStarting;
        public DateTime? TimeEnding;
        public DateTime? TimeServerShutdown;
        public Streams.Streams Streams;

        private readonly ILogger _logger;
        private ISessionState _sessionState;

        public Session(ILogger logger)
        {
            _logger = logger;
        }

        public void StartSession()
        {
            _sessionState = _sessionState.StartSession();
        }

        public void EndSession()
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

        public void StartLivestream(string id)
        {

        }

        public void StopLivestream(string id)
        {

        }
    }
}
