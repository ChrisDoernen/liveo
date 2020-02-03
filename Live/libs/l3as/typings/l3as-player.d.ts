import { UserAgentInfo } from "./user-agent-info";

export declare class L3asPlayer {

  /**
   * Constructs the L3asPlayer instance
   */
  constructor(UserAgentInfo,
    streamEndedExpectedCallback: () => void,
    streamEndedUnexpectedCallback: () => void);

  /**
   * Wheter the state is playing or stopped
   */
  isPlaying: boolean;

  /**
   * Whether the player is muted
   */
  muted: boolean;

  /**
   * Establishes a websocket connection to a audio stream and starts playing
   * @param streamingSourceId The id of the streaming source to connect to
   */
  play(streamingSourceId: string): void;

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
  mute(): void;

  /**
   * Sets the volume to the last value before muting
   */
  unmute(): void;
}