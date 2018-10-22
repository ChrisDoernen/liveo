using FluentAssertions;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.Devices;
using NUnit.Framework;
using Moq;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.Devices
{
    [TestFixture]
    public class DeviceTest
    {
        private readonly MoqMockingKernel _kernel;

        private Mock<IProcessSettings> _processSettings;

        public DeviceTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [SetUp]
        public void TestInitialize()
        {
            _kernel.Reset();
            _processSettings = _kernel.GetMock<IProcessSettings>();
        }

        [Test]
        public void Construct_ShouldInitializeWithStateAvailable()
        {
            // Given when
            IDevice device = new Device("Input", DeviceType.AudioDevice, _processSettings.Object);

            // Then
            device.DeviceState.Should().Be(DeviceState.Available);
        }
    }
}
