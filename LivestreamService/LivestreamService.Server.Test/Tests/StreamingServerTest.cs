using LivestreamService.Server.Configuration;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Environment;
using LivestreamService.Server.Streaming;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamService.Server.Test.Tests
{
    [TestClass]
    public class StreamingServerTest
    {
        private const string _mockLivestreamConfig = "Livestreams.config";
        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private readonly Mock<IAudioHardware> _mockAudioHardware = new Mock<IAudioHardware>();
        private readonly Mock<ILivestreamsConfiguration> _mockLivestreamsConfiguration
            = new Mock<ILivestreamsConfiguration>();
        private readonly Livestream _mockLivestreamEnglish = new Livestream
        {
            Id = "english",
            Title = "English",
            CountryCode = "gb",
            Description = "Originalton",
            AudioInput = new AudioInput("MockInput"),
            StartOnServiceStartup = true
        };

        [TestMethod]
        public void Start_AudioInputsAvailable_StartOnServiceStartup()
        {
            // Arrange
            var mockAudioInputs = new List<AudioInput> { new AudioInput("MockInput") };
            _mockAudioHardware.Setup(mah => mah.GetAudioInputs()).Returns(mockAudioInputs);
            var mockLivestreams = new Livestreams();
            mockLivestreams.Streams.Add(_mockLivestreamEnglish);
            _mockLivestreamsConfiguration.Setup(mlc => mlc.GetAvailableStreams(_mockLivestreamConfig))
                .Returns(mockLivestreams);

            var expectedLivestreamEnglish = new Livestream
            {
                Id = "english",
                Title = "English",
                CountryCode = "gb",
                Description = "Originalton",
                AudioInput = new AudioInput("MockInput"),
                StartOnServiceStartup = false,
                HasValidAudioInput = true,
                IsInitialized = true,
                IsStarted = true
            };

            var streamingServer = new StreamingServer(_mockLogger.Object,
                _mockAudioHardware.Object, _mockLivestreamsConfiguration.Object);

            // Act
            streamingServer.Start();
            var startedLivestreams = streamingServer.GetStartedLiveStreams();

            // Assert
            _mockAudioHardware.Verify(mah => mah.GetAudioInputs());
            _mockLivestreamsConfiguration.Verify(mlc => mlc.GetAvailableStreams(_mockLivestreamConfig));
            Assert.AreEqual(1, streamingServer.GetStartedLiveStreams().Count);
            Assert.AreEqual(expectedLivestreamEnglish.Id, startedLivestreams[0].Id);
            Assert.AreEqual(expectedLivestreamEnglish.Description, startedLivestreams[0].Description);
            Assert.AreEqual(expectedLivestreamEnglish.HasValidAudioInput, startedLivestreams[0].HasValidAudioInput);
            Assert.AreEqual(expectedLivestreamEnglish.IsInitialized, startedLivestreams[0].IsInitialized);
            Assert.AreEqual(expectedLivestreamEnglish.IsStarted, startedLivestreams[0].IsStarted);
        }

        [TestMethod]
        public void Start_NoAudioInputsAvailable_StartOnServiceStartup()
        {
            // Arrange
            _mockAudioHardware.Setup(mah => mah.GetAudioInputs()).Returns(new List<AudioInput>());
            var mockLivestreams = new Livestreams();
            mockLivestreams.Streams.Add(_mockLivestreamEnglish);
            _mockLivestreamsConfiguration.Setup(mlc => mlc.GetAvailableStreams(_mockLivestreamConfig))
                .Returns(mockLivestreams);

            var streamingServer = new StreamingServer(_mockLogger.Object,
                _mockAudioHardware.Object, _mockLivestreamsConfiguration.Object);

            // Act
            streamingServer.Start();
            var startedLivestreams = streamingServer.GetStartedLiveStreams();

            // Assert
            _mockAudioHardware.Verify(mah => mah.GetAudioInputs());
            _mockLivestreamsConfiguration.Verify(mlc => mlc.GetAvailableStreams(_mockLivestreamConfig));
            Assert.AreEqual(0, startedLivestreams.Count);
        }
    }
}
