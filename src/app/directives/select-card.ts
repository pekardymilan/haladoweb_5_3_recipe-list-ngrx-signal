import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appSelectCard]',
})
export class SelectCard {
  selectAction = output();

  @HostListener('dblclick')
  onDoubleClick() {
    this.selectAction.emit();
  }
}
