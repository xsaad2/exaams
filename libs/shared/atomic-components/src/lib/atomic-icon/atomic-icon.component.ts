import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

type Animation = 'spin' | 'pulse' | 'bounce' | 'ping'| '';
type Size = 'xs' | 's' | '1x' | '2x' | '3x'| '4x' | '5x';
const sizePixels = {
  'xs': 15,
  's': 20,
  '1x': 25,
  '2x': 50,
  '3x': 75,
  '4x': 100,
  '5x': 125,
}
@Component({
  selector: 'atomic-icon',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './atomic-icon.component.html',
})
export class AtomicIconComponent {

  iconName = input.required<string>()
  rotated = input<boolean>(false)
  animation = input<Animation>('')
  isFilled = input<boolean>(false)
  size = input<Size>('1x')

  protected readonly $sizePixels = computed(() => sizePixels[this.size()])
  
}
