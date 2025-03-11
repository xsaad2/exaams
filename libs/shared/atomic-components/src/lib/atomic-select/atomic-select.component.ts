/* eslint-disable @typescript-eslint/no-empty-function */

import {Component, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'atomic-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AtomicSelectComponent
    }
  ],
  templateUrl: './atomic-select.component.html',
})
export class AtomicSelectComponent implements ControlValueAccessor{

  public options = input<any[]>([]);
  public value = '';

  onChange = (value: string) => {
  };

  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  handleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onInput(value: typeof this.value): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

}
