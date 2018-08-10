import { Component } from '@angular/core';
import { StreamsService } from './services/streams-service.service';
import { LiveStream } from './entities/live-stream.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Livestream app';
  private availableLiveSteams: LiveStream[];

  constructor(private streamsService: StreamsService){}

  ngOnInit() {
    this.getAvailableLiveStreams();
    
  }
  
  private getAvailableLiveStreams() {
    this.streamsService.getAvailableLiveStreams()
    .subscribe((streams) => {
      this.availableLiveSteams = streams;
      debugger;
    })
  }
}
