namespace LivestreamApp.Server.Shared.Utilities
{
    /// <summary>
    ///     Provides read and write access to files
    /// </summary>
    public interface IConfigDataAdapter
    {
        /// <summary>
        ///     Loads an object from a given config file
        /// </summary>
        /// <typeparam name="T">The type of the object to retrieve</typeparam>
        /// <typeparam name="TConfig">The type of the config element</typeparam>
        /// <param name="config">The source config file</param>
        /// <param name="scheme">The xml scheme of the config file</param>
        /// <returns></returns>
        T Load<T, TConfig>(string config, string scheme);

        /// <summary>
        ///     Saves an object to a given config file
        /// </summary>
        /// <typeparam name="T">The type of the object to save</typeparam>
        /// <typeparam name="TConfig">The type of the config element</typeparam>
        /// <param name="objectToSave">The object to save</param>
        /// <param name="config">The target config file</param>
        void Save<T, TConfig>(T objectToSave, string config);
    }
}
