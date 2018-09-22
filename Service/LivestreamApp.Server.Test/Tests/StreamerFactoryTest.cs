using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Streamer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;
using Ninject.MockingKernel.Moq;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class StreamerFactoryTest
    {
        private readonly MoqMockingKernel _kernel;
        private IStreamerFactory _streamerFactory;

        public StreamerFactoryTest()
        {
            _kernel = new MoqMockingKernel();
            _kernel.Bind<IStreamerFactory>().To<StreamerFactory>();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel.Reset();
            _streamerFactory = _kernel.Get<IStreamerFactory>();
        }

        [TestMethod]
        public void GetAudioStreamer_ShouldReturnSameStreamerTwice()
        {
            // Given
            var audioDevice = new AudioDevice("Some Id");

            // When
            var firstStreamer = _streamerFactory.GetAudioStreamer(audioDevice);
            var secondStreamer = _streamerFactory.GetAudioStreamer(audioDevice);

            // Then
            firstStreamer.Should().NotBeNull();
            secondStreamer.Should().NotBeNull();
            secondStreamer.Should().Be(firstStreamer);
        }
    }
}
