import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicButtonComponent, AtomicIconComponent } from '@com.language.exams/shared/atomic-components';
import { AuthenticationService, UserStore } from '@com.language.exams/exaams/auth/data-access';
import {Router} from "@angular/router";

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [CommonModule, AtomicIconComponent, AtomicButtonComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  name = 'Lingoroo'
  protected store = inject(UserStore)
  private authService = inject(AuthenticationService)
  private router = inject(Router)
  protected drawerIsOpen = true;

  openDrawer(){
    this.drawerIsOpen = !this.drawerIsOpen;
  }

  onLogin(){
    this.authService.login();
  }

  onLogout(){
    this.authService.logout();
  }

  onDash(){
    this.router.navigate(['/exams/b1']);
  }

}
