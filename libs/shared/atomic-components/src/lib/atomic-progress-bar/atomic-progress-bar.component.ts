import {
  Component,
  computed,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atomic-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-progress-bar.component.html',
})
export class AtomicProgressBarComponent {
  maxValue = input.required<number>();
  actualValue = input.required<number>();
  underTitle = input<string>('');
  @ViewChild('bar', { static: true }) bar!: ElementRef<HTMLDivElement>;

  percentage = computed(() => {
    if (this.maxValue() === 0) {
      return 0;
    }
    const percentage = (this.actualValue() / this.maxValue()) * 100;

    if (this.bar) {
      this.bar.nativeElement.style.width = `${percentage}%`;
    }

    return percentage;
  });
}
