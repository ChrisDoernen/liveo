using LivestreamService.Server.Configuration;
using LivestreamService.Server.Entities;
using LivestreamService.Server.Environment;
using LivestreamService.Server.Streaming;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System.Collections.Generic;

namespace LivestreamService.Server.Test
{
    [TestClass]
    public class StreamingServerTest
    {
        [TestMethod]
        public void Start_AudioInputsAvailable()
        {
            // Arrange
            var mockLogger = new Mock<ILogger>();
            var mockAudioInputs = new List<AudioInput> { new AudioInput("MockInput") };
            var mockAudioHardware = new Mock<IAudioHardware>();
            mockAudioHardware.Setup(mah => mah.GetAudioInputs())
                .Returns(mockAudioInputs);

            var mockLivestreamEnglish = new Livestream
            {
                Id = "english",
                Title = "English",
                CountryCode = "gb",
                Description = "Originalton",
                AudioInput = "Mikrofon (2- USB Audio Device)",
                StartOnServiceStartup = false
            };

            var mockLivestreams = new Livestreams();
            mockLivestreams.Streams.Add(mockLivestreamEnglish);

            var mockLivestreamConfig = "Livestreams.config";
            var mockLivestreamsConfiguration = new Mock<ILivestreamsConfiguration>();
            mockLivestreamsConfiguration.Setup(mlc => mlc.GetAvailableStreams(mockLivestreamConfig))
                .Returns(mockLivestreams);

            var streamingServer = new StreamingServer(mockLogger.Object,
                mockAudioHardware.Object, mockLivestreamsConfiguration.Object);

            // Act
            streamingServer.Start();

            // Assert
            mockAudioHardware.Verify(mah => mah.GetAudioInputs());
            mockLivestreamsConfiguration.Verify(mlc => mlc.GetAvailableStreams(mockLivestreamConfig));
        }
    }
}
