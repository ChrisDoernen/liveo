using System.Security.Cryptography;
using System.Text;

namespace LivestreamApp.Shared.Utilities
{
    public class HashGenerator : IHashGenerator
    {
        private readonly MD5 _md5 = MD5.Create();

        public string GetMd5Hash(string input)
        {
            var bytes = _md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sBuilder = new StringBuilder();

            foreach (var b in bytes)
            {
                sBuilder.Append(b.ToString("x2"));
            }

            return sBuilder.ToString();
        }

        public void Dispose()
        {
            _md5?.Dispose();
        }
    }
}
