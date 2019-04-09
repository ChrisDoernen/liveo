import { Component, Input, OnInit } from "@angular/core";
import { L3asService } from "@live/services";
import { Options } from "ng5-slider";

@Component({
  selector: "audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent {

  constructor(private _l3asService: L3asService) {
    this._l3asService.setVolume(this._volume);
    this._l3asService.mute();
  }

  @Input()
  public set selectedStream(streamId: string) {
    if (this._l3asService) {
      console.debug(`Selected stream id: ${streamId}.`);
      this.selectedStreamId = streamId;

      if (streamId) {
        this._l3asService.play(streamId);
        this._l3asService.mute();
      } else {
        if (this._l3asService.isPlaying)
          this._l3asService.stop();
      }
    }
  }

  public selectedStreamId: string;

  private _volume = 0.6;

  private _isPlaying = false;

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
}
