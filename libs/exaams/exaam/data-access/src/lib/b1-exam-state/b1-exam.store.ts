import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { B1ExamService } from '../services/b1-exam.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {
  ExamCatalogItem,
  B1ExamWithTasks,
} from '@com.language.exams/exaams-backend/utils';
import { Router } from '@angular/router';

export interface B1ExamState {
  currentExam: B1ExamWithTasks | null;
  examsCatalog: ExamCatalogItem[];
  isLoading: boolean;
}

const initialState: B1ExamState = {
  currentExam: null,
  examsCatalog: [],
  isLoading: false,
};
1;
export const B1ExamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    getCurrentExamId: computed(() => store.currentExam()?.id),
    getCurrentExamName: computed(() => store.currentExam()?.name),
    getCurrentExam: computed(() => store.currentExam()),
    getIsLoading: computed(() => store.isLoading()),
    getExamsCatalog: computed(() => store.examsCatalog()),
  })),
  withMethods(
    (store, examService = inject(B1ExamService), router = inject(Router)) => ({
      loadExamsCatalog: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, { isLoading: true });
            return examService.getB1ExamsCatalog().pipe(
              tapResponse(
                (examsCatalog) => {
                  patchState(store, {
                    examsCatalog: examsCatalog,
                    isLoading: false,
                  });
                  console.log('ExamsCatalog loaded', examsCatalog);
                },
                () => {
                  patchState(store, { isLoading: false });
                }
              )
            );
          })
        )
      ),
      loadSelectedExam: rxMethod<string>(
        pipe(
          switchMap((examName) => {
            patchState(store, { isLoading: true, currentExam: null });
            return examService.getB1ExamByName(examName).pipe(
              tapResponse(
                (exam) => {
                  console.log('Exam loaded', exam);
                  patchState(store, { currentExam: exam, isLoading: false });
                },
                (error) => {
                  console.log('Error loading exam', error);
                  patchState(store, { isLoading: false });
                  router.navigate(['/exams/dashboard']);
                }
              )
            );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit({ loadExamsCatalog }) {
      loadExamsCatalog();
    },
    onDestroy() {
      console.log('in B1ExamStore Destroy');
    },
  })
);
