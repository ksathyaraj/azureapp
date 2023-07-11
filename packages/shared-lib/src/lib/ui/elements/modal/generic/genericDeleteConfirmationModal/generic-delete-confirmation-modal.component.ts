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
  selector: "lib-generic-delete-confirmation-modal",
  templateUrl: "./generic-delete-confirmation-modal.component.html",
})
export class GenericDeleteConfirmationModalComponent {
  @Input() public confirmationMessage: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal
  ) {}
  closeData = webConstants.closeData;
  okClick = webConstants.okClick;
 
  passBack() {
    this.passEntry.emit(this.confirmationMessage);
    this.activeModal.close(this.okClick);
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }
}
