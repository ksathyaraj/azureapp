import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { ModalComponent } from "packages/shared-lib/src/lib/ui/elements/modal/modal.component";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import { SessionService } from "packages/shared-lib/src/lib/services/session.service";
import { SettingsDataService } from "packages/shared-lib/src/lib/services/settings-data.service";
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { UtilityDataService } from "packages/shared-lib/src/lib/services/utility-data.service";
import { TranslationService } from "packages/shared-lib/src/lib/services/translation.service";
import { env } from "packages/shared-lib/src//environments/environment";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
@Component({
  selector: "web-tax-information",
  templateUrl: "./tax-information.component.html",
  styleUrls: ["./tax-information.component.scss"],
})
export class TaxInformationComponent {
  savesuccessmessage = "";
  modalHeading = "";
  deRegisterFromVat = "";
  registerForVat = "";
  defaultVatRate = 0;
  vatButtonStatus = false;
  vatInfo: any;
  taxInformation: any = {};
  taxInfo: any;
  frmcompanyprofile: any;
  visible = false;
  constructor(
    protected modalService: ModalService,
    private navigationService: NavigationService,
    private translateService: TranslateService,
    private vatService: VatService,
    private settingsDataService: SettingsDataService,
    private lookupDataService: LookupDataService,
    private notificationBarService: NotificationBarService,
    private messagingService: MessagingService,
    private utilityDataService: UtilityDataService,
    private sessionService: SessionService,
    private translation: TranslationService,
     private dataService : DataService
  ) {}
  protected modalComponent!: ModalComponent;
  supportVideoBaseUrl = webConstants.prefixSettingsVideoURL;
  vatStatusTooltip = "Click Save before changing your VAT status";
  
  tabData: tabData[] = [
   {routerLink: '/settings/companyprofile', header: 'resources.settings-companyprofile-panelheading-companyprofile'},
     {routerLink: '/settings/taxinformation', header: 'resources.settings-companyprofile-tabheading-taxinformation', isActive: true},
     {routerLink: '/settings/prefixandstartingnumber', header: 'resources.settings-companyprofile-tabheading-prefixandstartingnumbersettings'},
     {routerLink: '/settings/bankingdetails', header: 'resources.settings-companyprofile-tabheading-bankingdetails-panelheading-bankingdetails'},
     {routerLink: '/settings/currency', header: 'resources.settings-companyprofile-tabheading-currency'},
     {routerLink: '/settings/partnerapps', header: 'Partner Apps'}
  ];

  ngOnInit() {
    this.getTranslation();
    this.getData(true);
    this.getTaxInfo();
  }

  getTranslation() {
    this.translateService
      .get("resources.common-messages-savesuccessmessage")
      .subscribe((res: string) => {
        this.savesuccessmessage = res;
      });
    this.translateService
      .get("resources.companyprofile-controller-title-taxinformation")
      .subscribe((res: string) => {
        this.modalHeading = res;
      });
    this.translateService
      .get("resources.companyprofile-controller-deregisterfromvat")
      .subscribe((res: string) => {
        this.deRegisterFromVat = res;
      });
    this.translateService
      .get("resources.companyprofile-controller-registerforvat")
      .subscribe((res: string) => {
        this.registerForVat = res;
      });
  }
  navigateToVatStatusChange() {
    if (this.vatInfo.isVatRegistered) {
      this.navigationService.goToDeregisterFromVat();
    } else {
      this.navigationService.goToRegisterForVat();
    }
  }

  getCompanyCountryId() {
    return this.sessionService.countryid;
  }

  setVatStatusButton() {
    if (this.vatInfo && this.vatInfo.vatRegistrationNumber) return false;

    return true;
  }

  vatNumberOnChange(frmcompanyprofile: any) {
    if (frmcompanyprofile.dirty) {
      this.vatButtonStatus = true;
    } else {
      this.vatButtonStatus = false;
    }
  }

  getData(refresh: boolean) {
    this.dataService.getLookupData(webApi.getVatInfoFilePath,refresh).subscribe((response: any) => {
      this.vatInfo = response;
      this.defaultVatRate = this.vatService.getVatRate(this.vatInfo, undefined);
      this.vatButtonStatus = this.setVatStatusButton();
    });
    this.dataService.getRecord(webApi.getRecordsFilePath).subscribe((response: any) => {
      this.taxInformation = response;
    });
  }
  save(frmcompanyprofile: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frmcompanyprofile.invalid) {
      this.dataService
        .post(webApi.postTaxInformationFilePath,this.taxInformation)
        .subscribe(() => {
          this.vatButtonStatus = this.setVatStatusButton();
          this.messagingService.broadcastCompanyProfileSaved();
          this.notificationBarService.success(this.savesuccessmessage);
        });
    }
  }

  isVatableChange(value: any) {
    value  ? this.taxInformation.vatRate = this.defaultVatRate : (this.taxInformation.vatRate = 0);
  }

  getTaxInfo() {
    const resourceKey = this.translation.getTaxInfoResourceKey();
    this.translateService.get(resourceKey).subscribe((res: string) => {
      this.taxInfo = res;
    });
  }
  showInfo() {
    this.modalService.messageModal(this.modalHeading, this.taxInfo).result.then((data: any) => {
      console.info(data);
  
    }).catch((error:any) => {
      console.log(error)
    });
  }
}