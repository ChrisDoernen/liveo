using FluentAssertions;
using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.StreamingSources;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using Ninject.Parameters;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSources
{
    [TestClass]
    public class StreamingSourceTest
    {
        private readonly MoqMockingKernel _kernel;
        private readonly IDevice _audioDevice;
        private Mock<IProcessAdapter> _mockProcessAdapter;

        public StreamingSourceTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IStreamingSource>().To<StreamingSource>();
            _audioDevice = new Device("AudioDevice", DeviceType.AudioDevice, new ProcessSettings("", ""));
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _mockProcessAdapter = _kernel.GetMock<IProcessAdapter>();
        }

        [TestMethod]
        public void Constructor_ShouldInitializeCorrectly()
        {
            // Given
            var audioDevice = new Device("AudioDevice", DeviceType.AudioDevice, null);
            var videoDevice = new Device("VideoDevice", DeviceType.VideoDevice, null);

            // When
            var audioSource = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", audioDevice));
            var videoSource = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", videoDevice));

            // Then
            audioSource.HasValidDevice().Should().Be(true);
            audioSource.Device.DeviceType.Should().Be(DeviceType.AudioDevice);
            audioSource.ContentType.Should().Be(ContentType.Audio);
            videoSource.HasValidDevice().Should().Be(true);
            videoSource.Device.DeviceType.Should().Be(DeviceType.VideoDevice);
            videoSource.ContentType.Should().Be(ContentType.Video);
        }

        [TestMethod]
        public void StartStreaming_ShouldStartProcess()
        {
            // Given when
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", _audioDevice));
            source.StartStreaming();

            // Then
            _mockProcessAdapter
                .Verify(mpa => mpa.ExecuteAndReadBinaryAsync(It.IsAny<IProcessSettings>()), Times.Once);
        }

        [TestMethod]
        public void StopStreaming_ShouldKillProcess()
        {
            // Given when
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", _audioDevice));
            source.StopStreaming();

            // Then
            _mockProcessAdapter.Verify(mpa => mpa.KillProcess(), Times.Once);
        }

        [TestMethod]
        public void StartStreaming_ShouldListenOnOutputBytedReceivedEventCorrectlyAndRaise()
        {
            // Given
            byte[] bytedReceived = null;
            var bytesSent = new byte[] { 0, 1, 0 };

            // When
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", _audioDevice));
            source.BytesReceived += (sender, e) => { bytedReceived = e.Bytes; };
            source.StartStreaming();
            _mockProcessAdapter
                .Raise(mpa => mpa.OutputBytesReceived += null, new BytesReceivedEventArgs(bytesSent));

            // Then
            bytedReceived.Should().Equal(bytesSent);
        }

        [TestMethod]
        public void StartStreaming_ShouldListenOnErrorDataReceivedEventCorrectlyAndRaise()
        {
            // Given
            var audioDevice = new Device("AudioDevice", DeviceType.AudioDevice, null);
            string messageReceived = null;
            var messageSent = "Some text";

            // When
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", _audioDevice));
            source.LogLineReceived += (sender, e) => { messageReceived = e.Message; };
            source.StartStreaming();
            _mockProcessAdapter
                .Raise(mpa => mpa.ErrorDataReceived += null, new MessageReceivedEventArgs(messageSent));

            // Then
            messageReceived.Should().Be(messageSent);
        }
    }
}
