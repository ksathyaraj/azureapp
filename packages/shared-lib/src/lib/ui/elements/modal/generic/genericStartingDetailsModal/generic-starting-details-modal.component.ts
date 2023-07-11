import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";

@Component({
  selector: "lib-generic-starting-details-modal",
  templateUrl: "./generic-starting-details-modal.component.html",
})
export class GenericStartingDetailsModalComponent {
  @Input() public prefix: any;
  @Input() public startingNumber: any;
  @Input() public modalInstance: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  startNumberName = webConstants.startingNumber;
  prefixName = webConstants.prefix;
  phrase1 = webConstants.phrase1;
  phrase2 = webConstants.phrase2;
  startingDetail = webConstants.startingDetail;
  constructor(
    public activeModal: NgbActiveModal,
    private messagingService: MessagingService
  ) { }
  
  
  passBack(frm:any) {
    this.messagingService.broadcastCheckFormValidatity();
    this.passEntry.emit(this.modalInstance);
    if (!frm.invalid) { 
      this.activeModal.close({
      prefix: this.prefix,
      startingNumber: this.startingNumber
    });
    }
   
  }

}
