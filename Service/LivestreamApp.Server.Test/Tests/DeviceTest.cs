using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment.Devices;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class DeviceTest
    {
        private readonly StreamingDevice _audioStreamingDevice = new AudioDevice("Mikro");

        [TestMethod]
        public void Equals_ShouldGetRightValueWhenNotTheSame()
        {
            // Given
            var secondAudioDevice = new AudioDevice("Other mikro");

            // When
            var areSame = _audioStreamingDevice.Equals(secondAudioDevice);

            // Then
            areSame.Should().Be(false);
        }

        [TestMethod]
        public void Equals_ShouldGetRightValueWhenTheSame()
        {
            // Given
            var secondAudioDevice = _audioStreamingDevice;

            // When
            var areSame = _audioStreamingDevice.Equals(secondAudioDevice);

            // Then
            areSame.Should().Be(true);
        }
    }
}
