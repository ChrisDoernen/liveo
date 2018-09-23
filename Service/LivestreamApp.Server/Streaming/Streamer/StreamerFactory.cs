using LivestreamApp.Server.Streaming.Environment;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LivestreamApp.Server.Streaming.Streamer
{
    public class StreamerFactory : IStreamerFactory
    {
        private readonly IResolutionRoot _kernel;
        private readonly List<Mp3Streamer> _streamers = new List<Mp3Streamer>();

        public StreamerFactory(IResolutionRoot kernel)
        {
            _kernel = kernel;
        }

        public IStreamer GetStreamer(Device device)
        {
            var deviceType = device.GetType();

            if (deviceType == typeof(AudioDevice))
            {
                return GetAudioStreamer(device);
            }

            throw new ArgumentException("Cannot crate streamer: Unsupported device type.");
        }

        private IStreamer GetAudioStreamer(Device audioDevice)
        {
            var streamer = _streamers.FirstOrDefault(s => s.AudioDevice.Equals(audioDevice));

            if (streamer != null)
            {
                return streamer;
            }

            var newStreamer = _kernel.Get<Mp3Streamer>(new ConstructorArgument("audioDevice", audioDevice));
            _streamers.Add(newStreamer);

            return newStreamer;
        }
    }
}
