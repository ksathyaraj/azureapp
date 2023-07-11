import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-static-text',
  templateUrl: './static-text.component.html',
  styleUrls: ['./static-text.component.scss']
})
export class StaticTextComponent {
  @Input() smLabel = '';
  @Input() smLabelClass=''; 
  @Input() smStrong = false;
  @Input() smModel :any = false;
  @Input() smElementClass = '';
  @Input() smType = '';

  elementClass='';

  ngOnInit(){

    if(!this.smLabelClass.includes('col-md'))
    {
      this.smLabelClass += "col-md-3"
    }
    const colIdx = this.smLabelClass.indexOf("col-md-")
    this.elementClass='col-md-' + (12 - parseInt(this.smLabelClass.substring(colIdx+7,colIdx+9)));

  }
}
