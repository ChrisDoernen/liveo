using FluentAssertions;
using LivestreamApp.Server.Shared.Utilities;
using LivestreamApp.Server.Streaming.Livestreams.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Xml.Schema;

namespace LivestreamApp.Server.Test.Tests.Shared.Utilities
{
    [TestClass]
    public class XmlSerializerTest
    {
        private const string Scheme = "LivestreamApp.Server.Streams.xsd";

        [TestMethod]
        public void ValidateAndDeserialize_ValidConfig_ShouldReturnCorrectObject()
        {
            // Given
            const string validConfig = "TestResources\\Config\\ValidStreams.config";

            // When
            var deserialized =
                XmlSerializer.ValidateAndDeserialize<StreamsType>(validConfig, Scheme);

            // Then
            deserialized.Streams.Length.Should().Be(2);
            deserialized.Streams[0].Id.Should().Be("deutsch");
            deserialized.Streams[0].CountryCode.Should().Be("de");
            deserialized.Streams[0].Description.Should().Be("Originalton");
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void ReadFromConfigFile_InvalidNamespace()
        {
            // Given
            const string invalidNamespaceConfig =
                "TestResources\\Config\\InvalidNamespaceStreams.config";

            // When
            var deserialized =
                XmlSerializer.ValidateAndDeserialize<StreamsType>(invalidNamespaceConfig, Scheme);
        }

        [TestMethod]
        [ExpectedException(typeof(XmlSchemaValidationException))]
        public void ReadFromConfigFile_InvalidConfig()
        {
            // Given
            const string invalidConfig = "TestResources\\Config\\InvalidStreams.config";

            // When
            var deserialized =
                XmlSerializer.ValidateAndDeserialize<StreamsType>(invalidConfig, Scheme);
        }
    }
}
