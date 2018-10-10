using FluentAssertions;
using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.Devices;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System;
using System.IO;

namespace LivestreamApp.Server.Test.Tests.Streaming.Devices
{
    [TestClass]
    public class DeviceDetectorTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IProcessAdapter> _mockProcessAdapter;
        private Mock<IProcessSettingsProvider> _mockProcessSettingsProvider;
        private IDeviceDetector _deviceDetector;
        private const string FfmpegOutputOneDevice =
            "TestResources\\ffmpeg\\ffmpegListDevicesOutputOneDeviceAvailable.txt";
        private const string FfmpegOutputNoDevice =
            "TestResources\\ffmpeg\\ffmpegListDevicesOutputNoDeviceAvailable.txt";

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
            _mockProcessSettingsProvider = _kernel.GetMock<IProcessSettingsProvider>();
            _mockProcessSettingsProvider
                .Setup(mpsp => mpsp.GetAudioStreamingProcessSettings(It.IsAny<string>()))
                .Returns(new ProcessSettings("FileName", "Arguments"));
        }

        [TestMethod]
        public void DetectAvailableDevices_OneInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputOneDevice);
            var result = new ProcessResult(1, "", processOutput);
            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();

            // Then
            _deviceDetector.Devices.Should().NotBeNull();
            _deviceDetector.Devices.Count.Should().Be(1);
            _deviceDetector.Devices[0].Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
            _deviceDetector.Devices[0].DeviceState.Should().Be(DeviceState.Available);
            _deviceDetector.Devices[0].DeviceType.Should().Be(DeviceType.AudioDevice);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void DetectAvailableDevices_ProcessFails_ShouldThrow()
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
        public void DetectAvailableDevices_NoInputs_ShouldReturnEmptyList()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputNoDevice);
            var result = new ProcessResult(1, string.Empty, processOutput);
            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();

            // Then
            _deviceDetector.Devices.Should().NotBeNull();
            _deviceDetector.Devices.Count.Should().Be(0);
        }

        [TestMethod]
        public void GetDeviceById_MatchingId_ShouldReturnCorrectDevice()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputOneDevice);
            var result = new ProcessResult(1, string.Empty, processOutput);
            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();
            var device = _deviceDetector.GetDeviceById("Mikrofonarray (Realtek High Definition Audio)");

            // Then
            device.Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
            device.DeviceState.Should().Be(DeviceState.Available);
            device.DeviceType.Should().Be(DeviceType.AudioDevice);
        }

        [TestMethod]
        public void GetDeviceById_NonMatchingId_ShouldReturnUnknownDevice()
        {
            // Given
            var processOutput = File.ReadAllText(FfmpegOutputNoDevice);
            var result = new ProcessResult(1, string.Empty, processOutput);
            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            _deviceDetector.DetectAvailableDevices();
            var device = _deviceDetector.GetDeviceById("Mikrofonarray (Realtek High Definition Audio)");

            // Then
            device.Should().BeOfType(typeof(UnknownDevice));
            device.Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
            device.DeviceState.Should().Be(DeviceState.Unknown);
            device.DeviceType.Should().Be(DeviceType.Unknown);
        }
    }
}
