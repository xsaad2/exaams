import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicIconComponent } from '../atomic-icon/atomic-icon.component';

export type AlertStyle = 'danger' | 'warn' | 'success' | 'info';

@Component({
  selector: 'atomic-alert',
  standalone: true,
  imports: [CommonModule, AtomicIconComponent],
  templateUrl: './atomic-alert.component.html',
})
export class AtomicAlertComponent {
  color = input<AlertStyle>('info');
  iconName = input<string>('');

  alertClasses = computed(() => {
    const baseClasses = 'p-4 rounded-md mb-4 text-sm';
    const stateClasses: { [key: string]: string } = {
      danger: 'bg-red-100 text-red-800 border-2 border-red-800',
      warn: 'bg-yellow-100 text-yellow-800 border-2 border-yellow-800',
      success: 'bg-green-100 text-green-800 border-2 border-green-800',
      info: 'bg-blue-100 text-blue-800 border-2 border-blue-800',
    };
    return `${baseClasses} ${stateClasses[this.color()] || ''}`;
  });
}
