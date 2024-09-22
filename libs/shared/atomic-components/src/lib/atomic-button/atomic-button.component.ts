import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BtnType = 'button' | 'submit' | 'reset';
type Animation = 'spin' | 'pulse' | 'bounce' | 'ping'| '';


@Component({
  selector: 'atomic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-button.component.html',
})
export class AtomicButtonComponent {
  type = input<BtnType>('button')
  animation = input<Animation>('')

}
