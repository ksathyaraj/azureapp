import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { AuthService } from "packages/shared-lib/src/lib/services/auth.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "admin-company-details",
  templateUrl: "./company-details.component.html",
  styleUrls: ["./company-details.component.scss"],
})
export class CompanyDetailsComponent {

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'].replace('company-','');
    });
  }
  company: any = {};
  companyId = '';
  canImpersonate = this.authService.canImpersonate();

  activate() {
      this.dataService.getRecordWithParams(webPortal.comapnyDetails, { id: this.companyId }).subscribe((result) => {
          this.company = result;
          console.log(this.company);
      });
  }

  ngOnInit() {
    this.activate();
  }

  sendFreeTrialEndingEmail() {
      this.dataService.post(webPortal.sendfreetrialendingemail + this.companyId).subscribe(() => {
          this.notificationBarService.success('Free Trial Ending Email Sent.');
      });
  }

 sendSubscriptionEndingEmail() {
      this.dataService.post(webPortal.sendsubscriptionendingemail + this.companyId).subscribe(() => {
          this.notificationBarService.success('Subscription Ending Email Sent.');
      });
  }

  queryAndUpdatePesaPalPaymentStatus(trackingId: any) {
      this.dataService.post(webPortal.queryandupdatepesapalpaymentstatus + this.companyId + '/' + trackingId).subscribe(()=>{
          this.activate();
      });
  }

  activatePendingPaymentSubscription(subscriptionId: any) {
      this.modalService.questionModal('Activate Subscription?', 'Are you sure you want to Activate this subscription?').result.then(()=>{
        this.dataService.post(webPortal.activate + this.companyId + '/' + subscriptionId + '?reason=Payment received').subscribe(() => {
            this.activate();
          });
      });
  }

  suspendPendingPaymentSubscription(subscriptionId: string) {
      this.modalService.questionModal('Suspend Subscription?', 'Are you sure you want to Suspend this subscription? If this is the Companies current subscription they will no longer be able to login.').result.then(() => {
        this.dataService.post(webPortal.suspend + this.companyId + '/' + subscriptionId + '?reason=Payment NOT received').subscribe(() => {
              this.activate();
          });
      });
  }

  extendSubscriptionExpiry(subscriptionId: any, company: any) { //
      this.modalService.showExtendSubscriptionExpiry(subscriptionId, company).result.then(() => { this.activate(); });
  }

  changeSubscriptionExpiry(subscriptionId: any, company: any) { //
      this.modalService.showChangeSubscriptionExpiry(subscriptionId, company).result.then(() => { this.activate(); });
  }

  manualAbsaHandover(company: any) {//
      this.modalService.showManualAbsaHandover(company).result.then(() => { this.activate(); });
  }

  changeReportingCategory(subscriptionId: any, company: any) {//
      this.modalService.showChangeReportingCategory(subscriptionId, company).result.then(() => { this.activate(); });
  }

  showActivateSubscriptionModal(subscriptionId: any, company: any) { 
      const params = { company: company, subscriptionId: subscriptionId };
      this.modalService.showActivateCompanyModal(params).result.then(() => { this.activate(); });
  }

  showSuspendSubscriptionModal(subscriptionId: any, company: any) {//
      const params = { company: company, subscriptionId: subscriptionId };
      this.modalService.showDeActivateCompanyModal(params).result.then(() => { this.activate(); });
  }

  showSubscriptionHistory() {//
      this.modalService.showSubscriptionHistory(this.company);
  }

  showAddCompanyHistory() {//
      this.modalService.showAddCompanyHistory(this.company).result.then(() => { this.activate();  });
  }

  showExtraInfo(extraInfo: any) {//
      this.modalService.messageModal('Extra Info', extraInfo, 'default');
  }
}
