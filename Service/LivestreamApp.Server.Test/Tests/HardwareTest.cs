using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Environment.Devices;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using System.Collections.Generic;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class HardwareTest
    {
        private readonly MoqMockingKernel _kernel;
        private Hardware _hardware;
        private Mock<IAudioDeviceDetector> _mockAudioDeviceDetector;

        public HardwareTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<Hardware>().ToSelf();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockAudioDeviceDetector = _kernel.GetMock<IAudioDeviceDetector>();
            _hardware = _kernel.Get<Hardware>();
        }

        [TestMethod]
        public void GetAudioDevices_ShouldReturnCorrectAudioDevices()
        {
            // Given
            var audioDevices = new List<AudioDevice>
            {
                new AudioDevice("Id1"),
                new AudioDevice("Id2")
            };

            _mockAudioDeviceDetector.Setup(madd => madd.GetAudioDevices()).Returns(audioDevices);

            // When
            var returnedDevices = _hardware.GetAudioDevices();

            // Then
            returnedDevices.Should().BeSameAs(audioDevices);
        }
    }
}
