import { Component } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { Router } from "@angular/router";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { TranslateService } from "@ngx-translate/core";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
@Component({
  selector: "web-business-cash",
  templateUrl: "./business-cash.component.html",
  styleUrls: ["./business-cash.component.scss"],
})
export class BusinessCashComponent {
  months: any;
  selectedMonth: any;
  data: any = {};
  constructor(
    private router: Router,
    private dataService: DataService,
    private translateService: TranslateService,
    private messagingService: MessagingService,
    private modalService: ModalService,
    private notificationService: NotificationBarService,
  ) { }

  showVat = false;
  supportVideoBaseUrl = webConstants.businessCashHelpVideoURL
  confirmDeleteMessage = '';
  addURL = '/finance/businesscash/addbusinesscash';
  deleteSuccessMessage = '';
  modalHeading = '';
  vatInfo: any;
  getBusinessCashRoute = '/api/businesscash/'
  paramFilters:any = {};

  getData(refresh: boolean) {

    this.dataService.getLookupData(webApi.vatInfo, true).subscribe((response: any) => {
      this.vatInfo = response
      this.showVat = this.vatInfo.showVat;
    })
    this.dataService.getLookupData(webApi.businessCashMonths, refresh).subscribe((response: any) => {
      this.months = response
      if (this.months.length > 0) {
        this.selectedMonth = this.months[0].monthDate;
        this.selectedMonthChanged(this.months[0]);
      } else {
        this.data = null;
        return;
      }
    })
  }

  selectedMonthChanged(selectedMonth: any) {
    if (selectedMonth != undefined) {
      this.dataService.getLookupData(webApi.businessCashRoute + selectedMonth.year + '/' + selectedMonth.month, true).subscribe((result: any) => {
        this.data = result;
      });
    }
  }

  print(selectedMonth: any) {
    this.paramFilters["periodYear"] = selectedMonth.year;
    this.paramFilters["periodMonth"] = selectedMonth.month;
    this.dataService.getReportWithParams(webApi.PDFbusinessCash, this.paramFilters).then((dataUrl:any) => {
      this.modalService.openPdfReportModal(this.modalHeading, dataUrl);
    });
  }

  delete(businessCashItem: any) {
    this.modalService.confirmDelete(this.confirmDeleteMessage + '?').result.then(
      () => {
        this.dataService.post(webApi.deleteBusinessCash + businessCashItem.id + '/delete').subscribe((result) => {
          this.notificationService.success(this.deleteSuccessMessage);
          this.getData(true);
        });
      });

  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.finance-businesscash-pdfmodal-header-businesscashreport').subscribe((msg) => {
      this.modalHeading = msg;
    });
    this.translateService.get('resources.finance-businesscash-deleteconfirmmessage').subscribe((msg) => {
      this.confirmDeleteMessage = msg;
    });
    this.translateService.get('resources.finance-businesscash-deletesuccessmessage').subscribe((msg) => {
      this.deleteSuccessMessage = msg;
    });

  }

  handleAddButtonClick(event: Event) {
    this.router.navigateByUrl(this.addURL);
  }

  activate() {
    this.initTranslation();
    this.getData(true);
  }

  ngOnInit() {
    this.activate();
    this.messagingService.listenGlobalTranslationRefresh(() => { this.initTranslation() })
  }
}
