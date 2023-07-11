import { Component } from "@angular/core";
import {
  dropDownFilter,
  searchUIOptions,
} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import Enumerable from "linq";

@Component({
  selector: "web-allocate",
  templateUrl: "./allocate.component.html",
  styleUrls: ["./allocate.component.scss"],
})
export class AllocateComponent {
  constructor(private dataService: DataService,private router:Router,
    private modalService: ModalService,private translateService: TranslateService) {
  }
  helpLinkURL = webConstants.alloacteVideoURL;

  confirmDeleteMessage = "";
  selectedAccountId = '';
  accounts = [];
  data: any=[];

  ngOnInit() {
    this.getData(true);
    this.initTranslation();
  }

  updateURL = "/finance/bankaccounts/allocate";
  
  dropDownFilter: dropDownFilter = {
    smOptions: this.accounts,
    smRequired: false,
    smLabel: "resources.finance-bankaccounts-allocate-label-accountname",
    smOptionDisplayField: "value",
    smOptionValueField: "key",
    smPlaceholder: "",
    smLabelClass: "",
    selectedSearchFilterDropdown:this.selectedAccountId
  };

  searchUIOptions: searchUIOptions = {
    dropdown: true,
  };

  title =
    "resources.finance-bankaccounts-allocate-pageheading-bankstatementswithunallocateditems";

  getData(refresh: boolean) {
    this.dataService
      .getLookupData(webApi.getBankstatementsWithUnallocatedItems, refresh)
      .subscribe((response: any) => {
        this.data = response;
      });
    this.dataService
      .getLookupData(webApi.getBankStatementAccounts, refresh)
      .subscribe((response: any) => {
        this.accounts = response;
        this.init();
        this.dropDownFilter.smOptions = response;
        
      });
  }
  onDropdownChanged(event:any){
    this.selectedAccountId= event;
  }

  init() {
    if (this.accounts.length > 0) {
      this.selectedAccountId = Enumerable.from(this.accounts).first()["key"];
      this.dropDownFilter.selectedSearchFilterDropdown = this.selectedAccountId;
    }
  }
  initTranslation() {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
     this.translateService.get('resources.finance-bankaccounts-allocate-deleteconfirmmessage').subscribe((msg:string)=> {
        this.confirmDeleteMessage = msg;
    });
  }
  deleteData(item:any){
    this.data = Enumerable.from(this.data).where((c:any)=> { return c.id !== item.id; }).toArray();

    this.modalService.confirmDelete(this.confirmDeleteMessage + ': ' + item.name + '?').result.then(
      ()=> {
        this.dataService.post(webApi.deleteBankStatementAccounts + item.id).subscribe(()=> {
            this.data = Enumerable.from(this.data).where((c:any)=> { return c.id !== item.id; }).toArray();
          });
      });
  }
  selectedAccountHasAutoFeeds() {
    if (!this.selectedAccountId ) return false;
    const filteredResults = this.data.filter((d: any) => {
      return (
        d.accountId === this.selectedAccountId && d.isAutoBankFeed === true
      );
    });
    return filteredResults.length > 0;
  }

  selectedAccountHasManualFeeds() {
    if (!this.selectedAccountId ) return false;
    const filteredResults = this.data.filter((d: any) => {
      return (
        d.accountId === this.selectedAccountId && d.isAutoBankFeed === false
      );
    });
    return filteredResults.length > 0;
  }

  filterGridAuto(item: any) {
    return (
      item.accountId === this.selectedAccountId && item.isAutoBankFeed === true
    );
  }

  filterGridManual(item: any) {
    return (
      item.accountId === this.selectedAccountId && item.isAutoBankFeed === false
    );
  }
}
