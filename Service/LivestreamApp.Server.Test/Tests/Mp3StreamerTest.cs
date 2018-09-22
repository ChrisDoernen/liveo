using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using LivestreamApp.Server.Streaming.Streamer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject;
using Ninject.MockingKernel.Moq;
using Ninject.Parameters;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class Mp3StreamerTest
    {
        private readonly MoqMockingKernel _kernel;
        private Mp3Streamer _mp3Streamer;
        private Mock<IProcessAdapter> _process;

        public Mp3StreamerTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<Mp3Streamer>().ToSelf();
        }

        [TestInitialize]
        public void TestInitalize()
        {
            _kernel.Reset();
            var audioDevice = new AudioDevice("Some Id");
            _mp3Streamer = _kernel.Get<Mp3Streamer>(new ConstructorArgument("audioDevice", audioDevice));
            _process = _kernel.GetMock<IProcessAdapter>();
        }

        [TestMethod]
        public void Start_ShouldStartProcess()
        {
            // Given when
            _mp3Streamer.Start();

            // Then
            _process.Verify(mpa => mpa.ExecuteAndReadAsync("ffmpeg.exe", It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        [TestMethod]
        public void Start_ShouldEnableRetreivingBytes()
        {
            // Given
            var bytes = new BytesReceivedEventArgs(new byte[] { 1, 0, 1 });
            _process.Setup(mp => mp.ExecuteAndReadAsync("ffmpeg.exe", It.IsAny<string>(), It.IsAny<int>()))
                .Raises(x => x.OutputBytesReceived += null, bytes);

            // When 
            _mp3Streamer.Start();

            // Then
            _mp3Streamer.BytesReceived += (sender, data) => { data.Should().Be(bytes); };
        }

        [TestMethod]
        public void Stop_ShouldStopProcess()
        {
            // Given when
            _mp3Streamer.Stop();

            // Then
            _process.Verify(mpa => mpa.KillProcess(), Times.Once);
        }
    }
}
