import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.scss']
})
export class FormPanelComponent {
  @Input()
  smLabel="";

  @Input()
  smHeading="";

  @Input() smHeadingColor = '';

  @Input() smHeadingFont = '20px';
}
