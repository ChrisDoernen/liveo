namespace LivestreamApp.Server.Streaming.Streams.Manager
{
    /// <summary>
    ///     Provides functionality to manage livestreams
    /// </summary>
    public interface ILivestreamManager
    {
        /// <summary>
        ///     Get livestreams
        /// </summary>
        Livestreams Livestreams { get; }

        /// <summary>
        ///     Update an existing livestream or adds a new one
        /// </summary>
        /// <param name="livestream">The livestream entity containing the new values</param>
        void UpdateLivestream(Livestream livestream);

        /// <summary>
        ///     Delete livestream
        /// </summary>
        /// <param name="id">Id of the livestream to delete</param>
        void DeleteLivestream(string id);

        /// <summary>
        ///     Get livestreams from config file
        /// </summary>
        void GetLivestreamsFromConfig();
    }
}