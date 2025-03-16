import {Component, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReadingTask} from "@com.language.exams/exaams-backend/utils";

@Component({
  selector: 'lib-b1-exam-task-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b1-exam-task-content.component.html',
})
export class B1ExamTaskContentComponent {

  public readingTask = input<ReadingTask>()

  get taskNumber() {
    return this.readingTask()?.taskNumber.charAt(0).toUpperCase() +""+ this.readingTask()?.taskNumber.slice(1);
  }

  get instructionsLine1() {
    return this.readingTask()?.instructions?.split('. ')[0]
      .replace(/\b([A-J])\b/gi, '<b>$1</b>')
      .replace(/\d+/g, '<b>$&</b>')+ '.'
  }

  get instructionsLine2() {

    const inst1 =  this.readingTask()?.instructions?.split('. ')[1]
        .replace(/\b([a-c])\b/gi, '<b>$1</b>')
        .replace(/\b(Falsch|Richtig)\b/g, '<b>$1</b>')
      + (this.instructionsLine3? '. ' + this.instructionsLine3 : '')

    const inst2 = inst1.split('. ')[0]
      .replace(/:(.*)/, ':<b>$1</b>');

    return this.readingTask()?.taskNumber === 'teil 4' ? inst2 :  inst1;

  }

  get instructionsLine3() {
    return this.readingTask()?.instructions?.split('. ')
      .slice(2)
      .join('. ')
      .replace(/\d+/g, '<b>$&</b>')
  }



}
