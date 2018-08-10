import { Component } from '@angular/core';
import { StreamsService } from './services/streams-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Livestream app';
  private availableLiveSteams: any;

  constructor(private streamsService: StreamsService){}

  ngOnInit() {
    this.getAvailableLiveStreams();
    
  }
  
  private getAvailableLiveStreams() {
    debugger;
    try {
      const as = this.streamsService.getAvailableLiveStreams()
       as.subscribe(
         (as) => {console.log(as)},
         (error) => console.log(error),
         () => console.log("completed")) 
    } catch (e) {
      console.log(e);
    }
  }
}
