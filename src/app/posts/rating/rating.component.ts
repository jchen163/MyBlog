import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() rating : number;
  @Output() ratingClicked : EventEmitter<string> = new EventEmitter();

  ratingArr : any[];

  constructor() { }

  ngOnInit() {
    this.ratingArr = Array(Math.round(this.rating)).fill(Math.round(this.rating));
  }

  ngOnChanges() {
  }

  ratingFn() {
    this.ratingClicked.emit('Current rating value = '+this.rating);
  }

}
