using NLog;
using Service.Entities;
using System;
using System.Configuration;
using System.IO;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace Service.Configuration
{
    class LiveStreamManager
    {
        private readonly ILogger logger;
        private readonly string XmlFileAppConfigAppSettingsKey = "LiveStreamsConfigFile";
        private readonly string XsdFileAppConfigAppSettingsKey = "LiveStreamsConfigXsd";

        public LiveStreamManager()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        public LiveStreams GetAvailableStreamsFromConfig()
        {
            var liveStreamsConfigFile = ConfigurationManager.AppSettings[XmlFileAppConfigAppSettingsKey];
            var liveStreamsConfigXsd = ConfigurationManager.AppSettings[XsdFileAppConfigAppSettingsKey];

            TryValidateConfigFilesExistance(liveStreamsConfigFile, liveStreamsConfigXsd);
            TryValidateLiveStreamsConfigFile(liveStreamsConfigFile, liveStreamsConfigXsd);

            LiveStreams liveStreams = TryDeserializeLiveStreams(liveStreamsConfigFile);

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

            logger.Info($"Deserialisazion of Live streams from {liveStreamsConfigFile} successful. Got {liveStreams.liveStreams.Count} available streams.");
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

        private void ValidateConfigFilesExistance(string liveStreamsConfigXsd, string liveStreamsConfigFile)
        {
            if (liveStreamsConfigXsd == null) throw new ArgumentException($"The path to the xsd file file could not be found in App.config. Key: {XsdFileAppConfigAppSettingsKey}");
            if (liveStreamsConfigFile == null) throw new ArgumentException($"The path to the config file for live streams could not be found in App.config. Key: {XmlFileAppConfigAppSettingsKey}");

            if (!File.Exists(liveStreamsConfigXsd)) throw new ArgumentException($"The {liveStreamsConfigXsd} file given in App.config does not exist. Key: {XsdFileAppConfigAppSettingsKey}");
            if (!File.Exists(liveStreamsConfigFile)) throw new ArgumentException($"The {liveStreamsConfigFile} file given in App.config does not exist. Key: {XmlFileAppConfigAppSettingsKey}");

            logger.Info("Xsd and config file are given in App.config and do exist.");
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
