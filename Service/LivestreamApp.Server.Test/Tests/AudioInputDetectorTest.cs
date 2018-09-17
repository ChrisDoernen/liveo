using FluentAssertions;
using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.Processes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;
using System.Diagnostics;

namespace LivestreamApp.Server.Test.Tests
{
    [TestClass]
    public class AudioInputDetectorTest
    {
        private readonly Mock<ILogger> _mockLogger = new Mock<ILogger>();
        private readonly Mock<IProcessAdapter> _mockExternalProcess = new Mock<IProcessAdapter>();
        private IAudioInputDetector _audioInputDetector;

        [TestInitialize]
        public void TestInitialize()
        {
            _audioInputDetector = new AudioInputDetector(_mockLogger.Object, _mockExternalProcess.Object);
        }

        [TestMethod]
        public void GetAudioInputs_DummyInput_ShouldReturnCorrectAudioInput()
        {
            // Given
            const string processOutput =
                "[dshow @ 0000023e3e56a1c0] DirectShow video devices (some may be both video and audio devices)\r\n" +
                "[dshow @ 0000023e3e56a1c0]  \"USB Boot\"\r\n" +
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_pnp_\\\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global\"\r\n" +
                "[dshow @ 0000023e3e56a1c0] DirectShow audio devices\r\n" +
                "[dshow @ 0000023e3e56a1c0]  \"Mikrofonarray (Realtek High Definition Audio)\"\r\n" +
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\\wave_{810AC879-96E4-4CF7-856C-CF8CC0784E7D}\"\r\n" +
                "dummy: Immediate exit requested";

            var result = new ProcessResult(1, "", processOutput);

            _mockExternalProcess
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<ProcessStartInfo>()))
                .Returns(result);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(1);
            audioInputs[0].Id.Should().Be("Mikrofonarray (Realtek High Definition Audio)");
        }

        [TestMethod]
        public void GetAudioInputs_NoInputs()
        {
            // Given
            var processOutput =
                "[dshow @ 0000023e3e56a1c0] DirectShow video devices (some may be both video and audio devices)\r\n" +
                "[dshow @ 0000023e3e56a1c0]  \"USB Boot\"\r\n" +
                "[dshow @ 0000023e3e56a1c0]     Alternative name \"@device_pnp_\\\\?\\usb#vid_0bda&pid_5846&mi_00#6&18d0fbe5&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global\"\r\n" +
                "dummy: Immediate exit requested";

            var result = new ProcessResult(1, "", processOutput);


            _mockExternalProcess
                .Setup(mep => mep.ExecuteAndReadSync(It.IsAny<ProcessStartInfo>()))
                .Returns(result);

            // When
            var audioInputs = _audioInputDetector.GetAudioInputs();

            // Then
            audioInputs.Should().NotBeNull();
            audioInputs.Count.Should().Be(0);
        }
    }
}
