import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'atomic-radio-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-radio-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AtomicRadioInputComponent,
    },
  ],
})
export class AtomicRadioInputComponent implements ControlValueAccessor {
  label = input<string>('');
  name = input<string>('');
  options = input<string[]>([]);
  isChecked = input<boolean>(false);
  disabled = input<boolean>(false);
  public value = '';
  checked = this.isChecked();

  onChange = (value: string) => {
    this.value = value;
    this.checked = true;
  };
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleInputChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
