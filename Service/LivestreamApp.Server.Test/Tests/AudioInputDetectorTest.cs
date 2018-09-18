using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System;
using System.Diagnostics;
using System.IO;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class AudioInputDetectorTest
    {
        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private readonly Mock<IProcessAdapter> _mockExternalProcess = new Mock<IProcessAdapter>();
        private IAudioInputDetector _audioInputDetector;
        private const string ffmpegOutputOneDevice = "TestResources\\ffmpeg\\ffmpegListDevicesOutputOneDeviceAvailable.txt";
        private const string ffmpegOutputNoDevice = "TestResources\\ffmpeg\\ffmpegListDevicesOutputNoDeviceAvailable.txt";

        [TestInitialize]
        public void TestInitialize()
        {
            _audioInputDetector = new AudioInputDetector(_mockLogger.Object, _mockExternalProcess.Object);
        }

        [TestMethod]
        public void GetAudioInputs_OneInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            var processOutput = File.ReadAllText(ffmpegOutputOneDevice);

            var result = new ProcessResult(1, "", processOutput);

            _mockExternalProcess
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<ProcessStartInfo>()))
                .Returns(result);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(1);
            audioInputs[0].Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void GetAudioInputs_OneInputProcessFails_ShouldThrow()
        {
            // Given
            var processOutput = File.ReadAllText(ffmpegOutputOneDevice);

            var result = new ProcessResult(0, "", processOutput);

            _mockExternalProcess
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<ProcessStartInfo>()))
                .Returns(result);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();
        }

        [TestMethod]
        public void GetAudioInputs_NoInputs_ShouldReturnEmptyList()
        {
            // Given
            var processOutput = File.ReadAllText(ffmpegOutputNoDevice);

            var result = new ProcessResult(1, "", processOutput);

            _mockExternalProcess
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<ProcessStartInfo>()))
                .Returns(result);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(0);
        }
    }
}
