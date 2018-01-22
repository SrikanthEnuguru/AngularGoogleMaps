import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-window',
  template: `
    <div>Example passing params: {{ param }}</div>
    <div>
      Counter <button (click)="increment()">Increment</button> {{ counter }} 
    </div>
  `,
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent {

  param: any;
  counter: number = 0;

  onCounterIncremented = new EventEmitter();
  increment() {
    this.onCounterIncremented.emit(++this.counter);
  }

}
