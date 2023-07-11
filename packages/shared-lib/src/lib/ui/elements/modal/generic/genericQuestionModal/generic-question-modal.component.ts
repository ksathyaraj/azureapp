import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { TranslateService } from "@ngx-translate/core";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";

@Component({
  selector: "lib-generic-question-modal",
  templateUrl: "./generic-question-modal.component.html",
})
export class GenericQuestionModalComponent implements OnInit{

   @Input() public modalInstance: any;
   
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private translateService : TranslateService
  ) { }
  closeData = webConstants.closeData;
  yesText:any ="";
  noText:any ="";

  ngOnInit(){
    this.getTranslation();
  }
  passBack() {
    this.passEntry.emit(this.modalInstance);
    this.activeModal.close(this.closeData);
  }
  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  getTranslation(){
    this.translateService.get('resources.common-button-yes').subscribe((res: string) => {
      this.yesText = res !== undefined && res !== '' && res !== 'resources.common-button-yes' ? res : portalConstants.yesText;
    });
  
    this.translateService.get('resources.common-button-no').subscribe((res: string) => {
      this.noText = res !== undefined && res !== '' && res !== 'resources.common-button-no' ? res : portalConstants.noText;
    });
  }
}
