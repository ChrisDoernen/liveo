using FluentAssertions;
using LivestreamApp.Api.Modules;
using LivestreamApp.Server.Streaming.Core;
using LivestreamApp.Server.Streaming.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Nancy;
using Nancy.Testing;
using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamApp.Api.Test.Tests
{
    [TestClass]
    public class LivestreamModuleTest
    {
        [TestMethod]
        public void GetLivestreams_ShouldGetStatusOKWithCorrectResponseJson()
        {
            // Given
            var mockStreamingServer = new Mock<IStreamingServerCore>();
            mockStreamingServer.Setup(mss => mss.GetStartedLiveStreams()).Returns(new List<Livestream>());
            var mockLogger = new Mock<ILogger>();

            var browser = new Browser(config =>
                {
                    config.Module<LivestreamsModule>();
                    config.Dependency(mockStreamingServer.Object);
                    config.Dependency(mockLogger.Object);
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
