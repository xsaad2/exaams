import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  protected readonly router = inject(Router);
  onClick() {
    this.router.navigate(['/']);
  }
}
