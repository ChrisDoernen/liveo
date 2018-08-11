import { Component, OnInit, Input } from '@angular/core';
import { LiveStream } from '../../entities/live-stream.entity';

@Component({
  selector: 'stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
 
  @Input()
  public stream: LiveStream;

  constructor() { }

  ngOnInit() {
  }

}
