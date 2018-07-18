import { Component, OnInit } from '@angular/core';
import { StreamsService } from './../streams.service';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  title = 'Verfügbare Streams';
  streams;

  constructor(private streamsService: StreamsService) { 
    this.streams = streamsService.getStreams();
  }

  ngOnInit() {
  }

}
