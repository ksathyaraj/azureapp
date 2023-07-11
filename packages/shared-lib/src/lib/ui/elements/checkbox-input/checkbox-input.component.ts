import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "lib-checkbox-input",
  templateUrl: "./checkbox-input.component.html",
  styleUrls: ["./checkbox-input.component.scss"],
})
export class CheckboxInputComponent implements OnInit{
  @Input() smModel = false;
  @Input() smDisabled = false;
  @Input() smTabindex = 0;
  @Input() smHidden = false;
  @Input() smLabelClass = '';
  @Input() smRequired = '';
  @Input() smLabel = '';
  @Input() smShowPostInput = false;
  @Output() smModelChange = new EventEmitter<boolean>();
  @Input() smInputClass = 'checkbox';


  elementClass='';

  ngOnInit(){
    if(!this.smLabelClass.includes('col-md'))
    {
      this.smLabelClass += " col-md-3"
    }
    const colIdx = this.smLabelClass.indexOf("col-md-")
    this.elementClass='col-md-' + (12 - parseInt(this.smLabelClass.substring(colIdx+7,colIdx+9)));
  }

  smChangeHandler() {
    this.smModelChange.emit(this.smModel);
  }
}
