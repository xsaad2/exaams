/* eslint-disable @typescript-eslint/no-empty-function */

import { Component, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputType = 'textarea'|'checkbox' | 'radio' |'text'| 'password' |  'email'| 'number' | 'tel' | 'url'  | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';


@Component({
  selector: 'atomic-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AtomicInputComponent
    }
  ]
})
export class AtomicInputComponent implements ControlValueAccessor {
  public label = input<string>('');
  public placeholder = input<string>('');
  public type = input<InputType>('text');
  public errorMessage = input<string>('');
  public isInvalid = input<boolean>(false);
  public checked = input<boolean>(false);
  public checkboxText = input<string>('');
  public isDisabled = input<boolean>(false);
  public checkBoxValue = input<string>('');
  public id = input<string>('');

  public value = '';

  onChange = (value: string) => {
  };
  onTouched: () => void = () => {
  };
  constructor() {
    // effect(() => {
    //   this.value = this.checkBoxValue();
    // })
  }



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

  setDisabledState(isDisabled: boolean): void {
    // this.isDisabled = isDisabled;
  }

  handleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
    if(this.type() === 'checkbox'){
      this.value = this.checkBoxValue();
    }
  }

  onInput(value: typeof this.value): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}

