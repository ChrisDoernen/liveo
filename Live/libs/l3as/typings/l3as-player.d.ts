export declare class L3asPlayer {

  /**
   * Constructs the L3asPlayer instance
   * @param port The port to establish the websocket connection on
   * @param OnPlayerUnderrun Callback to be called when player underruns
   */
  constructor(port: string, OnPlayerUnderrun: () => void);

  /**
   * Establishes a websocket connection to a audio stream
   * @param streamId The id of the stream to connect to
   */
  ConnectToStream(streamId: string): void;

  /**
   * Start playback
   */
  Play(): void;

  /**
   * Stops playback and disconnects from the stream
   */
  Stop(): void;

  /**
   * Sets the volume to the according value
   * @param volume Number between 0 and 1
   */
  SetVolume(volume: number);
}