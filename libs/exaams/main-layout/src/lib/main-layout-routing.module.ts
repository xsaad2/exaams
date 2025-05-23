import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaamsMainLayoutComponent } from './exaams-main-layout/exaams-main-layout.component';
import { authenticationGuard } from '@com.language.exams/exaams/auth/data-access';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then((c) => c.LandingComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@com.language.exams/exaams/auth/feature').then(
        (c) => c.AuthModule
      ),
  },
  {
    path: '',
    component: ExaamsMainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@com.language.exams/exaams/exam/feature').then(
            (c) => c.ExamModule
          ),
        canActivate: [authenticationGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
