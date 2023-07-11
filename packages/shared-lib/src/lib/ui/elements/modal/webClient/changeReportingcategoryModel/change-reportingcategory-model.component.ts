import { Component } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";

@Component({
  selector: "lib-change-reportingcategory-model",
  templateUrl: "./change-reportingcategory-model.component.html",
  styleUrls: ["./change-reportingcategory-model.component.scss"],
})
export class ChangeReportingcategoryModelComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private notificationBarService: NotificationBarService
  ) {}

  params:any
  subscriptionReportingCategories:any
  selectedSubscriptionReportingCategory:any = ''

  cancel() {
      this.activeModal.close()
  }

  ok(frm:any) {
      // MessagingService.broadcastCheckFormValidatity();
      if (frm.valid) {

        const data = {
              subscriptionId: this.params.subscriptionId,
              subscriptionReportingCategoryId: this.selectedSubscriptionReportingCategory
          };
          this.dataService.post(webPortal.changereportingcategory, data).subscribe(() => {
              // this.dataService.invalidateRouteCache(newRegistrationsRoute);
              // this.dataService.invalidateRouteCache(resellerRegistrationsRoute);
              // this.dataService.invalidateRouteCache(campaignRegistrationsRoute);
              // this.dataService.invalidateRouteCache(freeRegistrationsRoute);
              // this.dataService.invalidateRouteCache(allCompaniesRoute);
              // this.dataService.invalidateRouteCache(subscriptionsEndingSoonRoute);
              // this.dataService.invalidateRouteCache(pendingPaymentSubscriptionsRoute);
              // this.dataService.invalidateRouteCache(usageReportRoute);
              this.activeModal.close()
              this.notificationBarService.success('Subscription Reporting Category Changed.');
          });
      }
  }

  getData() {
      this.dataService.getLookupData(webPortal.getsubscriptionreportingcategory, true).subscribe((data:any) => {
          this.subscriptionReportingCategories = data;
      });
  }

  ngOnInit(){
    this.getData();
  }

}
