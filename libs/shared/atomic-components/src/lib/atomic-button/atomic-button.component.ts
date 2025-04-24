import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicIconComponent } from '../atomic-icon/atomic-icon.component';

type BtnType = 'button' | 'submit' | 'reset';
type Animation = 'spin' | 'pulse' | 'bounce' | 'ping' | '';
export type ButtonColors =
  | 'primary'
  | 'secondary'
  | 'warn'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary-light'
  | 'secondary-dark'
  | 'warn-light'
  | 'warn-dark'
  | 'transparent';

@Component({
  selector: 'atomic-button',
  standalone: true,
  imports: [CommonModule, AtomicIconComponent],
  templateUrl: './atomic-button.component.html',
})
export class AtomicButtonComponent {
  type = input<BtnType>('button');
  animation = input<Animation>('');
  color = input<ButtonColors>('primary');

  get ButtonColor() {
    switch (this.color()) {
      case 'primary':
        return 'text-white bg-primary hover:text-white hover:bg-black';
      case 'transparent':
        return 'text-black bg-white hover:text-white hover:bg-black';
      default:
        return 'bg-primary text-white';
    }
  }
}
