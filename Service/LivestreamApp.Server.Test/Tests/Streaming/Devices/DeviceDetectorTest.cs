using FluentAssertions;
using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.Devices;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using NUnit.Framework;
using System;
using System.IO;

namespace LivestreamApp.Server.Test.Tests.Streaming.Devices
{
    [TestFixture]
    public class DeviceDetectorTest
    {
        private readonly MoqMockingKernel _kernel;
        private readonly string _testDir = TestContext.CurrentContext.TestDirectory;
        private Mock<IProcessAdapter> _mockProcessAdapter;
        private Mock<IProcessSettingsProvider> _mockProcessSettingsProvider;
        private IDeviceDetector _deviceDetector;
        private const string FfmpegOutputOneDevice =
            "TestResources\\Ffmpeg\\FfmpegListDevicesOutputOneDeviceAvailable.txt";
        private const string FfmpegOutputNoDevice =
            "TestResources\\Ffmpeg\\FfmpegListDevicesOutputNoDeviceAvailable.txt";

        public DeviceDetectorTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IDeviceDetector>().To<DeviceDetector>();
        }

        [SetUp]
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

        [Test]
        public void DetectAvailableDevices_OneInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            var processOutput = File.ReadAllText(Path.Combine(_testDir, FfmpegOutputOneDevice));
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

        [Test]
        public void DetectAvailableDevices_ProcessFails_ShouldThrow()
        {
            // Given
            var processOutput = File.ReadAllText(Path.Combine(_testDir, FfmpegOutputOneDevice));
            var result = new ProcessResult(0, "", processOutput);
            _mockProcessAdapter
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<IProcessSettings>()))
                .Returns(result);

            // When
            Assert.Throws<Exception>(() => _deviceDetector.DetectAvailableDevices());
        }

        [Test]
        public void DetectAvailableDevices_NoInputs_ShouldReturnEmptyList()
        {
            // Given
            var processOutput = File.ReadAllText(Path.Combine(_testDir, FfmpegOutputNoDevice));
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

        [Test]
        public void GetDeviceById_MatchingId_ShouldReturnCorrectDevice()
        {
            // Given
            var processOutput = File.ReadAllText(Path.Combine(_testDir, FfmpegOutputOneDevice));
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

        [Test]
        public void GetDeviceById_NonMatchingId_ShouldReturnUnknownDevice()
        {
            // Given
            var processOutput = File.ReadAllText(Path.Combine(_testDir, FfmpegOutputNoDevice));
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
