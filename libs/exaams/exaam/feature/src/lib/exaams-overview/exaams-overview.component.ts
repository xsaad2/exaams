import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B1ExamStore } from '@com.language.exams/exaams/exaam/data-access';
import { ExamCardComponent } from '@com.language.exams/exaams/exaam/ui';

@Component({
  selector: 'lib-exaams-overview',
  standalone: true,
  imports: [CommonModule, ExamCardComponent],
  templateUrl: './exaams-overview.component.html',
})
export class ExaamsOverviewComponent {
  protected readonly examStore = inject(B1ExamStore);

  protected readonly examsCatalog = this.examStore.examsCatalog;
}
