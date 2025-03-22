import {Component, effect, input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Question} from "@com.language.exams/exaams-backend/utils";

export type BinaryQuestion = {
  question: Question;
  correctAnswer: string;
}

@Component({
  selector: 'lib-binary-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binary-question.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BinaryQuestionComponent
    }
  ]
})
export class BinaryQuestionComponent implements ControlValueAccessor{
  btnsLabels = input.required<string[] | undefined>();
  chosenOption = input<string>('');
  isDisabled = input<boolean>(false);
  value = signal<string>('');

  disabled =false;

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

  onChooseElement(label: string) {
    this.value.set(label);
    this.clicked.set(!this.clicked())
    this.onChange(this.value());
  }
  onSecondElement() {
    this.value.set(this.btnsLabels()?.[1] || '');
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
    this.disabled = isDisabled;
  }
}
