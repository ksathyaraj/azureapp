import { Component, Input, Output, EventEmitter, } from "@angular/core";
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "lib-open-staff-package-details-custom-item-modal",
  templateUrl: "./open-staff-package-details-custom-item-modal.component.html",
  styleUrls: ["./open-staff-package-details-custom-item-modal.component.scss"],
})
export class OpenStaffPackageDetailsCustomItemModalComponent {
  @Input() public item: any = {};
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  // frm: any = {};

  constructor(
    private messagingService: MessagingService,
    public activeModal: NgbActiveModal,

  ) { this.item = this.item ? JSON.parse(JSON.stringify(this.item)) : {}; }

  passBack(frm:any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) {
      if (!this.item.clientId)
        this.item.clientId = new Date().getTime();//essentially a unique id
        
      this.item.isCustomItem = true;
      this.item.isGeneratedItem = false;

      this.passEntry.emit(this.item)
      this.activeModal.close(this.item);
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}
