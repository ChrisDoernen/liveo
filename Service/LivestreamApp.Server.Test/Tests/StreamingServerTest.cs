using FluentAssertions;
using LivestreamApp.Server.Configuration;
using LivestreamApp.Server.Entities;
using LivestreamApp.Server.Environment;
using LivestreamApp.Server.Streaming;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class StreamingServerTest
    {
        private const string MockLivestreamConfig = "Livestreams.config";
        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private readonly Mock<IAudioHardware> _mockAudioHardware = new Mock<IAudioHardware>();
        private readonly Mock<ILivestreamsConfiguration> _mockLivestreamsConfiguration
            = new Mock<ILivestreamsConfiguration>();
        private readonly Livestream _livestreamEnglish = new Livestream
        {
            Id = "english",
            Title = "English",
            CountryCode = "gb",
            Description = "Originalton",
            AudioInput = new AudioInput("MockInput"),
            StartOnServiceStartup = true
        };

        [TestMethod]
        public void Construction_InputsAvailable_ShouldStartServerWithCorrectStreamConfiguration()
        {
            // Given
            var mockAudioInputs = new List<AudioInput> { new AudioInput("MockInput") };
            _mockAudioHardware.Setup(mah => mah.GetAudioInputs()).Returns(mockAudioInputs);
            var mockLivestreams = new Livestreams();
            mockLivestreams.Streams.Add(_livestreamEnglish);
            _mockLivestreamsConfiguration.Setup(mlc => mlc.GetAvailableStreams(MockLivestreamConfig))
                .Returns(mockLivestreams);

            var streamingServer = new StreamingServer(_mockLogger.Object,
                _mockAudioHardware.Object, _mockLivestreamsConfiguration.Object);

            // When
            var startedLivestreams = streamingServer.GetStartedLiveStreams();

            // Then
            _mockAudioHardware.Verify(mah => mah.GetAudioInputs());
            _mockLivestreamsConfiguration.Verify(mlc => mlc.GetAvailableStreams(MockLivestreamConfig));
            streamingServer.GetStartedLiveStreams().Count.Should().Be(1);
            startedLivestreams[0].Id.Should().Be("english");
            startedLivestreams[0].Description.Should().Be("Originalton");
            startedLivestreams[0].HasValidAudioInput.Should().Be(true);
            startedLivestreams[0].IsInitialized.Should().Be(true);
            startedLivestreams[0].IsStarted.Should().Be(true);
        }

        [TestMethod]
        public void Construction_NoInputsAvailable_ShouldStartServerWithCorrectStreamConfiguration()
        {
            // Given
            _mockAudioHardware.Setup(mah => mah.GetAudioInputs()).Returns(new List<AudioInput>());
            var mockLivestreams = new Livestreams();
            mockLivestreams.Streams.Add(_livestreamEnglish);
            _mockLivestreamsConfiguration.Setup(mlc => mlc.GetAvailableStreams(MockLivestreamConfig))
                .Returns(mockLivestreams);

            var streamingServer = new StreamingServer(_mockLogger.Object,
                _mockAudioHardware.Object, _mockLivestreamsConfiguration.Object);

            // When
            var startedLivestreams = streamingServer.GetStartedLiveStreams();

            // Then
            _mockAudioHardware.Verify(mah => mah.GetAudioInputs());
            _mockLivestreamsConfiguration.Verify(mlc => mlc.GetAvailableStreams(MockLivestreamConfig));
            startedLivestreams.Count.Should().Be(0);
        }
    }
}
