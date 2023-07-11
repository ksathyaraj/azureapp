import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, api, helpPanelData, historicalBankSelectOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";

@Component({
  selector: "web-import-bank-statement",
  templateUrl: "./import-bank-statement.component.html",
})
export class ImportBankStatementComponent {
    constructor(private dataService: DataService, private translateService: TranslateService, private modalService: ModalService, private navigationService: NavigationService) {
        this.getData();
      }
      ngOnInit() {
        this.getTranslation();
        this.selectOptions.dateFormats = webConstants.dateFormats;
      }
    
      blockTemplate = '';
      dateFormatLabel = '';
      templatefilepath = webApi.bankStatementTemplateFilePath + '?' + webApi.x_api_key;
      historicalCustomers: Column[] = [
        { columnDef: 'date', header: 'Date'},
        { columnDef: 'description', header: 'Description'},
        { columnDef: 'amount', header: 'Amount'}
    
      ];
      api: api = {
        post: webApi.BankStatementUpload,
        getFileUploader: webApi.BankStatementUpload
      };
      helpPanelData: helpPanelData[] = [
        {header:'resources.common-settings-import-bankstatement-helppanel-row1-heading', data:'resources.common-settings-import-bankstatement-helppanel-row1-text'},
        {header:'resources.common-settings-import-bankstatement-helppanel-row2-heading', data:'resources.common-settings-import-bankstatement-helppanel-row2-text'},
        {header:'resources.common-settings-import-bankstatement-helppanel-row3-heading', data:'resources.common-settings-import-bankstatement-helppanel-row3-text'}
      ];
      selectOptions: historicalBankSelectOptions = {
        dateFormats: [],
        bankAccounts: [],
        prefferedBankAccount: {}
      };
      currentPage = 2;
      dataLoaded = false;
      addBankAccount = '';
      bankAccountWarningMessage = '';
    
      getData() {
        this.dataService
          .getLookupData( webApi.getBankingDetails ,true)
          .subscribe((data: any) => {
            if(data === undefined || data.length === 0){
              this.modalService.messageModal(this.addBankAccount, this.bankAccountWarningMessage).result.then((data: any) => {
                this.navigationService.goToAddNewBankAccount();
              });
            }
            this.dataLoaded = true;
            this.selectOptions.bankAccounts = data;
            this.selectOptions.prefferedBankAccount = data.find((result: any) =>  result.isPreferredBank);
          });
      }
    
      getTranslation() {
        this.translateService.get('resources.settings-importdashboard-paragraph-blockbankstatement').subscribe((res: string) => {
          this.blockTemplate = res;
        });
        this.translateService.get('resources.settings-import-bankstatement-label-dateformat').subscribe((res: string) => {
          this.dateFormatLabel = res;
        });
        this.translateService.get('resources.settings-importedcontacts-bankaccount-heading-addbankaccount').subscribe((res: string) => {
          this.addBankAccount = res;
        });
        this.translateService.get('resources.settings-importedcontacts-bankaccount-warningmessage').subscribe((res: string) => {
          this.bankAccountWarningMessage = res;
        });
      }
}
