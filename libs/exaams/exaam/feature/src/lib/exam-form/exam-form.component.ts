import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AtomicButtonComponent, AtomicInputComponent } from '@com.language.exams/shared/atomic-components';

@Component({
  selector: 'lib-exam-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AtomicButtonComponent, AtomicInputComponent],
  templateUrl: './exam-form.component.html'
})
export class ExamFormComponent {
  examForm: FormGroup;
  niveaux = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  constructor(private fb: FormBuilder) {
    this.examForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(255)],
      niveau: ['', Validators.required],
      creatorId: ['', Validators.required],
      premium: [false, Validators.required],
      readingTasks: this.fb.array([this.createReadingTask()]),
      hearingTasks: this.fb.array([])
    });
  }

  get readingTasks() {
    return this.examForm.get('readingTasks') as FormArray;
  }

  getQuestionControls(taskIndex: number) {
    return (this.readingTasks.at(taskIndex).get('questions') as FormArray);
  }

  getChoiceControls(taskIndex: number, questionIndex: number) {
    return (this.getQuestionControls(taskIndex).at(questionIndex).get('choices') as FormArray);
  }

  get hearingTasks() {
    return this.examForm.get('hearingTasks') as FormArray;
  }

  addReadingTask() {
    if (this.readingTasks.length <= 4) {
      this.readingTasks.push(this.createReadingTask());
    }
  }

  createReadingTask(): FormGroup {
    return this.fb.group({
      taskNumber: ['', Validators.required],
      timeAllocationInMinutes: [0, [Validators.required, Validators.min(1)]],
      instructions: ['', Validators.required],
      mainText: ['', Validators.required],
      taskType: ['', Validators.required],
      questions: this.fb.array([this.createQuestion()])
    });
  }

  createHearingTask(): FormGroup {
    return this.fb.group({
      taskNumber: ['', Validators.required],
      timeAllocationInMinutes: [0, [Validators.required, Validators.min(1)]],
      instructions: ['', Validators.required],
      taskType: ['', Validators.required],
      questions: this.fb.group({
        question1: this.createQuestion(),
        question2: this.createQuestion()
      })
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      questionNumber: ['', Validators.required],
      statement: ['', Validators.required],
      answer: ['', Validators.required],
      choices: this.fb.array([this.createChoice()])
    });
  }

  createChoice() {
    return this.fb.group({
      choice: ['', Validators.required]
    });
  }

  addChoice(taskIndex: number, questionIndex: number) {
    const choices = this.getChoiceControls(taskIndex, questionIndex);
    if (choices.length <= 6) {
      choices.push(this.createChoice());
    }
  }

  addQuestion(taskIndex: number) {
    const questions = this.readingTasks.at(taskIndex).get('questions') as FormArray;
    if (questions.length <= 6) {
      questions.push(this.createQuestion());
    }
  }

  onSubmit() {
    if (this.examForm.valid) {
      const formData = this.examForm.value;
      console.log('Exam Form Data:', formData);
      // Transform 'choices' string into an array if necessary
      // Send formData to your backend
    } else {
      console.error('Exam form is invalid');
    }
  }

  submitForm() {
    console.log(this.examForm.value);
  }

  protected readonly FormArray = FormArray;
}
