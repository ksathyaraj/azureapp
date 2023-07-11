import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
@Component({
    selector: "lib-new-licensees-modal",
    templateUrl: "./new-licensees-modal.component.html"
})
export class NewLicenseesModalComponent {
    name: string | number | undefined;
    contactName: string | number | undefined;
    contactEmail: string | number | undefined;
    contactTelephone: string | number | undefined;
    constructor(private dataService: DataService, private messagingService: MessagingService, public activeModal: NgbActiveModal, private notificationBarService: NotificationBarService) { }


    formData = {
        name:undefined,
        contactName:undefined,
        contactEmail:undefined,
        contactTelephone:undefined,
    }
    closeModal() {
        this.activeModal.dismiss();
    }

    ok(frm: any) {
        this.messagingService.broadcastCheckFormValidatity();
        if (!frm.invalid) {
            
            this.dataService.post(webPortal.saveLicenses, this.formData).subscribe(() => {
                this.notificationBarService.success('New Licensee added successfully');
                this.activeModal.close();
            });
        }
    }


}
