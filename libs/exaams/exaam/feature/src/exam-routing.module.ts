import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'b1/:examId',
    loadComponent: () =>
      import('./lib/b1-exam/b1-exam.component').then((c) => c.B1ExamComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./lib/exaams-overview/exaams-overview.component').then(
        (c) => c.ExaamsOverviewComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
