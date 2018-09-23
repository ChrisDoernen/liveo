using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment.Devices;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class StreamerFactoryTest
    {
        private readonly MoqMockingKernel _kernel;
        private IDeviceManager _deviceManager;

        public StreamerFactoryTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IDeviceManager>().To<DeviceManager>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _deviceManager = _kernel.Get<IDeviceManager>();
        }

        [TestMethod]
        public void GetAudioStreamer_ShouldReturnSameStreamerTwice()
        {
            // Given
            var audioDevice = new AudioDevice("Some Id");

            // When
            var firstStreamer = _deviceManager.GetAudioDevice(audioDevice);
            var secondStreamer = _deviceManager.GetAudioDevice(audioDevice);

            // Then
            firstStreamer.Should().NotBeNull();
            secondStreamer.Should().NotBeNull();
            secondStreamer.Should().Be(firstStreamer);
        }
    }
}
