using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.States;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using Ninject.Parameters;
using NUnit.Framework;
using System;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSessions.States
{
    [TestFixture]
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

        [SetUp]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockSession = _kernel.GetMock<ISession>();
            _mockSessionStateFactory = _kernel.GetMock<ISessionStateFactory>();
            _initialSessionState =
                _kernel.Get<InitialSessionState>(new ConstructorArgument("session", _mockSession.Object));
        }

        [Test]
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

        [Test]
        public void StopSession_ShouldThrow()
        {
            // Given when
            Assert.Throws<ArgumentException>(() => _initialSessionState.EndSession());
        }

        [Test]
        public void PauseSession_ShouldThrow()
        {
            // Given when
            Assert.Throws<ArgumentException>(() => _initialSessionState.PauseSession());
        }

        [Test]
        public void ResumeSession_ShouldThrow()
        {
            // Given when
            Assert.Throws<ArgumentException>(() => _initialSessionState.ResumeSession());
        }
    }
}
