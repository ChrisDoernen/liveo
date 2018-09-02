using LivestreamService.Server.Configuration;
using LivestreamService.Server.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ninject.Extensions.Logging;

namespace LivestreamService.Server.Test
{
    [TestClass]
    public class AudioConfigurationTest
    {
        [TestMethod]
        public void GetAudioInputs()
        {
            // Arrange
            var mockLogger = new Mock<ILogger>();
            var mockExternalProcess = new Mock<IExternalProcess>();

            var audioConfiguration = new AudioConfiguration(mockLogger.Object, mockExternalProcess.Object);



            // Act
            var audioInputs = audioConfiguration.GetAudioInputs();
            mockExternalProcess.Raise(m => m.ErrorDataReceived += null, "");

            // Assert

        }
    }
}
