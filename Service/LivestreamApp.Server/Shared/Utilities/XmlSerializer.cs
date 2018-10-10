﻿using System;
using System.IO;
using System.Reflection;
using System.Xml;
using System.Xml.Schema;

namespace LivestreamApp.Server.Shared.Utilities
{
    public class XmlSerializer
    {
        public static T ValidateAndDeserialize<T>(string file, string schemaResource)
        {
            var schemas = new XmlSchemaSet();

            var myAssembly = Assembly.GetExecutingAssembly();
            using (var schemaStream = myAssembly.GetManifestResourceStream(schemaResource))
            {
                var schema = XmlSchema.Read(schemaStream ?? throw new InvalidOperationException(), null);
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
                var ser = new System.Xml.Serialization.XmlSerializer(typeof(T));
                result = (T)ser.Deserialize(reader);
            }


            if (firstException != null)
            {
                throw firstException;
            }

            return result;
        }

        public static void Serialize<T>(T objectToSave, string file)
        {
            using (var streamWriter = new StreamWriter(file))
            {
                new System.Xml.Serialization.XmlSerializer(typeof(T)).Serialize(streamWriter, objectToSave);
            }
        }
    }
}