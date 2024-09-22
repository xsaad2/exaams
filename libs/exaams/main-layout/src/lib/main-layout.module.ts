import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { AuthGuardModule } from '@angular/fire/auth-guard';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    RouterModule,
    MainLayoutRoutingModule,
    AuthGuardModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class MainLayoutModule {}
