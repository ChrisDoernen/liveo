using FluentAssertions;
using LivestreamApp.Server.AppConfiguration;
using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSessions.Service
{
    [TestClass]
    public class SessionServiceTest
    {
        private readonly MoqMockingKernel _kernel;
        private ISessionService _sessionService;
        private Mock<ISessionManager> _mockSessionManger;
        private Session _session;

        public SessionServiceTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<ISessionService>().To<SessionService>();
            _kernel.Load(new AutoMapperModule());
            _kernel.Bind<Session>().To<Session>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _sessionService = _kernel.Get<ISessionService>();
            _mockSessionManger = _kernel.GetMock<ISessionManager>();
            _session = _kernel.Get<Session>();
        }

        [TestMethod]
        public void GetCurrentSessionClientEntity_SessionSet_ShouldReturnCorrectSession()
        {
            // Given
            _session.Id = "a58uz";
            _mockSessionManger.Setup(msm => msm.GetSession("a58uz")).Returns(_session);

            // When
            _sessionService.SetCurrentSession("a58uz");
            var session = _sessionService.GetCurrentSession<SessionClientEntity>();

            // Then
            session.Should().BeOfType(typeof(SessionClientEntity));
            session.Id.Should().Be("a58uz");
        }

        [TestMethod]
        public void GetCurrentSessionBackendEntity_SessionSet_ShouldReturnCorrectSession()
        {
            // Given
            _session.Id = "a58uz";
            _mockSessionManger.Setup(msm => msm.GetSession("a58uz")).Returns(_session);

            // When
            _sessionService.SetCurrentSession("a58uz");
            var session = _sessionService.GetCurrentSession<SessionBackendEntity>();

            // Then
            session.Should().BeOfType(typeof(SessionBackendEntity));
            session.Id.Should().Be("a58uz");
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
