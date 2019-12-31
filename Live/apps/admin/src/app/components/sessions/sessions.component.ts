import { Component, OnInit } from "@angular/core";
import { SessionEntity, StreamEntity } from "@live/entities";
import { SessionService } from "../../services/session/session.service";
import { StreamService } from "../../services/stream/stream.service";

@Component({
  selector: "sessions",
  templateUrl: "./sessions.component.html",
  styleUrls: ["./sessions.component.scss"]
})
export class SessionsComponent implements OnInit {

  public sessions: SessionEntity[];
  private _streams: StreamEntity[] = [];

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _streamService: StreamService) {
  }

  public ngOnInit() {
    this._sessionService
      .getSessions()
      .toPromise()
      .then((sessions) => this.sessions = sessions);
    this._streamService.
      getStreams()
      .then((streams) => this._streams = streams);
  }

  public getStream(streamId: string): StreamEntity {
    return this._streams.find((stream) => stream.id === streamId);
  }

}
