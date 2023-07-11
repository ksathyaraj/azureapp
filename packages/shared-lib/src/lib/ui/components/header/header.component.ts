import { Component, Input, OnInit } from "@angular/core";
import { SessionService } from "../../../services/session.service";
import { AuthService } from "../../../services/auth.service";
import { LookupDataService } from "../../../services/lookup-data.service";
import { webPortal } from "../../../services/api/webportal.api";
import { DataService } from "../../../services/data.service";
import { PortalSessionService } from "../../../services/portal/session.service";
import { MessagingService } from "../../../services/messaging.service";
import { NavigationService } from "../../../services/navigation.service";
@Component({
  selector: "lib-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  companyName: string | undefined;
  companyProfileImage: any;
  companies: any = [];
  selectedCompany = "";

  @Input() isAdminSectionEnable = false;

  constructor(
    private sessionService: SessionService,
    private portalSessionService: PortalSessionService,
    private authService: AuthService,
    private lookupDataService: LookupDataService,
    private dataService: DataService,
    private messagingService: MessagingService,
    private navigationService: NavigationService
  ) {
    this.messagingService.listenCompanyProfileSaved(
      this.getProfileImage.bind(this)
    );
  }

  ngOnInit() {
    if (this.isAdminSectionEnable) {
      this.userName = this.portalSessionService.username;
      this.getCompany();
    } else {
      this.userName = this.sessionService.username;
      this.companyName = this.sessionService.companyname;
      if (this.userName && this.companyName) {
        this.lookupDataService
          .getCompanyProfileImage(true, false)
          .subscribe((data: any) => {
            this.companyProfileImage = data;
          });
      }
    }
  }

  logout() {
    if (this.isAdminSectionEnable) {
      this.authService.portalLogout();
    } else {
      this.authService.logOut();
    }
  }

  getCompany() {
    this.dataService
      .getLookupData(webPortal.getCompanies)
      .subscribe((result: any) => {
        this.companies = result;
      });
  }

  onSelect() {
    this.navigationService.goToCompany(this.selectedCompany);
  }

  refreshData() {
    this.getCompany();
  }

  getProfileImage(data: any) {
    this.companyProfileImage = data;
  }
}
