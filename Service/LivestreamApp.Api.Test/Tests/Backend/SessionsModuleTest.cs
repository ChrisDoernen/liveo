using FluentAssertions;
using LivestreamApp.Api.Backend.Modules;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Manager;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using LivestreamApp.Shared.Authentication;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Api.Test.Tests.Backend
{
    [TestClass]
    public class SessionsModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<ISessionService> _mockSessionService;
        private Mock<ISessionManager> _mockSessionManager;
        private Mock<ILogger> _mockLogger;
        private SessionBackendEntity _sessionBackendEntity;
        private StreamBackendEntity _streamBackendEntity;
        private const string ExpectedGetCurrentSessionResponse =
            "TestResources\\Responses\\ExpectedGetCurrentSessionBackendResponse.txt";

        public SessionsModuleTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockSessionService = _kernel.GetMock<ISessionService>();
            _mockSessionManager = _kernel.GetMock<ISessionManager>();
            _mockLogger = _kernel.GetMock<ILogger>();
            _sessionBackendEntity = _kernel.Get<SessionBackendEntity>();
            _streamBackendEntity = _kernel.Get<StreamBackendEntity>();
        }

        [TestMethod]
        public void GetCurrentSession_NoSessionAvailable_ShouldReturnStatusCodeNoContent()
        {
            // Given
            _mockSessionService
                .Setup(mss => mss.GetCurrentSession<SessionBackendEntity>())
                .Returns((SessionBackendEntity)null);

            var browser = new Browser(config =>
            {
                config.Module<SessionsModule>();
                config.Dependency(_mockLogger.Object);
                config.Dependency(_mockSessionService.Object);
                config.Dependency(_mockSessionManager.Object);
                config.RequestStartup((container, pipelines, context) =>
                {
                    context.CurrentUser =
                        new UserIdentity("Admin", new List<string> { "ACCESS-BACKEND" });
                });
            });

            // When
            var result = browser.Get("/api/sessions/current", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [TestMethod]
        public void GetCurrentSession_SessionAvailable_ShouldReturnStatusCodeOKWithCorrectJsonResponse()
        {
            // Given
            _sessionBackendEntity.Id = "SomeId";
            _sessionBackendEntity.Description = "SomeDescription";
            _sessionBackendEntity.Id = "SomeSessionId";
            _sessionBackendEntity.Title = "SomeSessionTitle";
            _sessionBackendEntity.Streams = new List<StreamBackendEntity> { _streamBackendEntity };

            _mockSessionService
                .Setup(mss => mss.GetCurrentSession<SessionBackendEntity>())
                .Returns(_sessionBackendEntity);

            var browser = new Browser(config =>
            {
                config.Module<SessionsModule>();
                config.Dependency(_mockLogger.Object);
                config.Dependency(_mockSessionService.Object);
                config.Dependency(_mockSessionManager.Object);
                config.RequestStartup((container, pipelines, context) =>
                {
                    context.CurrentUser =
                        new UserIdentity("Admin", new List<string> { "ACCESS-BACKEND" });
                });
            });

            // When
            var result = browser.Get("/api/sessions/current", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            var expectedResponse = System.IO.File.ReadAllText(ExpectedGetCurrentSessionResponse);
            result.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Body.ContentType.Should().Be("application/json; charset=utf-8");
            result.Body.AsString().Should().Be(expectedResponse);
        }
    }
}
