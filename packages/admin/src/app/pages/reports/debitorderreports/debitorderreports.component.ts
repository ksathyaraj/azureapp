import { Component, ViewChild } from "@angular/core";
import { Column, api, resourceMessages, dropDownFilter, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { TableComponent } from "packages/shared-lib/src/lib/ui/elements/table/table.component";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "admin-debitorderreports",
  templateUrl: "./debitorderreports.component.html",
})
export class DebitorderreportsComponent {
  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private notificationBarService: NotificationBarService,
  ) { }
  @ViewChild(TableComponent) child: TableComponent | undefined;
  status: any;
  title = "Debit Order Report"
  title2 = "Debit Order (active companies)"
  companyStatus = [{ key: true, value: "Active Companies" }, { key: false, value: "Deactivated Companies" }]

  searchUIOptions: searchUIOptions = {
    dropdown: true,
  }

  resourceMessages: resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound
  }

  initialStatus = true;

  dropDownFilter: dropDownFilter = {
    smOptions: this.companyStatus,
    smRequired: false,
    smLabel: 'Report Filter:',
    smOptionDisplayField: 'value',
    smOptionValueField: 'key',
    smPlaceholder: '',
    smLabelClass: 'col-md-4',
    selectedSearchFilterDropdown: true,
  }

  debitOrderColumns: Column[] = [
    { columnDef: 'companyLoginName', header: 'Company Login Name' },
    { columnDef: 'clientName', header: 'Client Name' },
    { columnDef: 'reseller', header: 'Reseller/Affiliate' },
    { columnDef: 'registeredDate', header: 'Date Reg', showDateTimeFilter: true },
    { columnDef: 'previousStatus', header: 'Previous Status' },
    { columnDef: 'currentStatus', header: 'Current Status' },

    { columnDef: 'paymentMethod', header: 'Payment Method' },
    { columnDef: 'userName', header: 'User Name' },
    { columnDef: 'email', header: 'Email', showDateTimeFilter: true },
    { columnDef: 'cellphone', header: 'Cellphone No.' },
    { columnDef: 'landline', header: 'Landline No.' },
  ]

  titleChange(event: any) {
    if (this.initialStatus) { this.initialStatus = false; return; }

    if (event == true) {
      this.title2 = 'Debit Order (active companies)'
      this.api.dropDownFilter.companyStatus = event;
      this.status = this.api.dropDownFilter.companyStatus
      this.child?.getData(true);
    }
    else if (event == false) {
      this.title2 = 'Debit Order (deactivated companies)'
      this.api.dropDownFilter.companyStatus = event;
      this.status = this.api.dropDownFilter.companyStatus
      this.child?.getData(true);
    }

  }

  api: api = {
    get: webPortal.debitOrderReport,
    dropDownFilter: { companyStatus: true }
  }

  emailDebitOrderReport() {
    this.modalService.showPortalEmailModal('Email Debit Order Report').result.then(
      (item: any) => {

        const params = {
          companyStatus: this.status,
          title: item.params.title,
          toEmail: item.toEmail

        }
        this.dataService.post(webPortal.emaildebitOrderReport, params).subscribe(() => {
          this.notificationBarService.success('Debit Order Report Email Sent.');
        })
      })
  }

}
