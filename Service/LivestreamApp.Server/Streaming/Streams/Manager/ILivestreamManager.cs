using LivestreamApp.Server.Streaming.Streams.Entities;

namespace LivestreamApp.Server.Streaming.Streams.Manager
{
    /// <summary>
    ///     Manages available livestreams
    /// </summary>
    public interface ILivestreamManager
    {
        /// <summary>
        ///     Gets Available livestreams
        /// </summary>
        Livestreams Livestreams { get; }

        /// <summary>
        ///     Updates an existing livestream or adds a new one
        /// </summary>
        /// <param name="livestream">The livestream object containing the new values</param>
        void UpdateLivestream(Livestream livestream);

        /// <summary>
        ///     Deletes livestream
        /// </summary>
        /// <param name="id">Id of the livestream to delete</param>
        void DeleteLivestream(string id);

        /// <summary>
        ///     Gets the avaliable livestreams from config file
        /// </summary>
        void GetLivestreamsFromConfig();
    }
}