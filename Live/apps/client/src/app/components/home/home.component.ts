import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { UserAgentService } from '../../services/user-agent/user-agent.service';
import { StreamEntity } from '@live/entities';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private _selectedStream: StreamEntity = null;

  public hideAboutOverlay: boolean = true;

  constructor(
    public _dataService: DataService,
    private _userAgentService: UserAgentService
  ) {}

  public streamOnClick(stream: StreamEntity): void {
    console.debug(`Click event on stream ${stream.id}.`);
    if (this._selectedStream == stream) {
      this._selectedStream = null;
      console.debug('Unselecting stream.');
    } else {
      this._selectedStream = stream;
      console.debug(`Selecting stream ${stream.id}.`);
    }
  }

  public showAboutOverlay(): void {
    this.hideAboutOverlay = false;
  }
}
