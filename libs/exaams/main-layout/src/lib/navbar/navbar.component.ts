import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomicButtonComponent, AtomicIconComponent } from '@com.language.exams/shared/atomic-components';
import { AuthenticationService, UserStore } from '@com.language.exams/exaams/auth/data-access';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [CommonModule, AtomicIconComponent, AtomicButtonComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  protected store = inject(UserStore)
  private authService = inject(AuthenticationService)
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

}
