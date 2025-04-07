import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {SidenavComponent} from "../sidenav/sidenav.component";

@Component({
  selector: 'lib-exaams-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidenavComponent],
  templateUrl: './exaams-main-layout.component.html',
})
export class ExaamsMainLayoutComponent {}
