using FluentAssertions;
using LivestreamApp.Api.Client.Modules;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Api.Test.Tests.Client
{
    [TestClass]
    public class SessionsModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<ISessionService> _mockSessionService;
        private Mock<ILogger> _mockLogger;
        private SessionClientEntity _sessionClientEntity;
        private StreamClientEntity _streamClientEntity;
        private const string GetCurrentSessionResponse =
            "TestResources\\Responses\\GetCurrentSessionResponse.txt";

        public SessionsModuleTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockSessionService = _kernel.GetMock<ISessionService>();
            _mockLogger = _kernel.GetMock<ILogger>();
            _sessionClientEntity = _kernel.Get<SessionClientEntity>();
            _streamClientEntity = _kernel.Get<StreamClientEntity>();
        }

        [TestMethod]
        public void GetCurrentSession_NoSessionAvailable_ShouldReturnStatusCodeNoContent()
        {
            // Given
            _mockSessionService
                .Setup(mss => mss.CurrentSession)
                .Returns((Session)null);

            var browser = new Browser(config =>
            {
                config.Module<SessionsModule>();
                config.Dependency(_mockSessionService.Object);
                config.Dependency(_mockLogger.Object);
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
            _streamClientEntity.Id = "SomeId";
            _streamClientEntity.Description = "SomeDescription";
            _sessionClientEntity.Id = "SomeSessionId";
            _sessionClientEntity.Title = "SomeSessionTitle";
            _sessionClientEntity.Streams = new List<StreamClientEntity> { _streamClientEntity };

            _mockSessionService
                .Setup(mss => mss.CurrentSessionClientEntity)
                .Returns(_sessionClientEntity);

            var browser = new Browser(config =>
                {
                    config.Module<SessionsModule>();
                    config.Dependency(_mockSessionService.Object);
                    config.Dependency(_mockLogger.Object);
                });

            // When
            var result = browser.Get("/api/sessions/current", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            var expectedResponse = System.IO.File.ReadAllText(GetCurrentSessionResponse);
            result.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Body.ContentType.Should().Be("application/json; charset=utf-8");
            result.Body.AsString().Should().Be(expectedResponse);
        }
    }
}
