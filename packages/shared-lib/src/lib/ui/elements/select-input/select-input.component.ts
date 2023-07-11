import { Component, EventEmitter, Input, OnInit, Optional, Output } from "@angular/core";
import { ControlContainer, NgForm} from '@angular/forms';
@Component({
  selector: "lib-select-input",
  templateUrl: "./select-input.component.html",
  styleUrls: ["./select-input.component.scss"],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class SelectInputComponent implements OnInit{

  @Input() smOptions:any[]=[]; 
  @Input() smOptionDisplayField=''; 
  @Input() smOptionValueField=''; 
  @Input() smSelectWithSearchOption=false;
  @Input() smMultiSelectOption=false;
  @Input() smLabel=''; 
  @Input() smInputClass = 'form-select';
  @Input() smLabelClass=''; 
  @Input() smRequired=false;
  @Input() smPlaceholder='';
  @Input() smDisabled = false;
  // @Input() title = '';
  @Input() smModel:any = '';
  @Input() smName = '';
  @Input() smTabindex = 0;
  @Input() smImageDisplayField: string|undefined = '';
  // @Input() requiredPostInput = false;
  @Output() smModelChange = new EventEmitter<string>();

  elementClass='';

  constructor(@Optional() public ngForm: NgForm) {}

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
  handleModelChange(e: any) {
    if(this.smSelectWithSearchOption){
      this.smModel = e.target.value;
    } 
    this.smModelChange.emit(this.smModel);
  }
  

}
