import { Component } from "@angular/core";

import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { FilterSettingsService } from "packages/shared-lib/src/lib/services/filter-settings.service"
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "web-balancesheet",
  templateUrl: "./balancesheet.component.html",
})
export class BalancesheetComponent {
  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private dateService: DateService,
    private filterSettingsService: FilterSettingsService,
    private enumsService: EnumsService,
    private translateService: TranslateService,
  ) { }

  vm: any;
  showAllAccounts: any;
  paramFilters: any = {};

  fromDate: any;
  periodEnd: any;
  openedEnd = false;
  modalHeading = '';
  supportVideoBaseUrl = webConstants.balanceSheetURL;
  dateMessagePlaceHolder = webConstants.datePlaceHolderMessage

  setFilterSettings(viewModel: any, filters: any) {
    viewModel.periodEnd = filters.periodEnd;
  }

  getFilterSettings(viewModel: any, filterSettings: any) {
    filterSettings.periodEnd = viewModel.periodEnd ? this.dateService.getFormattedMoment(viewModel.periodEnd) : null;
  }

  print(frm: any) {
    if (!frm.invalid) {
      const data = {
        periodEnd: this.periodEnd
      }
      this.paramFilters["periodEnd"] = this.dateService.getFormattedDateForWebApi(data.periodEnd);

      this.dataService.getReportWithParams(webApi.balanceSheetPdf, this.paramFilters).then((dataUrl) => {
        this.modalService.openPdfReportModal(this.modalHeading, dataUrl);
      });
    }
  }

  exportData(frm: any) {
    if (!frm.invalid) {
      const exportTypeObject = {
        exportType: this.enumsService.exportTypeEnum.BalanceSheetCsv,
        toDate: this.periodEnd,
        fromDate: this.fromDate,
        showAllAccounts: this.showAllAccounts
      }

      this.paramFilters["fromDate"] = this.dateService.getFormattedDateForWebApi(exportTypeObject.fromDate);
      this.paramFilters["toDate"] = this.dateService.getFormattedDateForWebApi(exportTypeObject.toDate);
      this.paramFilters["exportType"] = exportTypeObject.exportType;
      this.paramFilters["showAllAccounts"] = exportTypeObject.showAllAccounts;

      this.dataService.getReportWithParams(webApi.balanceSheetExport, this.paramFilters).then((url: any) => {
        window.open(url, '_blank', '');
      });
    }
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.accountant-balancesheet-pdfmodal-header-balancesheet').subscribe((msg: any) => {
      this.modalHeading = msg;
    });
  }

  ngOnInit() {

    this.initTranslation();
    this.setFilterSettings(this.vm, this.filterSettingsService.balanceSheet);
    this.getFilterSettings(this.vm, this.filterSettingsService.balanceSheet);

  }
}
