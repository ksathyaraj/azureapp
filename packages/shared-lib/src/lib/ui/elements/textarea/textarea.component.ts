import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { ControlContainer, NgForm} from '@angular/forms';
@Component({
  selector: 'lib-textarea-input',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class TextAreaComponent implements OnInit{
  
  constructor(@Optional() public ngForm: NgForm) {}

  @Input() smLabel=''; 
  @Input() smLabelClass=''; 
  @Input() smRequired=false;
  @Input() smType='';
  @Input() smPlaceholder='';
  @Input() smDisabled = false;
  // @Input() title = '';
  @Input() smModel = '';
  @Input() smName = '';
  @Input() smMaxlength=999;
  @Input() smRows=0 ;
  @Input() smTabindex = 0;
  @Input() smValues=[]
  // @Input() requiredPostInput = false;
  @Output() smModelChange = new EventEmitter<any>();
  for = '';
  modelValue = '';
  form: any = {};
  formDetails: any;

  elementClass='';

  ngOnInit(){
    if(this.smLabel)
    {
      if(!this.smLabelClass.includes('col-md'))
      {
        this.smLabelClass += " col-md-3"
      }
      const colIdx = this.smLabelClass.indexOf("col-md-")
      this.elementClass='col-md-' + (12 - parseInt(this.smLabelClass.substring(colIdx+7,colIdx+9)));
    }

  }

  handleModelChange($event: Event) {
    // this.smModelChange.emit(this.smModel);
    if(this.smType=='number' && this.smModel && typeof(this.smModel)=='string')
    this.smModelChange.emit(parseInt(this.smModel));
  else
    this.smModelChange.emit(this.smModel);
  }
}
