using FluentAssertions;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using LivestreamApp.Shared.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSessions.Service
{
    [TestClass]
    public class SessionServiceTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IConfigAdapter> _mockConfigDataAdapter;
        private Mock<IHashGenerator> _mockHashGenerator;
        private ISessionService _sessionService;

        public SessionServiceTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Load(new AutoMapperModule());
            _kernel.Bind<Session>().To<Session>();
            _kernel.Bind<ISessionService>().To<SessionService>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _mockConfigDataAdapter = _kernel.GetMock<IConfigAdapter>();
            _mockHashGenerator = _kernel.GetMock<IHashGenerator>();
            _sessionService = GetSessionManager();
        }

        private ISessionService GetSessionManager()
        {
            var sessions = ConstructSessions();

            _mockConfigDataAdapter
                .Setup(mcda => mcda.Load<Sessions, SessionsType>(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(sessions);

            return _kernel.Get<ISessionService>();
        }

        private Sessions ConstructSessions()
        {
            var firstSession = _kernel.Get<Session>();
            firstSession.Id = "8b5aa";
            var secondSession = _kernel.Get<Session>();
            secondSession.Id = "bce9e";

            var streams = _kernel.Get<Sessions>();
            streams.SessionList.Add(firstSession);
            streams.SessionList.Add(secondSession);

            return streams;
        }

        [TestMethod]
        public void GetSessions_ShouldReturnCorrectSessions()
        {
            // Given when
            var sessions = _sessionService.GetSessions();

            // Then
            sessions.Should().NotBeNull();
            sessions.Count.Should().Be(2);
            sessions[0].Id.Should().Be("8b5aa");
            sessions[1].Id.Should().Be("bce9e");
        }

        [TestMethod]
        public void GetSession_IdIsContained_ShouldReturnCorrectSession()
        {
            // Given when
            var session = _sessionService.GetSession("bce9e");

            // Then
            session.Should().NotBeNull();
            session.Id.Should().Be("bce9e");
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void GetSession_IdIsNotContained_ShouldThrow()
        {
            // Given when
            _sessionService.GetSession("bcexx");
        }

        [TestMethod]
        public void CreateSession_ShouldAddCorrectSessionAndCallUpdateConfig()
        {
            // Given
            var newSession = _kernel.Get<SessionBackendEntity>();
            newSession.Title = "SomeTitle";
            _mockHashGenerator.Setup(mhg => mhg.GetMd5Hash(It.IsAny<string>())).Returns("1bf4f");

            // When
            _sessionService.CreateSession(newSession);
            var sessions = _sessionService.GetSessions();

            // Then
            sessions.Should().NotBeNull();
            sessions.Count.Should().Be(3);
            sessions[0].Id.Should().Be("8b5aa");
            sessions[1].Id.Should().Be("bce9e");
            sessions[2].Id.Should().Be("1bf4f");
            sessions[2].Title.Should().Be("SomeTitle");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Sessions, SessionsType>(It.IsAny<Sessions>(),
                    It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void DeleteSession_IdIsContained_ShouldDeleteCorrectSessionAndCallUpdateConfig()
        {
            // Given when
            _sessionService.DeleteSession("8b5aa");
            var sessions = _sessionService.GetSessions();

            // Then
            sessions.Should().NotBeNull();
            sessions.Count.Should().Be(1);
            sessions[0].Id.Should().Be("bce9e");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Sessions, SessionsType>(It.IsAny<Sessions>(),
                    It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void DeleteSession_IdIsNotContained_ShouldDoNothing()
        {
            // Given when
            _sessionService.DeleteSession("8b5va");
            var sessions = _sessionService.GetSessions();

            // Then
            sessions.Should().NotBeNull();
            sessions.Count.Should().Be(2);
            sessions[0].Id.Should().Be("8b5aa");
            sessions[1].Id.Should().Be("bce9e");
        }

        [TestMethod]
        public void UpdateSession_IdIsContained_ShouldUpdateSesssionCorrectlyAndCallUpdateConfig()
        {
            // Given
            var update = _kernel.Get<SessionBackendEntity>();
            update.Title = "SomeNewTitle";
            update.Id = "8b5aa";

            // When
            _sessionService.UpdateSession(update);
            var sessions = _sessionService.GetSessions();

            // Then
            sessions.Should().NotBeNull();
            sessions.Count.Should().Be(2);
            sessions[0].Id.Should().Be("bce9e");
            sessions[1].Id.Should().Be("8b5aa");
            sessions[1].Title.Should().Be("SomeNewTitle");
            _mockConfigDataAdapter
                .Verify(mcda => mcda.Save<Sessions, SessionsType>(It.IsAny<Sessions>(),
                    It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void UpdateSession_IdIsNotContained_ShouldDoNothing()
        {
            // Given
            var update = _kernel.Get<SessionBackendEntity>();
            update.Title = "SomeNewTitle";
            update.Id = "8b5av";

            // When
            _sessionService.UpdateSession(update);
            var sessions = _sessionService.GetSessions();

            // Then
            sessions.Should().NotBeNull();
            sessions.Count.Should().Be(2);
            sessions[0].Id.Should().Be("8b5aa");
            sessions[1].Id.Should().Be("bce9e");
            sessions[1].Title.Should().Be(null);
        }

        [TestMethod]
        public void GetCurrentSessionClientEntity_SessionSet_ShouldReturnCorrectSession()
        {
            // Given
            _sessionService.SetCurrentSession("8b5aa");

            // When
            var session = _sessionService.GetCurrentSession<SessionClientEntity>();

            // Then
            session.Should().BeOfType(typeof(SessionClientEntity));
            session.Id.Should().Be("8b5aa");
        }

        [TestMethod]
        public void GetCurrentSessionBackendEntity_SessionSet_ShouldReturnCorrectSession()
        {
            // Given
            _sessionService.SetCurrentSession("8b5aa");

            // When
            var session = _sessionService.GetCurrentSession<SessionBackendEntity>();

            // Then
            session.Should().BeOfType(typeof(SessionBackendEntity));
            session.Id.Should().Be("8b5aa");
        }

        [TestMethod]
        public void GetCurrentSessionClientEntity_SessionNotSet_ShouldReturnNull()
        {
            // Given when
            var session = _sessionService.GetCurrentSession<SessionClientEntity>();

            // Then
            session.Should().BeNull();
        }

        [TestMethod]
        public void GetCurrentSessionBackendEntity_SessionNotSet_ShouldReturnCorrectSession()
        {
            // Given when
            var session = _sessionService.GetCurrentSession<SessionBackendEntity>();

            // Then
            session.Should().BeNull();
        }
    }
}
