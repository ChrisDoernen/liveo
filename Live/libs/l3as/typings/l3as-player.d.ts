export declare class L3asPlayer {

  /**
   * Constructs the L3asPlayer instance
   */
  constructor();

  /**
   * Wheter the state is playing or stopped
   */
  playing: boolean;

  /**
   * Whether the player is muted
   */
  muted: boolean;

  /**
   * Establishes a websocket connection to a audio stream and starts playing
   * @param streamId The id of the stream to connect to
   */
  play(streamId: string): void;

  /**
   * Stops playback and disconnects from the stream
   */
  stop(): void;

  /**
   * Sets the volume to the according value
   * @param volume Number between 0 and 1
   */
  setVolume(volume: number);

  /**
   * Sets the volume to 0
   */
  mute();

  /**
   * Sets the volume to the last value before muting
   */
  unmute();
}