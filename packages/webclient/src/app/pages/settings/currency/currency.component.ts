import { Component } from "@angular/core";
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { ModalService } from 'packages/shared-lib/src/lib/services/modal.service';
import { TranslateService } from "@ngx-translate/core";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "web-currency",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.scss"],
})
export class CurrencyComponent {
  bankInfo: any;
  currencySettings: any;
  frm: any;

  constructor(
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
    private messagingService: MessagingService,
    private modalService: ModalService,
    private translateService: TranslateService,
  ) { }

  private saveSuccessMessage = '';
  private modelHeading = '';
  currencyToShowOnPdfReports: any;

  getData() {
    this.dataService.getRecord(webApi.currencyInformation).subscribe((response: any) => {
      this.currencySettings = response;
      this.setCurrencyToShowOnPdfReports(this.currencySettings);

    });
  }

  setCurrencyToShowOnPdfReports(currencySettings: any) {
    if (currencySettings.selectedCurrency && currencySettings.currencyToShowOnPdfReports === currencySettings.selectedCurrency.symbol) {
      this.currencyToShowOnPdfReports = 2;
    }
    else if (currencySettings.selectedCurrency && currencySettings.currencyToShowOnPdfReports.startsWith(currencySettings.selectedCurrency.code)) {
      this.currencyToShowOnPdfReports = 3;
    }
    else {
      this.currencyToShowOnPdfReports = 1;
    }

  }

  getCurrencyToShowOnPdfReports() {
    if (this.currencyToShowOnPdfReports == 2)
      return this.currencySettings.selectedCurrency.symbol;
    else if (this.currencyToShowOnPdfReports == 3)
      return this.currencySettings.selectedCurrency.code;
    else
      return '';
  }

  save(frm: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) {
      const data = {
        currencyId: this.currencySettings.selectedCurrency.id,
        currencyToShowOnPdfReports: this.getCurrencyToShowOnPdfReports()
      }
      this.dataService.post(webApi.saveCurrencyInformation, data).subscribe(() => {
        this.getData();
        this.notificationBarService.success(this.saveSuccessMessage);

      });

    }

  }

  showInfo() {
    this.modalService.messageModal(this.modelHeading, this.bankInfo);
  }

  initTranslation() {

    this.translateService.setDefaultLang('en')
    this.translateService.use('en')

    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: any) => {
      this.saveSuccessMessage = msg;
    });

    this.translateService.get('resources.companyprofile-controller-title-currency').subscribe((msg: any) => {
      this.modelHeading = msg;
    });

    this.translateService.get('resources.companyprofile-controller-currencyinfo').subscribe((msg: any) => {
      this.bankInfo = msg;
    });
  }

  ngOnInit() {
    this.activate();
  }

  activate() {
    this.initTranslation();
    this.getData();
  }

  tabData: tabData[] = [
    { routerLink: '/settings/companyprofile', header: 'resources.settings-companyprofile-panelheading-companyprofile' },
    { routerLink: '/settings/taxinformation', header: 'resources.settings-companyprofile-tabheading-taxinformation' },
    { routerLink: '/settings/prefixandstartingnumber', header: 'resources.settings-companyprofile-tabheading-prefixandstartingnumbersettings' },
    { routerLink: '/settings/bankingdetails', header: 'resources.settings-companyprofile-tabheading-bankingdetails-panelheading-bankingdetails' },
    { routerLink: '/settings/currency', header: 'resources.settings-companyprofile-tabheading-currency',  isActive: true },
    { routerLink: '/settings/partnerapps', header: 'Partner Apps' }
  ]
}
