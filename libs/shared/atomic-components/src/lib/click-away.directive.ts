import {
  Output,
  EventEmitter,
  Directive,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[atomicAwayClick]',
})
export class HostListenerDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output()
  public atomicAwayClick = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.atomicAwayClick.emit(event);
    }
  }
}
