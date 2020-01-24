import { Component, Input } from "@angular/core";
import { L3asService, Logger, UserAgentService } from "@live/services";
import { Options } from "ng5-slider";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent {

  constructor(
    private _logger: Logger,
    private _l3asService: L3asService,
    userAgentService: UserAgentService) {
    this._l3asService.initialize(userAgentService.userAgentInfo, this.onStreamEndedExpected.bind(this), this.onStreamEndedUnxpected.bind(this));
    this._l3asService.setVolume(this._volume);
    this._l3asService.mute();
  }

  @Input()
  public set selectedStream(streamingId: string) {
    if (this._l3asService) {
      this._logger.info(`Selected stream id: ${streamingId}.`);
      this.selectedStreamId = streamingId;

      if (streamingId) {
        this._l3asService.play(streamingId);
        this._l3asService.mute();
      } else {
        if (this._l3asService.isPlaying) {
          this._l3asService.stop();
          this._isPlaying = false;
          this._l3asService.mute();
        }
      }
    }
  }

  public selectedStreamId: string;

  private _volume = 0.6;

  public _isPlaying = false;

  public options: Options = {
    floor: 0,
    ceil: 1,
    step: 0.01,
    hidePointerLabels: true,
    hideLimitLabels: true
  };

  @Input()
  public set volume(value: number) {
    this._volume = value;
    this._l3asService.setVolume(value);
  }

  public get volume(): number {
    return this._volume;
  }

  public onPlayPauseClick(): void {
    if (this._isPlaying) {
      this._isPlaying = false;
      this._l3asService.mute();
    } else {
      this._isPlaying = true;
      this._l3asService.unmute();
    }
  }

  private onStreamEndedExpected(): void {
  }

  private onStreamEndedUnxpected(): void {
  }
}
