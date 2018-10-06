using LivestreamApp.Server.Streaming.Streams.Entities;
using System.Collections.Generic;

namespace LivestreamApp.Server.Streaming.Streams.Manager
{
    /// <summary>
    ///     Provides functionality to manage streams
    /// </summary>
    public interface IStreamManager
    {
        /// <summary>
        ///     Get streams
        /// </summary>
        List<Stream> GetStreams();

        /// <summary>
        ///     Create a new stream
        /// </summary>
        /// <param name="streamBackendEntity">Entity containing the new values</param>
        void CreateStream(StreamBackendEntity streamBackendEntity);

        /// <summary>
        ///     Update an existing livestream or adds a new one
        /// </summary>
        /// <param name="streamBackendEntity">Entity containing the new values</param>
        void UpdateStream(StreamBackendEntity streamBackendEntity);

        /// <summary>
        ///     Delete stream
        /// </summary>
        /// <param name="id">Id of the stream to delete</param>
        void DeleteStream(string id);

        /// <summary>
        ///     Get streams from config file
        /// </summary>
        void LoadStreamsFromConfig();
    }
}