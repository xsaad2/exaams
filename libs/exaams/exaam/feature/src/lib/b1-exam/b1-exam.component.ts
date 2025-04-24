import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  B1AnswersForm,
  Question,
} from '@com.language.exams/exaams-backend/utils';
import { B1ExamStore } from '@com.language.exams/exaams/exaam/data-access';
import {
  AtomicButtonComponent,
  AtomicCheckboxChoiceComponent,
  AtomicIconComponent,
  AtomicInputComponent,
  AtomicRadioInputComponent,
} from '@com.language.exams/shared/atomic-components';
import {
  TaskExampleContainerComponent,
  AdPosterComponent,
  BinaryQuestionComponent,
  B1ExamTaskContentComponent,
} from '@com.language.exams/exaams/exaam/ui';
import { ActivatedRoute } from '@angular/router';

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
    BinaryQuestionComponent,
    AdPosterComponent,
    AtomicIconComponent,
    AtomicRadioInputComponent,
  ],
  templateUrl: './b1-exam.component.html',
})
export class B1ExamComponent {
  private readonly route = inject(ActivatedRoute);
  private b1ExamStore = inject(B1ExamStore);

  isLoading = computed(() => this.b1ExamStore.isLoading());
  protected exam = computed(() => {
    return this.b1ExamStore.getCurrentExam();
  });

  protected answersForm!: FormGroup;
  protected chosenOptions = signal<string[]>([]);
  protected hearingTask1Elements = signal<HearingTask1Element[]>([]);

  private readonly fb = inject(FormBuilder);

  constructor() {
    const examIdFromRoute = this.route.snapshot.paramMap.get('examId');
    if (examIdFromRoute) {
      this.b1ExamStore.loadSelectedExam(examIdFromRoute);
    }
    this.answersForm = this.fb.group({
      readingTask1: this.fb.group({
        r1: ['', Validators.required],
        r2: ['', Validators.required],
        r3: ['', Validators.required],
        r4: ['', Validators.required],
        r5: ['', Validators.required],
        r6: ['', Validators.required],
      }),
      readingTask2a: this.fb.group({
        r7: ['', Validators.required],
        r8: ['', Validators.required],
        r9: ['', Validators.required],
      }),
      readingTask2b: this.fb.group({
        r10: ['', Validators.required],
        r11: ['', Validators.required],
        r12: ['', Validators.required],
      }),
      readingTask3: this.fb.group({
        r13: ['', Validators.required],
        r14: ['', Validators.required],
        r15: ['', Validators.required],
        r16: ['', Validators.required],
        r18: ['', Validators.required],
        r19: ['', Validators.required],
        r17: ['', Validators.required],
      }),
      readingTask4: this.fb.group({
        r20: ['', Validators.required],
        r21: ['', Validators.required],
        r22: ['', Validators.required],
        r23: ['', Validators.required],
        r24: ['', Validators.required],
        r25: ['', Validators.required],
        r26: ['', Validators.required],
      }),
      readingTask5: this.fb.group({
        r27: ['', Validators.required],
        r28: ['', Validators.required],
        r29: ['', Validators.required],
        r30: ['', Validators.required],
      }),
      hearingTask1: this.fb.group({
        h1: ['', Validators.required],
        h2: ['', Validators.required],
        h3: ['', Validators.required],
        h4: ['', Validators.required],
        h5: ['', Validators.required],
        h6: ['', Validators.required],
        h7: ['', Validators.required],
        h8: ['', Validators.required],
        h9: ['', Validators.required],
        h10: ['', Validators.required],
      }),
      hearingTask2: this.fb.group({
        h11: ['', Validators.required],
        h12: ['', Validators.required],
        h13: ['', Validators.required],
        h14: ['', Validators.required],
        h15: ['', Validators.required],
      }),
      hearingTask3: this.fb.group({
        h16: ['', Validators.required],
        h17: ['', Validators.required],
        h18: ['', Validators.required],
        h19: ['', Validators.required],
        h20: ['', Validators.required],
        h21: ['', Validators.required],
        h22: ['', Validators.required],
      }),
      hearingTask4: this.fb.group({
        h23: ['', Validators.required],
        h24: ['', Validators.required],
        h25: ['', Validators.required],
        h26: ['', Validators.required],
        h27: ['', Validators.required],
        h28: ['', Validators.required],
        h29: ['', Validators.required],
        h30: ['', Validators.required],
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

    effect(
      () => {
        const attemptIsOpen =
          this.b1ExamStore.getExamCatalogItemForSelectedExam()?.openAttempt;
        const examCatalogItem =
          this.b1ExamStore.getExamCatalogItemForSelectedExam();
        const openAttemptForm = examCatalogItem?.lastAttemptAnswersForm;

        if (openAttemptForm && attemptIsOpen) {
          const { examId, ...answerForm } = openAttemptForm;
          this.answersForm.patchValue(answerForm);
        }
      },
      { allowSignalWrites: true }
    );
  }

  submitAnswers() {
    const answersForm: B1AnswersForm = {
      examId: this.exam()?.id || '',
      ...this.answersForm.value,
    };
    console.log('answersForm', answersForm);
    this.b1ExamStore.submitB1Exam(answersForm);
  }
}
