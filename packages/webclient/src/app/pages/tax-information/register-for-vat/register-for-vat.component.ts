import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { SettingsDataService } from "packages/shared-lib/src/lib/services/settings-data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
@Component({
  selector: "web-register-for-vat",
  templateUrl: "./register-for-vat.component.html",
})
export class RegisterForVatComponent implements OnInit {
  vatNumber = "";
  savesuccessmessage = "";
  modalHeading = "";
  modalContent = "";
  modalStyle = "btn-danger";

  model = {
    vatRegistrationNumber: "",
    IsVatRegistered: true,
  };
  paraContent = "";
  constructor(
    protected modalService: ModalService,
    private navigationService: NavigationService,
    private translateService: TranslateService,
    private notificationBarService: NotificationBarService,
    private messagingService: MessagingService,
     private dataService : DataService
  ) {}

  ngOnInit() {
    this.getTranslation();
  }

  cancelVat() {
    this.navigationService.goToCompanyProfileTaxInformation();
  }
accept() {
    this.modalService.confirmPasswordToProceed(this.modalHeading, this.modalContent).result.then((vatNumber: any) => {
      this.model.vatRegistrationNumber = vatNumber;
      this.dataService.post(webApi.changeVatStatusFilePath,this.model).subscribe(() => {
      this.messagingService.broadcastCompanyProfileSaved();
      this.notificationBarService.success(this.savesuccessmessage);
      this.navigationService.goToCompanyProfileTaxInformation();
    });
  });
   
  }
  log(value: string) {
    this.vatNumber = value;
  }
  getTranslation() {
    this.translateService
      .get("resources.common-messages-savesuccessmessage")
      .subscribe((res: string) => {
        this.savesuccessmessage = res;
      });
    this.translateService
      .get("resources.settings-changevatstatus-modal-header")
      .subscribe((res: string) => {
        this.modalHeading = res;
      });
    this.translateService
      .get("resources.settings-changevatstatus-modal-content")
      .subscribe((res: string) => {
        this.modalContent = res;
      });
     this.translateService
      .get("resources.settings-companyprofile-registerforvat-info-content")
      .subscribe((res: string) => {
        this.paraContent = res;
      });
  }
}