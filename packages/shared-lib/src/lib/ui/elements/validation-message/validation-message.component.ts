import { Optional, Component } from '@angular/core';
import { ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'lib-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class ValidationMessageComponent {
  constructor(@Optional() public ngForm: NgForm) {}
}
