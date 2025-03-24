import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'b1',
    loadComponent: () =>
      import('./lib/b1-exam/b1-exam.component').then((c) => c.B1ExamComponent)
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
