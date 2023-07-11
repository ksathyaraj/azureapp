import { Component, ViewChild } from "@angular/core";
import { Column, api, resourceMessages, dropDownFilter, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { portalConstants } from "packages/shared-lib/src/lib/constants/portal.constants";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { TableComponent } from "packages/shared-lib/src/lib/ui/elements/table/table.component";
import * as moment from "moment";


@Component({
  selector: "admin-electronic-funds-transfer-report",
  templateUrl: "./electronic-funds-transfer-report.component.html",
})
export class ElectronicFundsTransferReportComponent {

  @ViewChild(TableComponent) child: TableComponent | undefined;

  constructor(
    private modalService: ModalService,
    private notificationBarService: NotificationBarService,
    private dataService: DataService,
  ){}
  
  companyStatus = [{key:true, value:"Active Companies"}, {key:false, value:"Deactivated Companies"}]
  start = moment();
  title='Electronic Funds Transfer Report'
  title2 = "Electronic Funds Transfer (active companies)"
  status:any
  searchUIOptions: searchUIOptions={
    searchInput: false,
    alphabetFilter: false,
    dropdown: true
  }
  initialLoad = true;
  dropDownFilter:dropDownFilter = {
    smOptions: this.companyStatus,
    smRequired: false,
    smLabel: 'Report Filter:',
    smOptionDisplayField: 'value',
    smOptionValueField: 'key',
    smPlaceholder: '',
    smLabelClass: 'col-md-4',
    selectedSearchFilterDropdown: true
  }

  EFTReportColumns: Column[] = [
    { columnDef: 'companyLoginName', header: 'Company Login Name'},
    { columnDef: 'clientName', header: 'Client Name'},
    { columnDef: 'reseller', header: 'Reseller/Affiliate'},
    { columnDef: 'registeredDate', header: 'Date Reg', showDateTimeFilter: true},
    { columnDef: 'previousStatus', header: 'Previous Status'},
    { columnDef: 'currentStatus', header: 'Current Status'},
    { columnDef: 'paymentMethod', header: 'Payment Method'},
    { columnDef: 'userName', header: 'User Name'},
    { columnDef: 'email', header: 'Email'},
    { columnDef: 'cellphone', header: 'Cellphone No.'},
    { columnDef: 'landline', header: 'Landline No.'}
  ]

  resourceMessages : resourceMessages = {
    noTableDataMessage: portalConstants.noDataFound
  }

  api: api = {
  get:webPortal.electronicfundstransferreport,
   dropDownFilter:{companyStatus:true}
  }
 
  titleChange(event:any){
    if(this.initialLoad){this.initialLoad=false;return;}
    if(event==true){
      this.title2='Electronic Funds Transfer (active companies)'
      this.api.dropDownFilter.companyStatus = event;
      this.status=event
      this.child?.getData(true);
    }
    else if(event==false)
    {
      this.title2='Electronic Funds Transfer (deactivated companies)'
      this.api.dropDownFilter.companyStatus = event;
      this.status=event
      this.child?.getData(true);
    }
  
  }

  emailElectronicFundsTransferReport () {
   this.modalService.showPortalEmailModal('Email Electronic Funds Transfer Signup Report').result.then(
       (item) => {
           const params={
            companyStatus:this.status,
            title: item.params.title,
            toEmail:item.toEmail
           }
           this.dataService.post(webPortal.emailelectronicfundstransferreport, params).subscribe(() => {
               this.notificationBarService.success('Electronic Funds Transfer Report Email Sent.');
           });
       });
}
}
