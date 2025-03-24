import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AtomicButtonComponent, AtomicIconComponent} from "@com.language.exams/shared/atomic-components";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'lib-landing',
  standalone: true,
  imports: [CommonModule, AtomicButtonComponent, NavbarComponent, AtomicIconComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  name = 'Lingoroo'
}
