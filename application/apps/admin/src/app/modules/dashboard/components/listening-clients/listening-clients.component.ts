import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { EVENTS } from "@liveo/constants";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { WebsocketService } from "../../../../services/websocket/websocket.service";

@Component({
  selector: "listening-clients",
  templateUrl: "./listening-clients.component.html",
  styleUrls: ["./listening-clients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListeningClientsComponent implements OnInit {

  public listeningClients$: Observable<string>;

  constructor(
    private readonly _websocketService: WebsocketService
  ) {
  }

  public ngOnInit(): void {
    this.listeningClients$ = this._websocketService.fromEvent<string>(EVENTS.listeningClients)
      .pipe(
        startWith("0")
      );
  }
}
