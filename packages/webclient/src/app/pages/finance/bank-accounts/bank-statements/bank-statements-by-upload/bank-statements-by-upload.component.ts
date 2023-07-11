import { Component } from "@angular/core";
import { Column, ColumnType, api, tabData, resourceMessages, dropDownFilter, searchUIOptions  } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import Enumerable from "linq";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { Router } from "@angular/router";
@Component({
  selector: "web-bank-statements-by-upload",
  templateUrl: "./bank-statements-by-upload.component.html",
})
export class BankStatementsByUploadComponent {
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  isLoaded = false;
  bankStatementsByUpload: any
  updateURL= '/finance/bankaccounts/bankstatementsbyupload'
  key: any
  accounts = []
  addNewButton = false
  helpLinkURL = webConstants.bankStatementsViewByMonthHelpUrl
  refreshButton = true
  title = 'resources.finance-bankaccounts-bankstatements-pageheading-bankstatementsbyupload'
  selectedAccountId = ""

  getData(refresh: boolean) {
    this.dataService.getLookupData(webApi.bankStatementsByUpload, refresh).subscribe((response: any) => { this.bankStatementsByUpload = response })
    this.dataService.getLookupData(webApi.bankStatementAccounts, refresh).subscribe((responses: any) => {
      this.accounts = responses; this.init()
      this.dropDownFilter.smOptions=responses
    })
  }

  tabData: tabData[] = [
    { routerLink: '/finance/bankaccounts/bankstatementsbymonth', header: 'resources.finance-bankaccounts-bankstatements-tabheading-viewbymonth' },
    { routerLink: '/finance/bankaccounts/bankstatementsbyupload', header: 'resources.finance-bankaccounts-bankstatements-tabheading-viewbyupload',isActive: true }
  ]
  
  ngOnInit() {
    this.getData(true)
  }

  init() {
    if (this.accounts.length > 0) {
      this.selectedAccountId = Enumerable.from(this.accounts).first()['key']
      this.dropDownFilter.selectedSearchFilterDropdown = this.selectedAccountId
      this.isLoaded = true;
    }
  }

  api: api = {
    get: webApi.bankStatementsByUpload,
  }

  bankStatementsByUploadColumns: Column[] = [
    { columnDef: 'accountName', header: 'Account Name' },
    { columnDef: 'name', header: 'Upload Name', columnType: ColumnType.link },
    { columnDef: 'datePosted', header: 'Date Posted', showDateFilter:true },
    { columnDef: 'startDate', header: 'Start Date', showDateFilter:true  },
    { columnDef: 'endDate', header: 'End Date', showDateFilter:true  },
    { columnDef: 'numberOfTransactions', header: 'No. of Transactions' },
    { columnDef: 'unallocatedTransactions', header: 'Unallocated' },
    { columnDef: 'allocatedTransactions', header: 'Allocated' }
  ]

  resourceMessages : resourceMessages = {
    noTableDataMessage: 'resources.finance-bankaccounts-allocate-labelheading-nobankstatements'
  }

  handleUpdateButtonClick(param: any,) {
    this.router.navigateByUrl(this.updateURL+'/'+param.id)
  }

  dropDownFilter:dropDownFilter = {
    smOptions: this.accounts,
    smRequired: false,
    smLabel: 'resources.finance-bankaccounts-bankstatements-viewbymonth-label-accountname',
    smOptionDisplayField: 'value',
    smOptionValueField: 'key',
    smPlaceholder: '',
    smLabelClass: 'col-md-4',
    selectedSearchFilterDropdown:this.selectedAccountId,
    getDataByValue: 'accountId'
  }
  searchUIOptions: searchUIOptions = {
    dropdown: true
  }
}
