import { Component, EventEmitter, Input, Optional, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as moment from "moment/moment"
@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class DatePickerComponent {
  
  constructor(@Optional() public ngForm: NgForm) {

  }

  @Input() smLabel=''; 
  @Input() smLabelClass=''; 
  @Input() smRequired=false;
  @Input() smType='';
  @Input() smPlaceholder='';
  @Input() smDisabled = false;
  // @Input() title = '';
  @Input() dateModel:Date | undefined;
  @Input() smShowWeeks = true;

  @Input()
  set smModel(smModel: string) {

    if(smModel == null || smModel==undefined)
      this.dateModel=undefined
    else if (smModel.match(new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}","gi")))
      this.dateModel=moment(smModel,'DD/MM/yyyy').toDate()
    else
      this.dateModel=moment(smModel).toDate()
  }

  @Input() smName = '';
  @Input() smMaxlength = 0;
  @Input() smTabindex = 0;
  @Output() smModelChange = new EventEmitter<string | null>();

  elementClass='';

  ngOnInit(){

    if(!this.smLabelClass.includes('col-md'))
    {
      this.smLabelClass += " col-md-3"
    }
    const colIdx = this.smLabelClass.indexOf("col-md-")
    this.elementClass='col-md-' + (12 - parseInt(this.smLabelClass.substring(colIdx+7,colIdx+9)));

  }

  handleModelChange(value: Date) {
    if(this.dateModel)
      this.smModelChange.emit(moment(this.dateModel).format("DD/MM/yyyy"));
    else
      this.smModelChange.emit(null)
  }

}
