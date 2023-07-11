import { HttpEventType } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { map } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { Column, api, helpPanelData, historicalBankSelectOptions } from "../../../interfaces/webclient.interface";
import { ModalService } from '../../../services/modal.service';
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";

@Component({
  selector: "lib-imports",
  templateUrl: "./imports.component.html",
  styleUrls: ["./imports.component.scss"],
})
export class ImportsComponent implements OnInit {
  constructor(private dataService: DataService, private translateService: TranslateService, private notificationService: NotificationBarService, private router: Router,private modalService:ModalService,private navigation: NavigationService) {

  }

  @Input() title = '';
  @Input() panelheading = '';
  @Input() helpPanelData: helpPanelData[] = [];
  @Input() blockTemplate = '';
  @Input() panelfooter = '';
  @Input() isthefirstrowaheader = '';
  @Input() api: api = {};
  @Input() tableColumns: Column[] = [];
  @Input() templatefilepath = '';
  @Input() lookupfilepath = '';
  @Input() smSelectOptions: historicalBankSelectOptions = {
    dateFormats: [],
    bankAccounts: [],
    prefferedBankAccount: {}
  };
  @Input() dateFormatLabel = '';
  @Input() smCurrentPage = -1;
  showProgressbar = false;
  tableData: any = [];
  firstRowIsHeader = this.smCurrentPage === 0 ? true : false;
  hasErrors = false;
  errorMessages = '';
  uploaderFileName = '';
  organisationDataClonedObj = [];
  progress = 0;
  downloadexampletemplate = '';
  lookupDownloadexampletemplate = '';
  successImportMessage = '';
  batchWarningMessage = '';
  importFailedMessage = '';
  saveSuccessMessage='';
  getApi = '';
  selectedDateFormat = '';
  selectedAccount = this.smSelectOptions.prefferedBankAccount;
  file: any;
  saveText = '';
  bankswarningmessage='';
  banks='';
  previewText = '';
  previewEnable = false;
  ignoreZeros = true;
  redirectToAllocate = false;
  selectedBankDetails = {
    bankStatementName: '',
    accountId: '',
    bankId: '',
  };

  ngOnInit() {
    this.firstRowIsHeader = this.smCurrentPage === 0 ? true : false;
    this.selectedAccount = this.smSelectOptions.prefferedBankAccount !== undefined ? this.smSelectOptions.prefferedBankAccount : "";
    this.getTranslation();
  }

  firstRowHeaderChanged() {
    if (this.firstRowIsHeader) {
        this.tableData.splice(0, 1);
    } else {
        this.tableData = JSON.parse(JSON.stringify(this.organisationDataClonedObj));
    }
  }
  showInfo(){
    this.modalService.messageModal(this.banks, this.bankswarningmessage);
  }
  save(param?: string) {
    const postApi = this.api.post !== undefined ? this.api.post : '';
    let fileData = {};
    const fileDetails = {
      name: this.file.name,
      length: this.file.size,
      type: this.file.type,
      data: 'Data'
    };
    if(this.smCurrentPage === -1) {
      fileData = this.tableData;
    }
    if(this.smCurrentPage === 0) {
      fileData = {
        fileViewModel: fileDetails,
        bankstatementItemImportViewModels: this.tableData,
        accountId: this.selectedBankDetails.accountId,
        bankStatementName: this.selectedBankDetails.bankStatementName,
        bankId: this.selectedBankDetails.bankId,
        dateFormat: this.selectedDateFormat
      };
    }
    if(this.smCurrentPage === 1) {
      fileData = {
        customerInvoiceImportItemViewModels: this.tableData,
        dateFormat: this.selectedDateFormat,
        fileViewModel: fileDetails
      };
    }
    this.dataService
      .post(postApi, fileData)
      .subscribe((response: any) => {
        if (response.isFailure) {
          this.errorMessages = response.htmlFormattedFailures;
          this.hasErrors = response.isFailure;
          window.scrollTo(0, document.body.scrollHeight);
        } else if (response.isSuccess) {
            this.notificationService.success(this.successImportMessage);
            this.router.navigateByUrl('/settings/import');
        } else {
          this.notificationService.success(this.successImportMessage);
          if(!param) {
            this.router.navigateByUrl('/settings/import');
          } else {
            this.router.navigateByUrl('/finance/bankaccounts/allocate/'+response+'/'+this.selectedBankDetails.accountId);
          }
        }
    });
  }

  dateFormatChange() {
    if(this.selectedDateFormat !== '' && this.file !== undefined) {
      this.previewEnable = true;
    }
  }

  preview() {
    this.getDataFromFile();
    this.previewEnable = false;
  }

  onFileSelected(event: any) {
    this.tableData = [];
    this.file = event?.target?.files[0];
    this.showProgressbar = true;
    this.uploaderFileName = this.file.name;
    if(this.smCurrentPage === -1){
      this.getDataFromFile();
    } else if(this.smCurrentPage === 0) {
      const selectedAccountData = this.smSelectOptions.bankAccounts.find((result: any) => result.id === this.selectedAccount.id);
      this.selectedBankDetails.bankStatementName = (selectedAccountData.bankName + '_' +
                    (selectedAccountData.accountNo > 5 ? selectedAccountData.accountNo.substring(0, 4) : selectedAccountData.accountNo)).substring(0,30);
      this.selectedBankDetails.accountId = selectedAccountData.ledgerAccountId
      this.selectedBankDetails.bankId = selectedAccountData.bankId;       
      if(this.selectedDateFormat !== '') { 
        this.previewEnable = true;
      }
    } 
    else if(this.smCurrentPage === 2) {
      const selectedAccountData = this.smSelectOptions.bankAccounts.find((result: any) => result.id === this.selectedAccount.id);
      this.selectedBankDetails.bankStatementName = (selectedAccountData.bankName + '_' +
                    (selectedAccountData.accountNo > 5 ? selectedAccountData.accountNo.substring(0, 4) : selectedAccountData.accountNo)).substring(0,30);
      this.selectedBankDetails.accountId = selectedAccountData.ledgerAccountId
      this.selectedBankDetails.bankId = selectedAccountData.bankId;
    } 
    else {
        if(this.selectedDateFormat !== '') { 
          this.previewEnable = true;
        }
    }
  }
  smOnYesNoClicked(optionSelected:string){
    if(optionSelected=="yes")this.redirectToAllocate = true;
    this.getDataFromFile();
  }

  getDataFromFile() {
    const fileUploadApi = this.api.getFileUploader !== undefined ? this.api.getFileUploader : '';
    if (this.file && this.file.size < 4194304) {
      const formData = new FormData();
      formData.append("file", this.file);
      if(this.smCurrentPage === 0 || this.smCurrentPage === 1) {
        formData.append("dateFormat", this.selectedDateFormat);
        formData.append("firstRowIsHeader", JSON.stringify(this.firstRowIsHeader));
      }
      if(this.smCurrentPage === 0) {
        formData.append("accountId", this.selectedBankDetails.accountId);
        formData.append("bankStatementName", this.selectedBankDetails.bankStatementName);
        formData.append("bankId", this.selectedBankDetails.bankId);
        formData.append("ignoreZeroValues", JSON.stringify(this.ignoreZeros));
      }
      else if(this.smCurrentPage === 2) {
        this.selectedBankDetails.bankStatementName = (this.selectedAccount.bankName + '_' +
                    (this.selectedAccount.accountNo > 5 ? this.selectedAccount.accountNo.substring(0, 4) : this.selectedAccount.accountNo)).substring(0,30);
        this.selectedBankDetails.accountId = this.selectedAccount.ledgerAccountId
        this.selectedBankDetails.bankId = this.selectedAccount.bankId;
        formData.append("accountId", this.selectedBankDetails.accountId);
        formData.append("bankStatementName", this.selectedBankDetails.bankStatementName);
        formData.append("bankId", this.selectedBankDetails.bankId);
      }
      this.dataService.getFileUploaderInstance(fileUploadApi, formData)
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            if (event.body.length > 1001) { 
              this.notificationService.warning(this.batchWarningMessage,'');
              return;
            }
            this.progress = 0;
            this.tableData = event.body;
            if(this.smCurrentPage === 0) this.tableData = event.body.bankStatementItemImportViewModels;
            if(this.smCurrentPage === 1) this.tableData = event.body.customerInvoiceImportItemViewModels;
            this.organisationDataClonedObj = JSON.parse(JSON.stringify(this.tableData));
            this.showProgressbar = false;
            if(this.smCurrentPage==2){
              this.notificationService.success(this.saveSuccessMessage);
              if(this.redirectToAllocate)this.navigation.goToBankStatementAllocations(event.body,this.selectedBankDetails.accountId);
              else this.navigation.goToDashboard();
            }
          }
        }),
        catchError((err: any) => {
          this.progress = 0;
          this.notificationService.warning(this.importFailedMessage,'');
          return throwError(() => err.message);
        })
      )
      .toPromise();
    } else {
      this.notificationService.warning("The file being uploaded can't be more than 4MB");
      return;
    }
  }

  handleAddNewClick() {
    this.router.navigateByUrl('/settings/bankingdetails/bankingdetail/0');
  }

  getTranslation() {
    if(this.blockTemplate){
      this.translateService.get(this.blockTemplate).subscribe((res: string) => {
        this.blockTemplate = res;
      });
    }
    if(this.dateFormatLabel) {
      this.translateService.get(this.dateFormatLabel).subscribe((res: string) => {
        this.dateFormatLabel = res;
      });
    }
    this.translateService.get('resources.settings-importdashboard-importfile-link-downloadexampletemplate').subscribe((res: string) => {
      this.downloadexampletemplate = res;
    });
    this.translateService.get('resources.settings-importdashboard-lookupfile-link-downloadexampletemplate').subscribe((res: string) => {
      this.lookupDownloadexampletemplate = res;
    });
    this.translateService.get('resources.common-validation-organisation-importsuccessful').subscribe((res: string) => {
      this.successImportMessage = res;
    });
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((res: string) => {
      this.saveSuccessMessage = res;
    });
    this.translateService.get('resources.common-validation-organisation-import-batchwarning').subscribe((res: string) => {
      this.batchWarningMessage = res;
    });
    this.translateService.get('resources.settings-importedcontacts-organisationcontacts-importfailederrormessage').subscribe((res: string) => {
      this.importFailedMessage = res;
    });
    this.translateService.get('resources.common-buttons-import-preview').subscribe((res: string) => {
      this.previewText = res;
    });
    this.translateService.get('resources.common-buttons-save').subscribe((res: string) => {
      this.saveText = res;
    });
    this.translateService.get('resources.settings-importedcontacts-banks-heading-banks').subscribe((msg)=> {
      this.banks = msg;
    });

    this.translateService.get('resources.settings-importedcontacts-banks-warningmessage').subscribe((msg)=> {
      this.bankswarningmessage = msg;
    });
  }
}
