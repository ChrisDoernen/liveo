using FluentAssertions;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.ProcessSettings;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests.Streaming.Devices
{
    [TestClass]
    public class DeviceTest
    {
        private readonly MoqMockingKernel _kernel;

        private Mock<IProcessSettings> _processSettings;

        public DeviceTest()
        {
            _kernel = new MoqMockingKernel();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _processSettings = _kernel.GetMock<IProcessSettings>();
        }

        [TestMethod]
        public void Construct_ShouldInitializeWithStateAvailable()
        {
            // Given when
            IDevice device = new Device("Input", DeviceType.AudioDevice, _processSettings.Object);

            // Then
            device.DeviceState.Should().Be(DeviceState.Available);
        }
    }
}
