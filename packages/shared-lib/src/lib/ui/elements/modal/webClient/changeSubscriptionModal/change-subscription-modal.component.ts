import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-change-subscription-modal",
  templateUrl: "./change-subscription-modal.component.html",
  styleUrls: ["./change-subscription-modal.component.scss"],
})
export class ChangeSubscriptionModalComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
    private dateService: DateService
  ) {}

  params:any
  reason:any;
  newExpiry:any

cancel() {
    this.activeModal.close()
}

ok(frm:any) {
    // MessagingService.broadcastCheckFormValidatity();
    if (frm.valid) {
          const data = {
            reason: this.reason,
            subscriptionId: this.params.subscriptionId,
            newExpiryDate: this.dateService.getFormattedDateForWebApi(this.newExpiry)
        };
        this.dataService.post(webPortal.subscriptionchangeexpiry, data).subscribe(() => {
              // this.dataService.invalidateRouteCache(newRegistrationsRoute);
              // this.dataService.invalidateRouteCache(resellerRegistrationsRoute);
              // this.dataService.invalidateRouteCache(campaignRegistrationsRoute);
              // this.dataService.invalidateRouteCache(freeRegistrationsRoute);
              // this.dataService.invalidateRouteCache(allCompaniesRoute);
              // this.dataService.invalidateRouteCache(subscriptionsEndingSoonRoute);
              // this.dataService.invalidateRouteCache(pendingPaymentSubscriptionsRoute);
              // this.dataService.invalidateRouteCache(usageReportRoute);
            this.activeModal.close()
            this.notificationBarService.success('Subscription Expiry Changed.');
        });
    }
}

}
