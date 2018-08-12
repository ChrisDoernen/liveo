import { Component, OnInit } from '@angular/core';
import { LiveStream } from '../../entities/live-stream.entity';
import { StreamsService } from '../../services/streams-service.service';

@Component({
  selector: 'select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})
export class SelectLanguageComponent implements OnInit {

  availableLiveSteams: LiveStream[];
  isLoading: boolean = true;
  connectionError: boolean = false ;

  constructor(private streamsService: StreamsService) {
  }

  ngOnInit() {
    this.getAvailableLiveStreams();
  }
  
  private getAvailableLiveStreams() {
    this.streamsService.getAvailableLiveStreams()
    .subscribe((streams) => {
      this.availableLiveSteams = streams;
    }, (error) => {
      this.connectionError = true;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    }
  )}
}
