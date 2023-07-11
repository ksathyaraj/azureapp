import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { portalConstants } from "../../../constants/portal.constants";

@Component({
  selector: "lib-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"],
})
export class FileInputComponent implements OnInit{
  constructor(
    private translateService: TranslateService
   ){}

  @Input() accept = '';
  @Input() type = '';
  @Input() showProgressbar = false;
  @Input() progress = 0;
  @Input() uploaderFileName = '';
  @Input() smLabel = '';
  @Input() smLabelClass = '';
  @Input() fileInputRequired = true;
  @Output() handleFileSelected = new EventEmitter<any>; 
  browseText = '';

  ngOnInit() {
    this.getTranslation();
  }

  handleButtonClick($event: Event) {
    this.handleFileSelected.emit($event);
  }

  getTranslation() {
    this.translateService.get('resources.common-buttons-browse').subscribe((res: string) => {
      this.browseText = res !== undefined && res !== '' && res !== 'resources.common-buttons-browse' ? res : portalConstants.browseText;
    });
  }
}
