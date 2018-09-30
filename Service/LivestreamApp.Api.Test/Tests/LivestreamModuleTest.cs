using FluentAssertions;
using LivestreamApp.Api.Client.Modules;
using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Api.Test.Tests
{
    [TestClass]
    public class LivestreamModuleTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IStreamingService> _mockStreamingService;
        private Mock<ILogger> _mockLogger;

        public LivestreamModuleTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockStreamingService = _kernel.GetMock<IStreamingService>();
            _mockLogger = _kernel.GetMock<ILogger>();
        }

        [TestMethod]
        public void GetLivestreams_ShouldGetStatusOKWithCorrectResponseJson()
        {
            // Given
            _mockStreamingService
                .Setup(mss => mss.GetStartedLiveStreams())
                .Returns(new List<Livestream>());

            var browser = new Browser(config =>
                {
                    config.Module<LivestreamsModule>();
                    config.Dependency(_mockStreamingService.Object);
                    config.Dependency(_mockLogger.Object);
                });

            // When
            var result = browser.Get("/api/livestreams", with =>
            {
                with.HttpRequest();
                with.Header("Accept", "application/json");
            });

            // Then
            result.StatusCode.Should().Be(HttpStatusCode.OK);
            result.Body.ContentType.Should().Be("application/json; charset=utf-8");
            result.Body.AsString().Should().Be("[]");
        }
    }
}
