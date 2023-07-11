import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-add-company-history-modal",
  templateUrl: "./add-company-history-modal.component.html",
  styleUrls: ["./add-company-history-modal.component.scss"],
})
export class AddCompanyHistoryModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService
  ) {}

  comments='';
  params:any;
  // vm.companyId = params.companyId;
  // vm.sanitizedName = params.sanitizedName;
  // vm.isactive = params.isactive;
  
  cancel () {
      this.activeModal.close()
  }

  ok(frm:any) {
      // MessagingService.broadcastCheckFormValidatity();
      if (frm.valid) {
        const data = {
          comment: this.comments,
          companyId: this.params.company.id,
          status: this.params.company.isactive ? 1 : 2
        };
        console.log('data: ', data);
        this.dataService.post(webPortal.addcompanyhistoryrecord, data).subscribe(() =>{
              // this.dataService.invalidateRouteCache(newRegistrationsRoute);
              // this.dataService.invalidateRouteCache(resellerRegistrationsRoute);
              // this.dataService.invalidateRouteCache(campaignRegistrationsRoute);
              // this.dataService.invalidateRouteCache(freeRegistrationsRoute);
              // this.dataService.invalidateRouteCache(allCompaniesRoute);
              // this.dataService.invalidateRouteCache(subscriptionsEndingSoonRoute);
              // this.dataService.invalidateRouteCache(pendingPaymentSubscriptionsRoute);
              // this.dataService.invalidateRouteCache(usageReportRoute);
              this.activeModal.close();
              this.notificationBarService.success('Company History Added.');
          });
      }
  }

}
