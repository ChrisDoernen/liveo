using System;

namespace LivestreamApp.Server.Streaming.Processes
{
    public class MessageReceivedEventArgs : EventArgs
    {
        public string Message { get; set; }

        public MessageReceivedEventArgs(string message)
        {
            Message = message;
        }
    }
}
