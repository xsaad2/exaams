import {Component,  input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poster } from '@com.language.exams/exaams-backend/utils';

@Component({
  selector: 'lib-ad-poster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-poster.component.html',
})
export class AdPosterComponent implements OnInit {
  poster = input<Poster>();
  chosenOptions = input<string[]>([]);

  randomPositionNumber = 1
  randomColorNumber = 1;
  colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'gray', 'indigo'];


  ngOnInit(): void {
    this.randomPositionNumber = Math.floor(Math.random() * 3) + 1;
    this.randomColorNumber = Math.floor(Math.random() * 10) + 1;
  }

  get isChosen() {
    return this.chosenOptions().includes(this.poster()?.letter || '')
  }

}
