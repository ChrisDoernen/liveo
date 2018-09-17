using System;

namespace LivestreamApp.Server.Streaming.Processes
{
    public class BytesReceivedEventArgs : EventArgs
    {
        public byte[] Bytes { get; set; }

        public BytesReceivedEventArgs(byte[] bytes)
        {
            Bytes = bytes;
        }
    }
}