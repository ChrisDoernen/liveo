using LivestreamService.Server.Entities;
using LivestreamService.Server.Utilities;

using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LivestreamService.Server.Test
{
    [TestClass]
    public class XmlUtilitiesTests
    {
        private readonly string ValidConfig = "LiveStreams.config";

        [TestMethod]
        public void ReadFromFile_ValidConfig()
        {
            // ARANGE
            var validConfig = ValidConfig;

            // ACT
            var deserialized = XmlUtilities.ReadFromFile<LivestreamsType>(validConfig);

            // ASSERT
            Assert.AreEqual(2, deserialized.LiveStream.Length);
        }
    }
}
