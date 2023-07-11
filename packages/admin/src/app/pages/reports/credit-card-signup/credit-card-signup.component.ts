import { Component, OnInit } from "@angular/core";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "admin-credit-card-signup",
  templateUrl: "./credit-card-signup.component.html",
  styleUrls: ["./credit-card-signup.component.scss"],
})
export class CreditCardSignupComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private modalService: ModalService,
    private notificationBarService: NotificationBarService
  ) { }

  title = "Credit Card Signup Report";
  activeCompanies = "Credit Card sign ups (active companies)";
  inactiveCompanies = "Credit Card sign ups (deactivated companies)";
  showTitleBar = true;
  companyStatus = '';
  emailText = portalConstants.emailText;
  refreshMessage = portalConstants.refreshText;
  smLabel = 'Report Filter:';
  noDataMsg = "No Items Found.";
  pageData: any;

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.companyStatus) {
      this.dataService.getWithParams(webPortal.getCreditCardSignUpReport, { companyStatus: this.companyStatus }).subscribe((result: any) => {
        this.pageData = result
      })
    }else{
      this.pageData=[]
    }
  }

  emailCreditCardReport() {
    this.modalService.showPortalEmailModal('Email Credit Card Signup Report').result.then(
      (item) => {
        const params = {
          companyStatus: this.companyStatus,
          title: item.params.title,
          toEmail: item.toEmail
        }
        this.dataService.post(webPortal.emailCreditCardReport, params).subscribe(() => {
          this.notificationBarService.success('Credit Card Report Email Sent.');
        });
      });
  }

  refreshData() {
    this.getData()
  }

}
