import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@com.language.exams/exaams/main-layout').then(m => m.MainLayoutModule)
  }
];
