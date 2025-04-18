import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamCatalogItem } from '@com.language.exams/exaams-backend/utils';
import {
  AtomicButtonComponent,
  AtomicIconComponent,
  AtomicProgressBarComponent,
} from '@com.language.exams/shared/atomic-components';
import { Router } from '@angular/router';
import { B1ExamStore } from '@com.language.exams/exaams/exaam/data-access';

@Component({
  selector: 'lib-exam-card',
  standalone: true,
  imports: [
    CommonModule,
    AtomicButtonComponent,
    AtomicIconComponent,
    AtomicProgressBarComponent,
  ],
  templateUrl: './exam-card.component.html',
})
export class ExamCardComponent {
  private readonly router = inject(Router);
  private readonly examStore = inject(B1ExamStore);
  exam = input<ExamCatalogItem>();

  onButtonCLick() {
    this.examStore.loadSelectedExam(this.exam()?.id || '');
    this.router.navigate([`/exams/b1/${this.exam()?.id}`]);
  }

  buttonLabel = computed(() => {
    if (this.exam()?.lastScore) {
      return 'Take again';
    }
    return 'New try';
  });
}
