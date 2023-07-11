import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { Router } from '@angular/router';
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from "../../../../../../shared-lib/src/lib/interfaces/webclient.interface";

@Component({
  selector: "web-payslips",
  templateUrl: "./payslips.component.html",
  styleUrls: ["./payslips.component.scss"],
})
export class PayslipsComponent {
  
  constructor(private router: Router) {
  }

  helpLinkURL = webConstants.searchPayslipURL;
  addURL = '/staff/payslips/0';
  updateURL = '/staff/payslips';
  payslipsColumns: Column[] = [
    { columnDef: 'staffName', header: 'Staff Member', columnType: ColumnType.link},
    { columnDef: 'payslipFrom', header: 'From',showDateFilter: true},
    { columnDef: 'payslipTo', header: 'To',showDateFilter: true},
    { columnDef: 'grossAmount', header: 'Gross', pullRight:true, showDecimalFilter:true},
    { columnDef: 'deductionAmount', header: 'Deduction', pullRight:true,showDecimalFilter:true},
    { columnDef: 'nettAmount', header: 'Nett', pullRight:true,showDecimalFilter:true},
    { columnDef: '', header: '', columnPDF:ColumnType.pdf, columnEmail:ColumnType.email, columnType: ColumnType.deleteButton  }
  ];
  api: api = {
    getWithDateRange: webApi.payslips,
    deleteForHttpPostMethod: webApi.deletePayslip,
    email: webApi.payslipEmailDetail,
    pdf:webApi.payslipsPDF,
  };
  title = 'resources.staff-payslips-pageheading-payslips';

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true,
    dateRange: true
  };
  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.staff-staffdetails-payslips-label-warningmessage',
    deleteSuccessMessage: 'resources.contacts-organisations-deletesuccessmessage',
    confirmDeleteMessage: 'resources.contacts-organisations-confirmdeletemessage',
    tableSearchPlaceHolder: 'resources.staff-payslips-searchplaceholder',
    emailModelHeading: 'resources.reports-emailmodel-modelheading-emailtype-payslip',
    PDFModalHeading: 'resources.staff-payslips-reportmodalheading-payslipreport',
    pdf:'PDF this Payslip',
    email:'Email this Payslip',
    
  };

  handleAddButtonClick(event: Event){
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id);
  }
}
