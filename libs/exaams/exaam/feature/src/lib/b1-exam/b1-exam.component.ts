import {Component, ElementRef, inject, input, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {B1Exam} from '@prisma/client';
import {B1ExamService} from "@com.language.exams/exaams/exaam/data-access";
import {B1ExamWithTasks} from "@com.language.exams/exaams-backend/utils";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AtomicButtonComponent, AtomicInputComponent} from "@com.language.exams/shared/atomic-components";
import {B1ExamTaskContentComponent} from "../b1-exam-task-content/b1-exam-task-content.component";
import {TaskExampleContainerComponent} from "../task-example-container/task-example-container.component";
import {YesNoComponent} from "../yes-no/yes-no.component";

@Component({
  selector: 'lib-b1-exam',
  standalone: true,
  imports: [CommonModule, AtomicButtonComponent, ReactiveFormsModule, B1ExamTaskContentComponent, TaskExampleContainerComponent, AtomicInputComponent, YesNoComponent],
  templateUrl: './b1-exam.component.html',
})
export class B1ExamComponent {

  protected b1Exam = input<B1Exam | null>()
  protected exam!: B1ExamWithTasks;
  protected answersForm!: FormGroup;
  protected chosenOptions = signal<string[]>([])


  private readonly fb = inject(FormBuilder);

  private readonly b1ExamService = inject(B1ExamService)

  constructor() {
    this.b1ExamService.getAllB1Exams().subscribe((exams) => {
      console.log(exams)
      this.exam = exams[0];
    })

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
      })
    })

    const readingTask3Control = this.answersForm.get('readingTask3');
    if (readingTask3Control) {
      readingTask3Control.valueChanges.subscribe(value => {
        this.chosenOptions.set(Object.values(value).filter(val => (val !== '' && val != '0')) as string[]);
      });

    }
  }

  get readingTask4FormGroup(){
    return this.answersForm.get('readingTask4') as FormGroup;
  }

  @ViewChild('checkbox') checkbox!: ElementRef<HTMLInputElement>;

  onCheckboxChange(selectedOption: string, questionNumber: number) {
    for (let i = 0; i < 3; i++) {
      const id = i + '' + questionNumber
      const checkbox = document.getElementById(id) as HTMLInputElement;
      if (checkbox.value !== selectedOption) {
        checkbox.checked = false;
      }
    }
  }

  submitAnswers(){
    console.log(this.answersForm.value)
  }


}
