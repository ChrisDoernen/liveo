using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.States;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using Ninject.Parameters;
using System;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSessions.States
{
    [TestClass]
    public class InitialSessionStateTest
    {
        private readonly MoqMockingKernel _kernel;
        private InitialSessionState _initialSessionState;
        private Mock<ISessionStateFactory> _mockSessionStateFactory;
        private Mock<ISession> _mockSession;

        public InitialSessionStateTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockSession = _kernel.GetMock<ISession>();
            _mockSessionStateFactory = _kernel.GetMock<ISessionStateFactory>();
            _initialSessionState =
                _kernel.Get<InitialSessionState>(new ConstructorArgument("session", _mockSession.Object));
        }

        [TestMethod]
        public void StartSession_ShouldStartSession()
        {
            // Given when
            _initialSessionState.StartSession();

            // Then
            _mockSession.Verify(ms => ms.StartStreams(), Times.Once);
            _mockSession.VerifySet(ms => ms.TimeStarted = It.IsAny<DateTime>(), Times.Once);
            _mockSessionStateFactory
                .Verify(msf => msf.GetSessionState<StartedSessionState>(_mockSession.Object), Times.Once);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void StopSession_ShouldThrow()
        {
            // Given when
            _initialSessionState.EndSession();
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void PauseSession_ShouldThrow()
        {
            // Given when
            _initialSessionState.PauseSession();
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ResumeSession_ShouldThrow()
        {
            // Given when
            _initialSessionState.ResumeSession();
        }
    }
}
