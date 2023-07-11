import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { buttonParameters, ButtonType } from "../../../interfaces/webclient.interface";
import { webConstants } from "../../../constants/web.constants";
import { portalConstants } from "../../../constants/portal.constants";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "lib-button-bar",
  templateUrl: "./button-bar.component.html",
  styleUrls: ["./button-bar.component.scss"],
})
export class ButtonBarComponent implements OnInit{
  constructor(private translateService: TranslateService){}

  @Input() exportButton = false;
  @Input() requestGLButton = false;
  @Input() pdfButton = false;
  @Input() helpLinkURL = '';
  @Input() refreshButton = true;
  @Input() addNewButton = true;
  @Input() downloadButton = false;
  @Input() requestReportButton = false;
  @Input() emailButton = false;
  @Input() detailReportButton = false;
  @Input() usageReportButton = false;
  @Output() handleButtonClick = new EventEmitter<buttonParameters>; 
  buttonTypes = ButtonType;
  exportText = webConstants.exportText;
  emailText = portalConstants.emailText;
  requestGLText = '';
  downloadText = portalConstants.downloadText;
  detailedReportText = portalConstants.detailedReportText;
  usageReportText = portalConstants.usageReportText;
  refreshMessage = '';
  addNewText = '';

  ngOnInit(){
    this.getTranslation();
    this.requestGLText = this.requestGLButton ? webConstants.requestGL : portalConstants.requestReportText;
  }

  handleClickEvent(event: any, id: number) {
    this.handleButtonClick.emit({event, id});
  }

  getTranslation() {
    this.translateService.get('resources.common-buttons-refresh').subscribe((res: string) => {
      this.refreshMessage = res !== '' && res !== undefined && res !== 'resources.common-buttons-refresh' ? res : portalConstants.refreshText;
    });
    this.translateService.get('resources.common-buttons-addnew').subscribe((res: string) => {
      this.addNewText = res !== '' && res !== undefined && res !== 'resources.common-buttons-addnew' ? res : portalConstants.addNewText;
    })
  }
}
