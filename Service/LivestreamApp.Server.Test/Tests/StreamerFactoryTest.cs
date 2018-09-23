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
        private IDeviceFactory _deviceFactory;

        public StreamerFactoryTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IDeviceFactory>().To<DeviceFactory>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _deviceFactory = _kernel.Get<IDeviceFactory>();
        }

        [TestMethod]
        public void GetAudioStreamer_ShouldReturnSameStreamerTwice()
        {
            // Given
            var audioDevice = new AudioDevice("Some Id");

            // When
            var firstStreamer = _deviceFactory.GetAudioDevice(audioDevice);
            var secondStreamer = _deviceFactory.GetAudioDevice(audioDevice);

            // Then
            firstStreamer.Should().NotBeNull();
            secondStreamer.Should().NotBeNull();
            secondStreamer.Should().Be(firstStreamer);
        }
    }
}
