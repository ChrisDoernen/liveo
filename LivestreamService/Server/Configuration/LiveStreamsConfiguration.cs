using NLog;
using System;
using System.IO;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace Server.Configuration
{
    class LiveStreamsConfiguration
    {
        private readonly ILogger logger;
        private readonly string LiveStreamsConfig = "LiveStreams.config";
        private readonly string LiveStreamsXsd = "LiveStreams.xsd";

        public LiveStreamsConfiguration()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        public LiveStreams GetAvailableStreams()
        {
            TryValidateConfigFilesExistance(this.LiveStreamsConfig, this.LiveStreamsXsd);
            TryValidateLiveStreamsConfigFile(this.LiveStreamsConfig, this.LiveStreamsXsd);

            var liveStreams = TryDeserializeLiveStreams(this.LiveStreamsConfig);

            return liveStreams;
        }

        private LiveStreams TryDeserializeLiveStreams(string liveStreamsConfigFile)
        {
            try
            {
                return DeserializeLiveStreams(liveStreamsConfigFile);
            }
            catch (Exception ex)
            {
                logger.Info("Deserialisazion of {liveStreamsConfigFile} failed.");
                logger.Error(ex.Message + ex.StackTrace);
                throw ex;
            }
        }

        private LiveStreams DeserializeLiveStreams(string liveStreamsConfigFile)
        {
            XmlSerializer deserializer = new XmlSerializer(typeof(LiveStreams));
            TextReader reader = new StreamReader(liveStreamsConfigFile);
            var liveStreams = (LiveStreams)deserializer.Deserialize(reader);
            reader.Close();

            logger.Info($"Deserialisazion of Live streams from {liveStreamsConfigFile} successful ({liveStreams.liveStreams.Count}).");
            return liveStreams;
        }

        private void TryValidateConfigFilesExistance(string liveStreamsConfigFile, string liveStreamsConfigXsd)
        {
            try
            {
                ValidateConfigFilesExistance(liveStreamsConfigXsd, liveStreamsConfigFile);
            }
            catch (Exception ex)
            {
                logger.Info($"{liveStreamsConfigXsd} and {liveStreamsConfigFile} validation failed.");
                logger.Error(ex.Message + ex.StackTrace);
                throw ex;
            }
        }

        private void ValidateConfigFilesExistance(string liveStreamsXsd, string liveStreamsConfig)
        {
            if (liveStreamsXsd == null)
                throw new ArgumentException($"The LiveStreams.config could not be found.");

            if (liveStreamsConfig == null)
                throw new ArgumentException($"The LiveStreams.xsd could not be found.");

            if (!File.Exists(liveStreamsXsd))
                throw new ArgumentException($"The LiveStreams.config could not be found.");

            if (!File.Exists(liveStreamsConfig))
                throw new ArgumentException($"The LiveStreams.xsd could not be found.");

            logger.Info("LiveStreams.xsd and LiveStreams.config exist.");
        }

        private void TryValidateLiveStreamsConfigFile(string liveStreamsConfigFile, string liveStreamsConfigXsd)
        {
            try
            {
                ValidateLiveStreamsConfigFile(liveStreamsConfigXsd, liveStreamsConfigFile);
            }
            catch (Exception ex)
            {

                logger.Info($"Validation of {liveStreamsConfigFile} failed.");
                logger.Error(ex.Message + ex.StackTrace);
                throw ex;
            }
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

            logger.Info($"Validation of {xmlFile} successful.");
        }

        private void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Warning)
            {
                logger.Info($"StreamsConfigValidation Warning: {e.Message}");

            }
            else if (e.Severity == XmlSeverityType.Error)
            {
                throw new ArgumentException(e.Message);
            }
        }
    }
}
