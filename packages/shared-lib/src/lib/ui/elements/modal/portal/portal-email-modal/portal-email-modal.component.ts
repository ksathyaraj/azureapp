import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";

@Component({
  selector: "lib-portal-email-modal",
  templateUrl: "./portal-email-modal.component.html",
  styleUrls: ["./portal-email-modal.component.scss"],
})
export class PortalEmailModalComponent {
  @Input() public params= {title:""};
  isEmailValid = true;
  constructor(
    private activeModal: NgbActiveModal,
    private messagingService: MessagingService
  ){}
  title:any
  toEmail:any
  cancel() {
      this.activeModal.dismiss();
  }

  ok(frm:any) {
      this.messagingService.broadcastCheckFormValidatity();
      const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const emailId = frm.form.controls.toEmail.value;
      const emailIdArray = emailId.includes(';') ? emailId.split(';') : [emailId];
      let emailTempFlag = false;
      for(let i=0; i < emailIdArray.length; i++) {
        if(!expression.test(emailIdArray[i])){
          emailTempFlag = true;
        }
      }
      this.isEmailValid = !emailTempFlag;
      if (!emailTempFlag) {
          this.activeModal.close(this);
      }
  }

}
