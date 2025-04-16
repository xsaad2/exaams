import {Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReadingTask, HearingTask} from "@com.language.exams/exaams-backend/utils";

@Component({
  selector: 'lib-b1-exam-task-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b1-exam-task-content.component.html',
})
export class B1ExamTaskContentComponent {

  public readingTask = input<ReadingTask>()
  public hearingTask = input<HearingTask>()

  get taskNumber() {
    if (this.readingTask()) {
      return this.readingTask()?.taskNumber.charAt(0).toUpperCase() + "" + this.readingTask()?.taskNumber.slice(1);
    }
    if (this.hearingTask()) {
      return this.hearingTask()?.taskNumber.charAt(0).toUpperCase() + "" + this.hearingTask()?.taskNumber.slice(1);
    }
    return 'Task type not known';
  }

  instructionsLine1(lines: string) {
    return lines.split('. ')[0]
      .replace(/\b([A-J])\b/gi, '<b>$1</b>')
      .replace(/\d+/g, '<b>$&</b>') + '.'
  }

  instructionsLine2(lines: string) {
    const inst1 = lines.split('. ')[1]
        .replace(/\b([a-c])\b/gi, '<b>$1</b>')
        .replace(/\b(Falsch|Richtig)\b/g, '<b>$1</b>')
      + (this.instructionsLine3(lines) ? '. ' + this.instructionsLine3(lines) : '')

    const inst2 = inst1.split('. ')[0]
      .replace(/:(.*)/, ':<b>$1</b>');

    return this.readingTask()?.taskNumber === 'teil 4' ? inst2 : inst1;
  }

  instructionsLine3(lines: string) {
    return lines.split('. ')
      .slice(2)
      .join('. ')
      .replace(/\d+/g, '<b>$&</b>')
  }

  hearingInstructions(lines: string) {
    return lines.replace(/\b([a-c])\b/gi, '<b>$1</b>')
      .replace(/\b(einmal|zweimal)\b/g, '<b>$1</b>')
      .replace(/\b(Falsch|Richtig)\b/g, '<b>$1</b>')
      .replace(/\d+/g, '<b>$&</b>')
  }
}
