namespace LivestreamService.Server.Streaming
{
    public class WebsocketConfiguration
    {
        public string AudioEncoding { get; }
        public string MimeType { get; }
        public int Port { get; }
        public int BurstSize { get; }

        public WebsocketConfiguration(string audioEncoding, string mimeType, int port, int burstSize)
        {
            AudioEncoding = audioEncoding;
            MimeType = mimeType;
            Port = port;
            BurstSize = burstSize;
        }
    }
}
