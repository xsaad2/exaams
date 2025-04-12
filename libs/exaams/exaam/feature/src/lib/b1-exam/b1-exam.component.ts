import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  B1AnswersForm,
  B1ExamWithTasks,
  Question,
} from '@com.language.exams/exaams-backend/utils';
import { B1ExamService } from '@com.language.exams/exaams/exaam/data-access';
import {
  AtomicButtonComponent,
  AtomicCheckboxChoiceComponent,
  AtomicInputComponent,
} from '@com.language.exams/shared/atomic-components';
import { B1Exam } from '@prisma/client';
import { AdPosterComponent } from '../ad-poster/ad-poster.component';
import { B1ExamTaskContentComponent } from '../b1-exam-task-content/b1-exam-task-content.component';
import { BinaryQuestionComponent } from '../binary-question/binary-question.component';
import { TaskExampleContainerComponent } from '../task-example-container/task-example-container.component';
import { YesNoComponent } from '../yes-no/yes-no.component';

export type HearingTask1Element = {
  first: Question;
  second: Question;
};

@Component({
  selector: 'lib-b1-exam',
  standalone: true,
  imports: [
    CommonModule,
    AtomicButtonComponent,
    ReactiveFormsModule,
    B1ExamTaskContentComponent,
    TaskExampleContainerComponent,
    AtomicInputComponent,
    YesNoComponent,
    BinaryQuestionComponent,
    AtomicCheckboxChoiceComponent,
    AdPosterComponent,
  ],
  templateUrl: './b1-exam.component.html',
})
export class B1ExamComponent {
  protected b1Exam = input<B1Exam | null>();
  protected exam = signal<B1ExamWithTasks | null>(null);
  protected answersForm!: FormGroup;
  protected chosenOptions = signal<string[]>([]);
  protected hearingTask1Elements = signal<HearingTask1Element[]>([]);

  private readonly fb = inject(FormBuilder);

  private readonly b1ExamService = inject(B1ExamService);

  constructor() {
    this.b1ExamService.getAllB1Exams().subscribe((exams) => {
      console.log(exams);
      this.exam.set(exams[0]);
    });

    this.answersForm = this.fb.group({
      readingTask1: this.fb.group({
        1: ['', Validators.required],
        2: ['', Validators.required],
        3: ['', Validators.required],
        4: ['', Validators.required],
        5: ['', Validators.required],
        6: ['', Validators.required],
      }),
      readingTask2a: this.fb.group({
        7: ['', Validators.required],
        8: ['', Validators.required],
        9: ['', Validators.required],
      }),
      readingTask2b: this.fb.group({
        10: ['', Validators.required],
        11: ['', Validators.required],
        12: ['', Validators.required],
      }),
      readingTask3: this.fb.group({
        13: ['', Validators.required],
        14: ['', Validators.required],
        15: ['', Validators.required],
        16: ['', Validators.required],
        17: ['', Validators.required],
        18: ['', Validators.required],
        19: ['', Validators.required],
      }),
      readingTask4: this.fb.group({
        20: ['', Validators.required],
        21: ['', Validators.required],
        22: ['', Validators.required],
        23: ['', Validators.required],
        24: ['', Validators.required],
        25: ['', Validators.required],
        26: ['', Validators.required],
      }),
      readingTask5: this.fb.group({
        27: ['', Validators.required],
        28: ['', Validators.required],
        29: ['', Validators.required],
        30: ['', Validators.required],
      }),
      hearingTask1: this.fb.group({
        1: ['', Validators.required],
        2: ['', Validators.required],
        3: ['', Validators.required],
        4: ['', Validators.required],
        5: ['', Validators.required],
        6: ['', Validators.required],
        7: ['', Validators.required],
        8: ['', Validators.required],
        9: ['', Validators.required],
        10: ['', Validators.required],
      }),
      hearingTask2: this.fb.group({
        11: ['', Validators.required],
        12: ['', Validators.required],
        13: ['', Validators.required],
        14: ['', Validators.required],
        15: ['', Validators.required],
      }),
      hearingTask3: this.fb.group({
        16: ['', Validators.required],
        17: ['', Validators.required],
        18: ['', Validators.required],
        19: ['', Validators.required],
        20: ['', Validators.required],
        21: ['', Validators.required],
        22: ['', Validators.required],
      }),
      hearingTask4: this.fb.group({
        23: ['', Validators.required],
        24: ['', Validators.required],
        25: ['', Validators.required],
        26: ['', Validators.required],
        27: ['', Validators.required],
        28: ['', Validators.required],
        29: ['', Validators.required],
        30: ['', Validators.required],
      }),
    });

    const readingTask3Control = this.answersForm.get('readingTask3');
    if (readingTask3Control) {
      readingTask3Control.valueChanges.subscribe((value) => {
        this.chosenOptions.set(
          Object.values(value).filter(
            (val) => val !== '' && val != '0' && val
          ) as string[]
        );
      });
    }

    effect(() => {
      const exam = this.exam();

      if (exam !== null) {
        const exampleQuestions = exam.hearingTask1.questions.filter((q) => {
          return q.questionNumber === 12 || q.questionNumber === 13;
        });
        this.hearingTask1Elements().push({
          first: exampleQuestions[0],
          second: exampleQuestions[1],
        });
        for (let i = 1; i < 11; i += 2) {
          this.hearingTask1Elements().push({
            first: exam.hearingTask1.questions.find(
              (q) => q.questionNumber === i
            ) as Question,
            second: exam.hearingTask1.questions.find(
              (q) => q.questionNumber === i + 1
            ) as Question,
          });
        }
      }
    });

    effect(() => {
      const exam = this.exam();
      const examplePoster = exam?.readingTask3.questions.find(
        (q) => q.questionNumber === 0
      )?.correctAnswer;
      this.chosenOptions().push(examplePoster || '');
    });
  }

  get readingTask4FormGroup() {
    return this.answersForm.get('readingTask4') as FormGroup;
  }

  @ViewChild('checkbox') checkbox!: ElementRef<HTMLInputElement>;
  onCheckboxChange(
    selectedOption: string,
    questionNumber: number,
    task: string
  ) {
    for (let i = 0; i < 3; i++) {
      const id = task + questionNumber + i;
      const checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox.value !== selectedOption) {
        checkbox.checked = false;
      }
    }
  }

  submitAnswers() {
    const attempt: B1AnswersForm = this.answersForm.value;
    console.log(attempt);
  }
}
