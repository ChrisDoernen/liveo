using FluentAssertions;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.ProcessSettings;
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
    public class DeviceDetectorTest
    {
        private readonly MoqMockingKernel _kernel;

        private Mock<ILogger> _mockLogger;
        private Mock<IProcessAdapter> _mockProcessAdapter;
        private IDeviceDetector _deviceDetector;
        private const string FfmpegOutputOneDevice = "TestResources\\ffmpeg\\ffmpegListDevicesOutputOneDeviceAvailable.txt";
        private const string FfmpegOutputNoDevice = "TestResources\\ffmpeg\\ffmpegListDevicesOutputNoDeviceAvailable.txt";

        public DeviceDetectorTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IDeviceDetector>().To<DeviceDetector>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _deviceDetector = _kernel.Get<IDeviceDetector>();
            _mockProcessAdapter = _kernel.GetMock<IProcessAdapter>();
            _mockLogger = _kernel.GetMock<ILogger>();
        }

        [TestMethod]
        public void GetAudioInputs_OneInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputOneDevice);
            var result = new ProcessResult(1, "", processOutput);

            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();
            var devices = _deviceDetector.Devices;

            // Then
            devices.Should().NotBeNull();
            devices.Count.Should().Be(1);
            devices[0].Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
            devices[0].DeviceState.Should().Be(DeviceState.Available);
            devices[0].DeviceType.Should().Be(DeviceType.AudioDevice);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void GetAudioInputs_OneInputProcessFails_ShouldThrow()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputOneDevice);

            var result = new ProcessResult(0, "", processOutput);

            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();
        }

        [TestMethod]
        public void GetAudioInputs_NoInputs_ShouldReturnEmptyList()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputNoDevice);

            var result = new ProcessResult(1, "", processOutput);

            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();
            var devices = _deviceDetector.Devices;

            // Then
            devices.Should().NotBeNull();
            devices.Count.Should().Be(0);
        }
    }
}
