import { Component } from "@angular/core";
import { ModalService } from 'packages/shared-lib/src/lib/services/modal.service';
import { UtilityDataService } from 'packages/shared-lib/src/lib/services/utility-data.service';
import { TranslateService } from "@ngx-translate/core";
import { Column, ColumnType, api, tabData, resourceMessages } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { Router } from '@angular/router';
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
  selector: "web-bankingdetails",
  templateUrl: "./bankingdetails.component.html",
})
export class BankingdetailsComponent {
  bankInfo!: string;
  addURL = '/settings/bankingdetails/bankingdetail/0';
  updateURL = '/settings/bankingdetails/bankingdetail';

  constructor(
    private router:Router,
    private modalService: ModalService,
    private utilityDataService: UtilityDataService,
    private translateService: TranslateService,
   ) {}

  supportVideoBaseUrl = webConstants.bankingDetailsVideoURL

  modelHeading = '';

  broadcastIfFirstBankAccount(count:number) {
      if (count === 1) {
          this.utilityDataService.broadcastCompanyProfileSavedAfterTimelapse();
      }
  }

  showInfo () {
      this.modalService.messageModal(this.modelHeading, this.bankInfo);
  }

   initTranslation() {
      this.translateService.setDefaultLang('en')
      this.translateService.use('en')

      this.translateService.get('resources.companyprofile-controller-title-bankingdetails').subscribe( (msg:string)=> {
          this.modelHeading = msg;
          
      });

      this.translateService.get('resources.companyprofile-controller-bankinfo').subscribe( (msg:string) => {
         this.bankInfo = msg;
         
      });
  }
  
  activate() {
      this.initTranslation();

  
  }
  ngOnInit(){
    this.activate();
  }

  bankingDetailsColumns: Column[] = [
    { columnDef: 'bankName', header: 'Bank', columnType: ColumnType.link},
    { columnDef: 'accountName', header: 'Account Name'},
    { columnDef: 'accountNo', header: 'Account Number'},
    { columnDef: 'branch', header: 'Branch' },
    { columnDef: 'branchCode', header: 'Branch Code'},
    { columnDef: '', header: '', columnType: ColumnType.deleteButton,optionalDeleteHidden: (dataValue: any, originalDataSet: any) => {return dataValue['hasTransactions']} }
  ];

  api: api = {
    get: webApi.bankingDetails,
    deleteForHttpDeleteMethod: webApi.deleteBankingDetail
  };

  tabData: tabData[] = [

     {routerLink: '/settings/companyprofile', header: 'Company Profile'},
     {routerLink: '/settings/taxinformation', header: 'VAT Information'},
     {routerLink: '/settings/prefixandstartingnumber', header: 'Prefix And Starting Number Settings'},
     {routerLink: '/settings/bankingdetails', header: 'Banking Details', isActive: true},
     {routerLink: '/settings/currency', header: 'Currency'},
     {routerLink: '/settings/partnerapps', header: 'Partner Apps'}
    
 ];

 resourceMessages : resourceMessages = {
  deleteSuccessMessage: webConstants.deletedSuccessMessage,
  confirmDeleteMessage: webConstants.deleteConfirmationMessage,
};

 handleAddButtonClick(event: Event){
  this.router.navigateByUrl(this.addURL);
}

handleUpdateButtonClick(param: any) {
  this.router.navigateByUrl(this.updateURL+'/'+param.id);
}
  
}
