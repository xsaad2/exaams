import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AtomicDropdownComponent,
  AtomicIconComponent,
  AtomicTimerComponent,
  DropdownItem,
} from '@com.language.exams/shared/atomic-components';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@com.language.exams/exaams/auth/data-access';
import { LogoComponent } from '../logo/logo.component';

export type SideNavTrack = {
  label: string;
  link: string;
  iconName: string;
};

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    AtomicIconComponent,
    AtomicDropdownComponent,
    LogoComponent,
    AtomicTimerComponent,
  ],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthenticationService);
  protected readonly route = inject(ActivatedRoute);

  protected sideNavElements: SideNavTrack[] = [
    { label: 'Dashboard', link: '/', iconName: 'dashboard' },
    { label: 'Practice', link: '/dashboard', iconName: 'menu_book' },
    { label: 'Stats', link: '/', iconName: 'monitoring' },
  ];

  protected dropDownItems: DropdownItem[] = [
    {
      label: 'Profile',
      iconName: 'person',
      click: () => this.router.navigate(['profile']),
    },
    {
      label: 'Sign Out',
      iconName: 'logout',
      click: () => this.onLogout(),
    },
  ];
  isOpen = signal(false);
  selectedElement = this.sideNavElements[0];

  constructor() {
    this.route.url.subscribe((url) => {
      const currentUrl = url[0]?.path;
      const selectedElement = this.sideNavElements.find(
        (element) => element.link === `/${currentUrl}`
      );
      if (selectedElement) {
        this.selectedElement = selectedElement;
      }
    });
  }

  toggleSideNav() {
    this.isOpen.set(!this.isOpen());
  }

  openSideNav() {
    this.isOpen.set(true);
  }
  closeSideNav() {
    this.isOpen.set(false);
  }

  onLogout() {
    this.authService.logout();
  }

  onSelectSidenavElement(sideNavElement: SideNavTrack) {
    this.router
      .navigate([sideNavElement.link])
      .then(() => (this.selectedElement = sideNavElement));
  }
}
