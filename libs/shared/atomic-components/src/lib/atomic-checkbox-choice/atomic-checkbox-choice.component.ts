import { Component, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Question } from '@com.language.exams/exaams-backend/utils';

@Component({
  selector: 'atomic-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-checkbox-choice.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AtomicCheckboxChoiceComponent,
    },
  ],
})
export class AtomicCheckboxChoiceComponent implements ControlValueAccessor {
  useAlphabetLabels = signal(false);
  label = input<string>('');
  name = input<string>('');
  choices = input<string[]>([]);
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
