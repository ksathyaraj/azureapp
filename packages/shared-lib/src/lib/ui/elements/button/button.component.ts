import { Optional, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ControlContainer, NgForm} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class ButtonComponent implements OnInit{
  @Input() smLabel = '';
  @Input() smValue = '';
  @Input() smClass = '';
  @Input() smType = 'button';
  @Input() smIcon = '';
  @Input() smTitle = '';
  @Input() smDisabled : boolean|null = false;
  @Input() smHidden = false;
  @Input() smTabindex = 0;
  @Output() smClick: EventEmitter<Event> = new EventEmitter(); 

  constructor(@Optional() public ngForm: NgForm, private translateService: TranslateService) {}

  ngOnInit() {
    this.getTranslation();
  }

  handleClickEvent(event: Event) {
    if(this.smType == 'submit')
      this.ngForm.form.markAllAsTouched();
    this.smClick.emit(event);
  }

  getTranslation() {
    if(this.smTitle){
      this.translateService.get(this.smTitle).subscribe((res: string) => {
        this.smTitle = res;
      })
    }
  }
}
