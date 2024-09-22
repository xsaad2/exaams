import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./lib/exaams-exam/exaams-exam.component').then((c) => c.ExaamsExamComponent)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./lib/exam-form/exam-form.component').then((c) => c.ExamFormComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {
}
