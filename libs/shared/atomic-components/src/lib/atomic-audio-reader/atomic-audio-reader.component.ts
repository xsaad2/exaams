import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atomic-audio-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atomic-audio-reader.component.html',
})
export class AtomicAudioReaderComponent {
  @ViewChild('audio', { static: true })
  audioElement!: ElementRef<HTMLAudioElement>;

  playLabel = input<string>('Play');

  audioLink = input.required<string>();

  playAudio() {
    this.audioElement.nativeElement.play();
    console.log('Audio is playing');
  }

  pauseAudio() {
    this.audioElement.nativeElement.pause();
    console.log('Audio is paused');
  }
}
