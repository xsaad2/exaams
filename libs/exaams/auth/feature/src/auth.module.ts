import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [RouterModule, AuthRoutingModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class AuthModule {}
