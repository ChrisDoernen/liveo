using LivestreamApp.Server.Sessions.States;
using LivestreamApp.Server.Streaming.Entities;
using Ninject.Extensions.Logging;
using System;

namespace LivestreamApp.Server.Sessions
{
    public class StreamingSession
    {
        private readonly ILogger _logger;

        public DateTime StartedOn;
        public DateTime StoppedOn;

        public DateTime StartingOn;
        public DateTime StoppingOn;
        public DateTime ShutdownServerOn;

        public Livestreams Livestreams;

        private ISessionState _sessionState;

        public StreamingSession(ILogger logger)
        {
            _logger = logger;
        }

        public void StartSession()
        {
            _sessionState = _sessionState.StartSession();
        }

        public void EndSession()
        {
            _sessionState = _sessionState.StopSession();
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
