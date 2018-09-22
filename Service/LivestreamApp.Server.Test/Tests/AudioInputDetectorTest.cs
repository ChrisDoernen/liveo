using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.Extensions.Logging;
using Ninject.MockingKernel.Moq;
using System;
using System.IO;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class AudioInputDetectorTest
    {
        private readonly MoqMockingKernel _kernel;

        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private Mock<IProcessAdapter> _mockProcessAdapter;
        private IAudioDeviceDetector _audioDeviceDetector;
        private const string ffmpegOutputOneDevice = "TestResources\\ffmpeg\\ffmpegListDevicesOutputOneDeviceAvailable.txt";
        private const string ffmpegOutputNoDevice = "TestResources\\ffmpeg\\ffmpegListDevicesOutputNoDeviceAvailable.txt";

        public AudioInputDetectorTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IAudioDeviceDetector>().To<AudioDeviceDetector>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _audioDeviceDetector = _kernel.Get<IAudioDeviceDetector>();
            _mockProcessAdapter = _kernel.GetMock<IProcessAdapter>();
        }

        [TestMethod]
        public void GetAudioInputs_OneInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            var processOutput = File.ReadAllText(ffmpegOutputOneDevice);

            var result = new ProcessResult(1, "", processOutput);

            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(result);

            // When
            var audioInputs = _audioDeviceDetector.GetAudioDevices();

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

            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(result);

            // When
            var audioInputs = _audioDeviceDetector.GetAudioDevices();
        }

        [TestMethod]
        public void GetAudioInputs_NoInputs_ShouldReturnEmptyList()
        {
            // Given
            var processOutput = File.ReadAllText(ffmpegOutputNoDevice);

            var result = new ProcessResult(1, "", processOutput);

            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(result);

            // When
            var audioInputs = _audioDeviceDetector.GetAudioDevices();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(0);
        }
    }
}
