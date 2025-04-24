import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Question } from '@com.language.exams/exaams-backend/utils';
import { ALPHABETS } from '@com.language.exams/shared/utils';

export type BinaryQuestion = {
  question: Question;
  correctAnswer: string;
};

@Component({
  selector: 'lib-binary-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binary-question.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BinaryQuestionComponent,
    },
  ],
})
export class BinaryQuestionComponent implements ControlValueAccessor {
  useAlphabetLabels = input(false);
  chosenOption = input<string>('');
  choices = input.required<string[]>();
  name = input.required<string>();
  isChecked = input<boolean>(false);
  disabled = input<boolean>(false);

  checked = this.isChecked();

  isDisabled = computed(() => {
    return this.disabled();
  });

  value = '';

  onChange = (value: string) => {
    this.value = value;
  };

  onTouched: () => void = () => {};
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInputChange(value: string): void {
    this.onChange(value);
    this.onTouched();
  }

  protected readonly ALPHABETS = ALPHABETS;
}
