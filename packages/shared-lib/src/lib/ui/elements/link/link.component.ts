import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  @Input() linkName = '';
  @Input() translate = '';
  @Input() url = '';
  @Input() target = '';
  @Input() linkClass = '';
  @Output() smHandleLink = new EventEmitter<Event>; 

  handleLink(event: Event) {
    this.smHandleLink.emit(event);
  }
}
