using System.IO;
using System.Xml.Serialization;

namespace LivestreamService.Server.Utilities
{
    public class XmlUtilities
    {
        public static T ReadFromFile<T>(string file)
        {
            using (var streamReader = new StreamReader(file))
            {
                return (T)new XmlSerializer(typeof(T)).Deserialize(streamReader);
            }
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
