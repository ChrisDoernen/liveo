import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.release';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public deployUrl = environment.deployUrl;
}
