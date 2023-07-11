import {
  Component,
  Input,
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
  selector: "lib-generic-message-modal",
  templateUrl: "./generic-message-modal.component.html",
})
export class GenericMessageModalComponent {

  @Input() public modalInstance: any;
   
  constructor(
    public activeModal: NgbActiveModal,
    private translateService: TranslateService
  ) { }

  closeData = webConstants.closeData;
  okClick = webConstants.okClick;
  okText = portalConstants.okText;
 
  passBack() {
    this.activeModal.close(this.okClick);
  }
  
   closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  getTranslation() {
    this.translateService.get('resources.modal-buttons-ok').subscribe((res: string) => {
      this.okText = res !== undefined && res !== '' && res !== 'resources.modal-buttons-ok' ? res : portalConstants.okText;
    });
  }
}
