import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { ControlContainer, NgForm} from '@angular/forms';
@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class TextInputComponent implements OnInit{
  
  constructor(@Optional() public ngForm: NgForm) {}

  @Input() smLabel=''; 
  @Input() smLabelClass=''; 
  @Input() smElementClass=''; 
  @Input() smRequired=false;
  @Input() smType='';
  @Input() smPlaceholder='';
  @Input() smDisabled = false;
  @Input() smValue: any|string|undefined='';
  @Input() isSpinRequired=false;
  @Input() isMaxCheckError=false;

  // @Input() title = '';
  // @Input() smModel:string|undefined|number;
  @Input()
  // get smModel(): string|undefined|number {
  //   if (this.smType == 'decimal' && typeof(this.smValue) == 'string')
  //     return this.smValue.replace(/,/g,'');
  //   else
  //     return this.smValue
  // }
  set smModel(smModel: string|undefined|number) {

    if ((this.smType==="decimal") && (smModel != null && smModel != undefined)){
      if(!this.focused)
      {
        this.smValue=Number(smModel).toLocaleString('en-US',this.decimalOptions)
      }
    }
    else if (smModel && typeof(smModel)=='string')
      this.smValue=smModel
      else 
      this.smValue = smModel;
  }
  @Input() smName = '';
  @Input() smRows=0 ;
  @Input() smMaxlength = 999;
  @Input() smTabindex = 0;
  @Input() smMin = 0.00;
  @Input() smMax:any;

  @Input() smInputClass = 'form-control';
  @Input() addDefaultDecimal = false;
  @Input() smPullRight = true;
  @Output() smModelChange = new EventEmitter<any>();
  @Output() smBlur = new EventEmitter<any>();

  elementClass='';
  focused=false


  private decimalOptions = {
    minimumFractionDigits : 2,
    maximumFractionDigits : 2
  }

  ngOnInit(){
    if(this.addDefaultDecimal) {
      this.smValue = this.smValue !== undefined && typeof this.smValue === 'number' ?  Number(this.smValue)?.toFixed(2) : this.smValue;
    }
    if(this.smElementClass)
      this.elementClass=this.smElementClass
    else if(this.smLabel)
    {
      if(!this.smLabelClass.includes('col-md'))
      {
        this.smLabelClass += " col-md-3"
      }
      const colIdx = this.smLabelClass.indexOf("col-md-")
      this.elementClass='col-md-' + (12 - parseInt(this.smLabelClass.substring(colIdx+7,colIdx+9)));
    }

  }

  handleModelChange($event: string|undefined|number) {
    let result=$event
    if(this.smType=="decimal" && !$event && typeof($event)=='string'){
      result= undefined;
    }
    else if(this.smType=="decimal" && $event && typeof($event)=='string')
    {
      result=parseFloat($event.replace(/,/g,''))
    }
    else if (this.smType == "number" && this.smMax){
      this.isMaxCheckError  = result && result > this.smMax ? true : false  
    }
    this.smModelChange.emit(result);
  }

  handleFocus(){
    this.focused=true
  }

  handleBlur() {
    this.focused=false
    if (this.smType==="decimal" && (this.smValue != null && this.smValue != undefined)){
      const result = typeof this.smValue !== 'number' ? parseFloat(this.smValue.replace(/,/g,'')) : this.smValue;  
      this.smValue=Number(result).toLocaleString('en-US',this.decimalOptions)
    }
    this.smBlur.emit(this.smValue);
  }

  decimalOnly($event:any): boolean {  
    let result=true 
    if (this.smType==="decimal" && $event){ 
      const patt = /^([0-9,\.])$/;
      result = patt.test($event.key);
    }
      return result;
  }

}
