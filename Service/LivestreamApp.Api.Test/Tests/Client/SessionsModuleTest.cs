using FluentAssertions;
using LivestreamApp.Api.Client.Modules;
using LivestreamApp.Server.Sessions;
using LivestreamApp.Server.Streaming.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;
using System.IO;

namespace LivestreamApp.Api.Test.Tests.Client
{
    [TestClass]
    public class SessionsModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<ISessionService> _mockSessionService;
        private Mock<ILogger> _mockLogger;
        private StreamingSession _streamingSession;
        private Livestreams _livestreams;
        private Livestream _livestream;
        private const string GetCurrentSessionResponse = "TestResources\\Responses\\GetCurrentSessionResponse.txt";


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
            _streamingSession = _kernel.Get<StreamingSession>();
            _livestreams = _kernel.Get<Livestreams>();
            _livestream = _kernel.Get<Livestream>();
        }

        [TestMethod]
        public void GetLivestreams_NoSessionAvailable_ShouldReturnStatusCodeNoContent()
        {
            // Given
            _mockSessionService
                .Setup(mss => mss.CurrentSession)
                .Returns((StreamingSession)null);

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
        public void GetLivestreams_SessionAvailable_ShouldReturnStatusCodeOKWithCorrectJsonResponse()
        {
            // Given
            _livestream.Id = "SomeId";
            _livestream.Description = "SomeDescription";
            _livestreams.Streams = new List<Livestream> { _livestream };
            _streamingSession.Id = "SomeSessionId";
            _streamingSession.Title = "SomeSessionTitle";
            _streamingSession.Livestreams = _livestreams;

            _mockSessionService
                .Setup(mss => mss.CurrentSession)
                .Returns(_streamingSession);

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
            var expectedResponse = File.ReadAllText(GetCurrentSessionResponse);
            result.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Body.ContentType.Should().Be("application/json; charset=utf-8");
            result.Body.AsString().Should().Be(expectedResponse);
        }
    }
}
