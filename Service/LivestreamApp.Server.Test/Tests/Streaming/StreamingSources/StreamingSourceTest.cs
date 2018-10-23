﻿using FluentAssertions;
using LivestreamApp.Server.Shared.Processes;
using LivestreamApp.Server.Shared.ProcessSettings;
using LivestreamApp.Server.Streaming.Devices;
using LivestreamApp.Server.Streaming.StreamingSources;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using Ninject.Parameters;
using NUnit.Framework;

namespace LivestreamApp.Server.Test.Tests.Streaming.StreamingSources
{
    [TestFixture]
    public class StreamingSourceTest
    {
        private readonly MoqMockingKernel _kernel;
        private IDevice _audioDevice;
        private Mock<IProcessAdapter> _mockProcessAdapter;
        private IProcessSettings _mockProcessSettings;

        public StreamingSourceTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IStreamingSource>().To<StreamingSource>();
        }

        [SetUp]
        public void TestInitialize()
        {
            _kernel.Reset();
            _mockProcessAdapter = _kernel.GetMock<IProcessAdapter>();
            _mockProcessSettings = new ProcessSettings(string.Empty, string.Empty);
            _audioDevice = new Device("AudioDevice", DeviceType.AudioDevice, _mockProcessSettings);
        }

        [Test]
        public void Constructor_ShouldInitializeCorrectly()
        {
            // Given
            var audioDevice = new Device("AudioDevice", DeviceType.AudioDevice, _mockProcessSettings);
            var videoDevice = new Device("VideoDevice", DeviceType.VideoDevice, _mockProcessSettings);

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

        [Test]
        public void StartStreaming_ShouldStartProcess()
        {
            // Given when
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", _audioDevice));
            source.StartStreaming();

            // Then
            _mockProcessAdapter
                .Verify(mpa => mpa.ExecuteAndReadBinaryAsync(It.IsAny<IProcessSettings>()), Times.Once);
        }

        [Test]
        public void StopStreaming_ShouldKillProcess()
        {
            // Given when
            var source = _kernel.Get<IStreamingSource>(new ConstructorArgument("device", _audioDevice));
            source.StopStreaming();

            // Then
            _mockProcessAdapter.Verify(mpa => mpa.KillProcess(), Times.Once);
        }

        [Test]
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

        [Test]
        public void StartStreaming_ShouldListenOnErrorDataReceivedEventCorrectlyAndRaise()
        {
            // Given
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
