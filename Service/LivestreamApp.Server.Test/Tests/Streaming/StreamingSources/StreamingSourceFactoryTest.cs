using FluentAssertions;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.StreamingSources;
using NUnit.Framework;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSources
{
    [TestFixture]
    public class StreamingSourceFactoryTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mock<IDeviceDetector> _mockDeviceDetector;
        private IStreamingSourceFactory _streamingSourceFactory;
        private Device _device;

        public StreamingSourceFactoryTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IStreamingSourceFactory>().To<StreamingSourceFactory>();
            _kernel.Bind<IStreamingSource>().To<StreamingSource>();
        }

        [SetUp]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockDeviceDetector = _kernel.GetMock<IDeviceDetector>();
            _streamingSourceFactory = _kernel.Get<IStreamingSourceFactory>();
            _device = new Device("SomeId", DeviceType.AudioDevice,
                new ProcessSettings(string.Empty, string.Empty));
        }

        [Test]
        public void GetStreamingSourceByDeviceId_ShouldReturnCorrectStreamingSource()
        {
            // Given
            var deviceId = "SomeId";
            _mockDeviceDetector.Setup(mdd => mdd.GetDeviceById("SomeId")).Returns(_device);

            // When 
            var streamingSource = _streamingSourceFactory.GetStreamingSourceByDeviceId(deviceId);

            // Then
            streamingSource.Device.Id.Should().Be("SomeId");
            streamingSource.Device.DeviceType.Should().Be(DeviceType.AudioDevice);
        }
    }
}
