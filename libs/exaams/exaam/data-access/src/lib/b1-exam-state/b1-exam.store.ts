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
  B1AnswersForm,
} from '@com.language.exams/exaams-backend/utils';
import { Router } from '@angular/router';
import { B1AttemptService } from '../services/b1-attempts.service';

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

export const B1ExamStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    getCurrentExamId: computed(() => store.currentExam()?.id),
    getCurrentExamName: computed(() => store.currentExam()?.name),
    getCurrentExam: computed(() => store.currentExam()),
    getIsLoading: computed(() => store.isLoading()),
    getExamsCatalog: computed(() => store.examsCatalog()),
    getExamCatalogItemForSelectedExam: computed(() => {
      return store
        .examsCatalog()
        .find((exam) => exam.id === store.currentExam()?.id);
    }),
  })),
  withMethods(
    (
      store,
      examService = inject(B1ExamService),
      attemptService = inject(B1AttemptService),
      router = inject(Router)
    ) => ({
      loadExamsCatalog: rxMethod<void>(
        pipe(
          switchMap(() => {
            return loadExamCatalog(store, examService);
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
                }
              )
            );
          })
        )
      ),
      submitB1Exam: rxMethod<B1AnswersForm>(
        pipe(
          switchMap((answersForm) => {
            patchState(store, { isLoading: true });
            return attemptService.createB1ExamAttempt(answersForm).pipe(
              tapResponse(
                (response) => {
                  console.log('Exam submitted', response);
                  router.navigate(['/dashboard']);
                  patchState(store, { isLoading: false });
                },
                (error) => {
                  console.log('Error submitting exam', error);
                  patchState(store, { isLoading: false });
                }
              )
            );
          }),
          switchMap(() => {
            return loadExamCatalog(store, examService);
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      store.loadExamsCatalog();
    },
    onDestroy() {
      console.log('in B1ExamStore Destroy');
    },
  })
);

function loadExamCatalog(store: any, examService: B1ExamService) {
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
}
