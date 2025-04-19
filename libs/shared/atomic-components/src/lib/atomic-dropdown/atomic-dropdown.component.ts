import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  model,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AtomicIconComponent } from '../atomic-icon/atomic-icon.component';
import { HostListenerDirective } from '../click-away.directive';
import { AuthenticationService } from '@com.language.exams/exaams/auth/data-access';
import { take } from 'rxjs/operators';

export type DropdownItem = {
  label: string;
  click: () => void;
  iconName: string;
};

@Component({
  selector: 'atomic-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    AtomicIconComponent,
    HostListenerDirective,
    NgOptimizedImage,
  ],
  templateUrl: './atomic-dropdown.component.html',
})
export class AtomicDropdownComponent {
  authService = inject(AuthenticationService);
  isOpen = model(false);
  dropDownItems = input<DropdownItem[]>([]);

  noImageAvatar = 'empty-avatar.webp';
  profileImageUrll = this.authService.getProfilePicture();

  open() {
    this.isOpen.update(() => true);
  }

  close() {
    this.isOpen.update(() => false);
  }
  onSelect(item: DropdownItem) {
    item.click();
  }
}
