import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Column, ColumnType, api } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "admin-bulklicensedetails",
  templateUrl: "./bulklicensedetails.component.html",
})
export class BulklicensedetailsComponent {
  constructor(private router: Router, private dataService: DataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.licenseeId = parseInt(params['id']);
      this.invoiceNumber = params['invoiceNumber']
      this.api.get = webPortal.getBulkLicenses + this.licenseeId;
    });
  }
  exportButton = false;
  refreshButton = true;
  pdfButton = false;
  addNewButton = true;
  title = 'Bulk Licenses';
  title2 = '';
  updateURL = '/licensees/';
  licenseeId = 0;
  invoiceNumber: any;

  ngOnInit() {
    this.dataService.getRecordWithParams(webPortal.getLicenseID + this.licenseeId, null).subscribe((res: any) => {
      this.title2 = 'Licensee - ' + res.name;
    })
  }

  licenseesColumns: Column[] = [
    { columnDef: 'invoiceNumber', header: 'Invoice Number', columnType: ColumnType.link, },
    { columnDef: 'numberOfVouchers', header: 'Number of Licenses' },
    { columnDef: 'numberOfRedeemedVouchers', header: 'Redeemed Licenses' },
    { columnDef: 'daysValidFor', header: 'Days Valid' },
    { columnDef: 'issuedDate', header: 'Date Issued', showDateTimeFilter: true },
    { columnDef: 'redemptionStartDate', header: 'Redemption From', showDateFilter: true },
    { columnDef: 'redemptionDaysValidFor', header: 'Redemption Days Valid For' },
    { columnDef: '', header: 'Download', columnDownload: ColumnType.download },
  ];

  api: api = {
    get:webPortal.getBulkLicenses
  };

  handleDownloadVouchers(param: any) {
    const paramFilters: any = {}
    paramFilters.licenseeId = this.licenseeId,
      paramFilters.invoiceNumber = param.invoiceNumber
    this.dataService.getReportWithParams(webPortal.downloadVouchers, paramFilters).then((url: any) => {
      window.open(url, '_blank', '');
    });
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + this.licenseeId + '/' + param.data.invoiceNumber);
  }
}
