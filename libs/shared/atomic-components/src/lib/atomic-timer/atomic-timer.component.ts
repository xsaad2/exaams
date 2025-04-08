import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicIconComponent } from '../atomic-icon/atomic-icon.component';

@Component({
  selector: 'atomic-timer',
  standalone: true,
  imports: [CommonModule, AtomicIconComponent],
  templateUrl: './atomic-timer.component.html',
})
export class AtomicTimerComponent {
  public time = { min: 1, sec: 5 };
  counting = false;
  intervalId!: NodeJS.Timer;

  startTimer() {
    this.counting = true;
    this.intervalId = setInterval(() => {
      if (this.time.sec === 0 && this.time.min > 0) {
        this.time.min = this.time.min - 1;
        this.time.sec = 59;
      }
      if (this.time.sec > 0) {
        this.time.sec = this.time.sec - 1;
      }
      if (this.time.min === 0 && this.time.sec === 0) {
        clearInterval(this.intervalId);
        console.log('Time is up!');
        this.counting = false;
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
    this.counting = false;
  }

  get minutesLeft(): number {
    return this.time.min;
  }
  get currentTime(): string {
    const minutes = this.time.min < 10 ? '0' + this.time.min : this.time.min;
    const seconds = this.time.sec < 10 ? '0' + this.time.sec : this.time.sec;
    return `${minutes}:${seconds}`;
  }
}
