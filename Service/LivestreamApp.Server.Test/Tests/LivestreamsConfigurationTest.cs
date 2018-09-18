using AutoMapper;
using FluentAssertions;
using LivestreamApp.Server.Streaming.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class LivestreamsConfigurationTest
    {
        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private LivestreamsConfiguration _livestreamsConfiguration;

        [TestInitialize]
        public void TestInitialize()
        {
            Mapper.Initialize(config => config.AddProfiles(typeof(AppConfiguration.ServerProfile)));

            _livestreamsConfiguration =
                new LivestreamsConfiguration(_mockLogger.Object, Mapper.Instance);
        }

        [TestMethod]
        public void GetAvailableStreams_ValidConfig_ShouldReturnCorrectStreams()
        {
            // Given
            const string validConfig = "TestResources\\config\\ValidLivestreams.config";

            // When
            var livestreams = _livestreamsConfiguration.GetAvailableStreams(validConfig);

            // Then
            livestreams.Should().NotBeNull();
            livestreams.Streams.Count.Should().Be(2);
            livestreams.Streams[0].Id.Should().Be("deutsch");
            livestreams.Streams[0].Description.Should().Be("Originalton");
            livestreams.Streams[1].Title.Should().Be("English");
        }
    }
}
