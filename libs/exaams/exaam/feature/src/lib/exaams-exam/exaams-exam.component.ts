import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownPipe } from '@com.language.exams/shared/utils';

@Component({
  selector: 'lib-exaams-exam',
  standalone: true,
  imports: [CommonModule, MarkdownPipe],
  templateUrl: './exaams-exam.component.html',
})
export class ExaamsExamComponent {
  protected text = '<u class="bg-red-500">Hello World</u>';
  s = input<string>('saad')
}
