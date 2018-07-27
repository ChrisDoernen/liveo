using NLog;
using Service.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;

namespace Service.Configuration
{
    class LiveStreamManager
    {
        private readonly ILogger logger;

        public LiveStreamManager()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        public List<LiveStream> GetAvailableStreamsFromConfig()
        {
            ReadStreamsNodeFromConfig();
            return null;
        }

        private void ReadStreamsNodeFromConfig()
        {
            var liveStreamsConfigFile = ConfigurationManager.AppSettings["LiveStreamsConfigFile"];
            var liveStreamsConfigXsd = ConfigurationManager.AppSettings["LiveStreamsConfigXsd"];
            ValidateLiveStreamsConfigFile(liveStreamsConfigXsd, liveStreamsConfigFile);

            var config = XDocument.Load(File.OpenRead(liveStreamsConfigFile));
            
        }

        private void ValidateLiveStreamsConfigFile(string xsdFile, string xmlFile)
        {
            logger.Info($"Starting validation of {xmlFile} against {xsdFile}.");

            var liveStreamsConfig = new XmlDocument();
            var schemaReader = new XmlTextReader(xsdFile);
            var scheme = XmlSchema.Read(schemaReader, ValidationEventHandler);

            liveStreamsConfig.Schemas.Add(scheme);
            liveStreamsConfig.Load(xmlFile);
            
            liveStreamsConfig.Validate(ValidationEventHandler);
            
            logger.Info($"Finished validation.");
        }

        private void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Warning)
            {
                logger.Info($"StreamsConfigValidation Warning: {e.Message}");

            }
            else if (e.Severity == XmlSeverityType.Error)
            {
                logger.Info($"StreamsConfigValidation Error: {e.Message}");
                logger.Info($"Validation of LiveStreams.config failed. Starting service aborted.");
                throw new ArgumentException("Validation of LiveStreams.config failed.");
            }
        }
    }
}
