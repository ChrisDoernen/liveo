using FluentAssertions;
using LivestreamApp.Api.Client.Modules;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Entities;
using LivestreamApp.Server.Streaming.StreamingSessions.Service;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.IO;

namespace LivestreamApp.Api.Test.Tests.Client
{
    [TestFixture]
    public class SessionModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<ISessionService> _mockSessionService;
        private Mock<ILogger> _mockLogger;
        private SessionClientEntity _sessionClientEntity;
        private StreamClientEntity _streamClientEntity;
        private readonly string _testDir = TestContext.CurrentContext.TestDirectory;
        private const string ExpectedGetCurrentSessionResponse =
            "TestResources/Responses/ExpectedGetCurrentSessionClientResponse.txt";

        public SessionModuleTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [SetUp]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockSessionService = _kernel.GetMock<ISessionService>();
            _mockLogger = _kernel.GetMock<ILogger>();
            _sessionClientEntity = _kernel.Get<SessionClientEntity>();
            _streamClientEntity = _kernel.Get<StreamClientEntity>();
        }

        [Test]
        public void GetCurrentSession_NoSessionAvailable_ShouldReturnStatusCodeNoContent()
        {
            // Given
            _mockSessionService
                .Setup(mss => mss.GetCurrentSession<SessionClientEntity>())
                .Returns((SessionClientEntity)null);

            var browser = new Browser(config =>
            {
                config.Module<SessionModule>();
                config.Dependency(_mockSessionService.Object);
                config.Dependency(_mockLogger.Object);
            });

            // When
            var result = browser.Get("/api/session", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Test]
        public void GetCurrentSession_SessionAvailable_ShouldReturnStatusCodeOKWithCorrectJsonResponse()
        {
            // Given
            _streamClientEntity.Id = "SomeId";
            _streamClientEntity.Description = "SomeDescription";
            _sessionClientEntity.Id = "SomeSessionId";
            _sessionClientEntity.Title = "SomeSessionTitle";
            _sessionClientEntity.Streams = new List<StreamClientEntity> { _streamClientEntity };

            _mockSessionService
                .Setup(mss => mss.GetCurrentSession<SessionClientEntity>())
                .Returns(_sessionClientEntity);

            var browser = new Browser(config =>
                {
                    config.Module<SessionModule>();
                    config.Dependency(_mockSessionService.Object);
                    config.Dependency(_mockLogger.Object);
                });

            // When
            var result = browser.Get("/api/session", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            var expectedResponse = File.ReadAllText(Path.Combine(_testDir, ExpectedGetCurrentSessionResponse));
            result.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Body.ContentType.Should().Be("application/json; charset=utf-8");
            result.Body.AsString().Should().Be(expectedResponse);
        }
    }
}
