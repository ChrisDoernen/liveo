import { Component, OnInit } from '@angular/core';
import { LiveStream } from '../../entities/live-stream.entity';
import { StreamsService } from '../../services/streams-service.service';

@Component({
  selector: 'select-streams',
  templateUrl: './select-stream.component.html',
  styleUrls: ['./select-stream.component.css']
})
export class SelectStreamComponent implements OnInit {

  title = 'Verfügbare Streams';
  availableLiveSteams: LiveStream[];

  constructor(private streamsService: StreamsService) {
  }

  ngOnInit() {
    this.getAvailableLiveStreams();
  }
  
  private getAvailableLiveStreams() {
    this.streamsService.getAvailableLiveStreams()
    .subscribe((streams) => {
      this.availableLiveSteams = streams;
    })
  }
}
