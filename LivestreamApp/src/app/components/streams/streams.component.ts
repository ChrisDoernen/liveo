import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  title = 'Verfügbare Streams';
  streams;

  constructor() {
  }

  ngOnInit() {
  }

}
