import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
  Column,
  ColumnType,
  api,
} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { TableComponent } from "packages/shared-lib/src/lib/ui/elements/table/table.component";

@Component({
  selector: "admin-vouchers",
  templateUrl: "./vouchers.component.html",
})
export class VouchersComponent implements OnInit {
  @ViewChild(TableComponent) child: TableComponent | undefined;

  constructor(
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private notificationBarService: NotificationBarService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.licenseeId = parseInt(params["id"]);
      this.invoiceNumber = params["invoiceNumber"];
      this.api.get =
        webPortal.getBulkLicenseDetails +
        this.invoiceNumber +
        webPortal.getLicenseeId +
        this.licenseeId;
    });
  }
  exportButton = false;
  refreshButton = true;
  pdfButton = false;
  downloadButton = true;
  title = "Voucher Details";
  title2 = "";
  selectedPaymentTypeItem: any = "";
  selectedPaymentOptions = portalConstants.voucherOptions;
  from: any = null;
  to: any = null;
  updateURL = "/companies/company-";
  licenseeId = 0;
  invoiceNumber: any;
  defaultOption = "None";



  vouchersColumns: Column[] = [
    { columnDef: "voucherCode", header: "Voucher code" },
    { columnDef: "daysValidFor", header: "Days valid for" },
    {
      columnDef: "",
      header: "Redeemed",
      columnCheckbox: ColumnType.checkbox,
      checkboxClassField: (dataValue: any) => {
        return dataValue["redeemed"]
          ? "fa fa-check-square-o"
          : "fa fa-square-o";
      },
      transparentBtn: true,
    },
    {
      columnDef: "redeemedDate",
      header: "Redeemed Date",
      showDateFilter: true,
    },
    { columnDef: "voucherStatusDescription", header: "Status" },
    { columnDef: "company", header: "Login Name", columnType: ColumnType.link },
    { columnDef: "registeredCompanyName", header: "Registered Name" },
    {
      columnDef: "activationDate",
      header: "Activation date",
      showDateTimeFilter: true,
    },
    {
      columnDef: "expiryDate",
      header: "Expiry date",
      showDateTimeFilter: true,
    },
    { columnDef: "", header: "" },
  ];

  api: api = {

  };

  save(form: any) {
    if (form.invalid) return;
    const cmd = {
      invoiceNumber: this.invoiceNumber,
      licenseeId: this.licenseeId,
      voucherPaymentType: this.selectedPaymentTypeItem,
      paymentStartDate: this.from,
      paymentEndDate: this.to,
    };
    this.dataService
      .post(webPortal.saveVoucherPaymentType, cmd)
      .subscribe(() => {
        this.notificationBarService.success("Saved Successfully");
        this.child?.getData(true);
      });
  }

  getData() {
    this.dataService
      .getRecordWithParams(webPortal.getLicenseID + this.licenseeId, null)
      .subscribe((res: any) => {
        this.title2 = `Voucher Details for ${res.name}, Invoice: ${this.invoiceNumber}`;
      });
    this.dataService
      .getRecordWithParams(webPortal.getBulkLicenseDetails + this.invoiceNumber + webPortal.getLicenseeId + this.licenseeId, null)
      .subscribe((res: any) => {
        const data = res[0];
        this.selectedPaymentTypeItem = data?.voucherPaymentType;
        this.from = data?.paymentStartDate;
        this.to = data?.paymentEndDate
      });
  }

  downloadVouchers() {
    const paramFilters: any = {};
    paramFilters.licenseeId = this.licenseeId;
    paramFilters.invoiceNumber = this.invoiceNumber;
    this.dataService.getReportWithParams(webPortal.downloadVouchers, paramFilters).then((url: any) => {
      window.open(url, '_blank', '');
    });
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + param.data.companyId);
  }

  ngOnInit() {
    this.getData()
  }
}
