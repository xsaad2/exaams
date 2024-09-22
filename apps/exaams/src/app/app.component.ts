import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExaamsMainLayoutComponent } from '@com.language.exams/exaams/main-layout';

@Component({
  standalone: true,
  imports: [RouterModule, ExaamsMainLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exaams';
}
