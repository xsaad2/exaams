import {Component, ElementRef, inject, input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {B1Exam} from '@prisma/client';
import {B1ExamService} from "@com.language.exams/exaams/exaam/data-access";
import {B1ExamWithTasks} from "@com.language.exams/exaams-backend/utils";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AtomicButtonComponent, AtomicInputComponent} from "@com.language.exams/shared/atomic-components";
import {B1ExamTaskContentComponent} from "../b1-exam-task-content/b1-exam-task-content.component";
import {TaskExampleContainerComponent} from "../task-example-container/task-example-container.component";

@Component({
  selector: 'lib-b1-exam',
  standalone: true,
  imports: [CommonModule, AtomicButtonComponent, ReactiveFormsModule, B1ExamTaskContentComponent, TaskExampleContainerComponent, AtomicInputComponent],
  templateUrl: './b1-exam.component.html',
})
export class B1ExamComponent {

  protected b1Exam = input<B1Exam | null>()
  protected exam!: B1ExamWithTasks;
  protected answersForm!: FormGroup;

  private readonly fb = inject(FormBuilder);

  private readonly b1ExamService = inject(B1ExamService)

  constructor() {
    this.b1ExamService.getAllB1Exams().subscribe((exams) => {
      console.log(exams)
      this.exam = exams[0];
    })

    this.answersForm = this.fb.group({
      readingTask1: this.fb.group({
        1: ['--Option auswählen--', Validators.required],
        2: ['--Option auswählen--', Validators.required],
        3: ['--Option auswählen--', Validators.required],
        4: ['--Option auswählen--', Validators.required],
        5: ['--Option auswählen--', Validators.required],
        6: ['--Option auswählen--', Validators.required],
      }),
      readingTask2a: this.fb.group({
        7: ['', Validators.required],
        8: ['', Validators.required],
        9: ['', Validators.required],
      })
    })

  }

  @ViewChild('checkbox') checkbox!: ElementRef<HTMLInputElement>;

  onCheckboxChange(selectedOption: string, questionNumber: number) {
    for (let i = 0; i < 3; i++) {
      const id = i + '' + questionNumber
      const checkbox = document.getElementById(id) as HTMLInputElement;
      console.log(checkbox.value)
      if (checkbox.value !== selectedOption) {
        checkbox.checked = false;
      }
    }
  }

  submitAnswers(){
    console.log(this.answersForm.value)
  }

}
