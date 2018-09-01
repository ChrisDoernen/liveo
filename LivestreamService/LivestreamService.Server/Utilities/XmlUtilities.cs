using System;
using System.IO;
using System.Reflection;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace LivestreamService.Server.Utilities
{
    public class XmlUtilities
    {
        public static T ValidateAndDeserialize<T>(string file, string schemaResource)
        {
            var schemas = new XmlSchemaSet();

            var myAssembly = Assembly.GetExecutingAssembly();
            using (var schemaStream = myAssembly.GetManifestResourceStream(schemaResource))
            {
                var schema = XmlSchema.Read(schemaStream, null);
                schemas.Add(schema);
            }

            Exception firstException = null;

            var settings = new XmlReaderSettings
            {
                Schemas = schemas,
                ValidationType = ValidationType.Schema,
                ValidationFlags = XmlSchemaValidationFlags.ProcessIdentityConstraints
                                  | XmlSchemaValidationFlags.ReportValidationWarnings
            };
            settings.ValidationEventHandler +=
                delegate (object sender, ValidationEventArgs args)
                {
                    if (args.Severity == XmlSeverityType.Warning)
                    {
                    }
                    else
                    {
                        if (firstException == null)
                        {
                            firstException = args.Exception;
                        }
                    }
                };

            T result;
            using (var input = new StreamReader(file))
            using (var reader = XmlReader.Create(input, settings))
            {
                var ser = new XmlSerializer(typeof(T));
                result = (T)ser.Deserialize(reader);
            }


            if (firstException != null)
            {
                throw firstException;
            }

            return result;
        }

        public static void WriteToFile<T>(T objectToSave, string file)
        {
            using (var streamWriter = new StreamWriter(file))
            {
                new XmlSerializer(typeof(T)).Serialize(streamWriter, objectToSave);
            }
        }
    }
}
