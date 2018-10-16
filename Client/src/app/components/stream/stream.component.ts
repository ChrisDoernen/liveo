import { Component, OnInit, Input } from '@angular/core';
import { Stream } from '../../entities/stream.entity';

@Component({
  selector: 'stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
 
  @Input()
  public stream: Stream;

  constructor() { }

  ngOnInit() {
  }

}
