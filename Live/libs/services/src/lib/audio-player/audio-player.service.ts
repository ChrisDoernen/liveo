import { Injectable } from "@angular/core";
import { L3asPlayer } from "@live/l3as";

@Injectable({
  providedIn: "root"
})
export class AudioPlayerService {
  private l3asPlayer: L3asPlayer;

  constructor() {
    this.l3asPlayer = new L3asPlayer();
  }

  public play(streamId: string): void {
    this.l3asPlayer.play(streamId);
  }

  public stop(): void {
    this.l3asPlayer.stop();
  }

  public setVolume(value: number): void {
    this.l3asPlayer.setVolume(value);
  }
}