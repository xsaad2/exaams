/*  eslint-disable @typescript-eslint/no-empty-function */
import {Component, effect, input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Question} from "@com.language.exams/exaams-backend/utils";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'lib-yes-no',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yes-no.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: YesNoComponent
    }
  ]
})
export class YesNoComponent implements ControlValueAccessor{
  value = signal<string>('');
  isDisabled = false;

  question = input<Question>();
  clicked = signal<boolean>(false);

  constructor() {
    effect(() => {
      if(this.question()?.questionNumber === 0) {
        this.clicked.set(true)
        this.value.set(this.question()?.correctAnswer || '');
      }
    }, {allowSignalWrites: true})
  }

  onYes() {
    this.value.set('Ja');
    this.clicked.set(!this.clicked())
    this.onChange(this.value());
  }
  onNo() {
    this.value.set('Nein');
    this.clicked.set(!this.clicked())
    this.onChange(this.value());
  }

  onChange = (value: string) => {
  };
  onTouched: () => void = () => {
  };
  writeValue(value: string): void {
    this.value.set(value);
  }
  registerOnChange(fn: any): void {
      this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
  }
}
