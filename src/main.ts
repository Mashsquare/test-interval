import 'zone.js/dist/zone';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
    {{displayTime$ | async}}
    <button (click)="onToggle()">{{isPlaying? 'pause' : 'play'}}</button>
    <div>
    <input type="range" id="vol" name="vol" min="0" max="50" #ref (change)="onChange(ref.value)" value="{{displayTime$ | async}}">
    </div>
    </div>
  `,
})
export class App implements OnDestroy {
  name = 'Angular';

  displayTime$ = new BehaviorSubject(0);
  currentTime: number = 0;
  isPlaying: boolean = false;

  myInterval = setInterval(() => {
    if (this.isPlaying) this.displayTime$.next(this.currentTime++);
  }, 1000);

  onToggle() {
    this.isPlaying = !this.isPlaying;
  }

  onChange(e: any) {
    this.currentTime = e;
  }

  ngOnDestroy() {
    clearInterval(this.myInterval);
  }
}

bootstrapApplication(App);
