import { Component, OnInit } from "@angular/core";
import { Stream } from "../../entities/stream.entity";
import { StreamService } from "src/app/services/stream-service/stream.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.css"]
})
export class StreamComponent implements OnInit {

  public stream: Stream;
  private _isLoading: boolean;
  private _connectionError: boolean;

  constructor(private _route: ActivatedRoute, private _streamService: StreamService) {
  }

  public ngOnInit(): void {
    this.getStream();
  }

  private getStream(): void {
    const id = this._route.snapshot.paramMap.get("id");

    this._streamService.getStream(id).subscribe((stream) => {
      if (stream != null) {
        this.stream = stream;
      }
      this._isLoading = false;
    }, (error) => {
      this._connectionError = true;
      this._isLoading = false;
    });
  }
}
