using FluentAssertions;
using LivestreamApp.Api.Client.Modules;
using LivestreamApp.Server.Streaming.Sessions;
using LivestreamApp.Server.Streaming.Streams;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;
using System.IO;
using Stream = LivestreamApp.Server.Streaming.Streams.Stream;

namespace LivestreamApp.Api.Test.Tests.Client
{
    [TestClass]
    public class SessionsModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<ISessionService> _mockSessionService;
        private Mock<ILogger> _mockLogger;
        private Session _session;
        private Streams _streams;
        private Stream _stream;
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
            _session = _kernel.Get<Session>();
            _streams = _kernel.Get<Streams>();
            _stream = _kernel.Get<Stream>();
        }

        [TestMethod]
        public void GetLivestreams_NoSessionAvailable_ShouldReturnStatusCodeNoContent()
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
        public void GetLivestreams_SessionAvailable_ShouldReturnStatusCodeOKWithCorrectJsonResponse()
        {
            // Given
            _stream.Id = "SomeId";
            _stream.Description = "SomeDescription";
            _streams.Streams = new List<Stream> { _stream };
            _session.Id = "SomeSessionId";
            _session.Title = "SomeSessionTitle";
            _session.Streams = _streams;

            _mockSessionService
                .Setup(mss => mss.CurrentSession)
                .Returns(_session);

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
