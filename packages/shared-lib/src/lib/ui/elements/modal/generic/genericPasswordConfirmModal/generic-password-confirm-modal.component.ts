import {
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
  selector: "lib-generic-password-confirm-modal",
  templateUrl: "./generic-password-confirm-modal.component.html",
})
export class GenericPasswordConfirmModalComponent {

   @Input() public password='';
   @Input() public modalInstance: any;
   
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal
  ) { }
  closeData = webConstants.closeData;
   
  passBack(frm:any) {
    this.passEntry.emit(frm);
    this.activeModal.close(this.password);
  }

   closeModal() {
    this.activeModal.dismiss(this.closeData);
  }
}
