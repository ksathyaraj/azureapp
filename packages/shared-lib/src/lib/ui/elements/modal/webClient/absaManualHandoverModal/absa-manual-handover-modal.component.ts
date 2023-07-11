import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-absa-manual-handover-modal",
  templateUrl: "./absa-manual-handover-modal.component.html",
  styleUrls: ["./absa-manual-handover-modal.component.scss"],
})
export class AbsaManualHandoverModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
    private dateService: DateService
  ) {}

  cancel() {
      this.activeModal.dismiss();
  }

  params:any
  handoverDate:any
  reason=''

  ok(frm:any) {
    // MessagingService.broadcastCheckFormValidatity();
    // const handoverDateString = vm.handoverDate.getFullYear() + '-' + (vm.handoverDate.getMonth() + 1) + '-' + vm.handoverDate.getDate();
    // console.log('handover date', handoverDateString);
    console.log(this.handoverDate)
    if (frm.valid) {
        const data = {
          companyIdToHandover: this.params.company.id,
          handoverDate: this.dateService.getFormattedDateForWebApi(this.handoverDate),
          reason: this.reason
        };
        this.dataService.post(webPortal.absahandover, data).subscribe(() => {
            // this.dataService.invalidateRouteCache(newRegistrationsRoute);
            // this.dataService.invalidateRouteCache(resellerRegistrationsRoute);
            // this.dataService.invalidateRouteCache(campaignRegistrationsRoute);
            // this.dataService.invalidateRouteCache(freeRegistrationsRoute);
            // this.dataService.invalidateRouteCache(allCompaniesRoute);
            // this.dataService.invalidateRouteCache(subscriptionsEndingSoonRoute);
            // this.dataService.invalidateRouteCache(pendingPaymentSubscriptionsRoute);
            // this.dataService.invalidateRouteCache(usageReportRoute);
            this.activeModal.dismiss();
            this.notificationBarService.success('Manual Absa Handover Complete.');
        });
    }
}

}
