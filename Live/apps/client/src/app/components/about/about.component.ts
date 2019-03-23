import { Component, Input } from '@angular/core';
import { environment } from 'apps/client/src/environments/environment';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public _version: string = environment.version;
  public _revision: string = environment.revision;

  @Input()
  public hidden: boolean = true;

  public hide(): void {
    this.hidden = true;
  }
}
