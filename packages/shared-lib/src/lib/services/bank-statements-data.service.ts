import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { NotificationBarService } from './notification-bar.service';

@Injectable({
  providedIn: 'root'
})
export class BankStatementsDataService {

  constructor(private dataService : DataService, private notificationBarService:NotificationBarService) { }


  getByMonth = (refresh:boolean) =>{
      return this.dataService.getLookupData('/api/bankstatementsbymonth', refresh);
  };

  getByUpload = (refresh:boolean) => {
      return this.dataService.getLookupData('/api/bankstatementsbyupload', refresh);
  };

  getByMonthAllocations = (accountId:string, year:string, month:string, refresh:any) => {
      return this.dataService.getLookupData('/api/bankstatementbymonth/' + accountId + '/' + year + '/' + month, refresh);
  };
//TODO - dataService getReport 
//   getByMonthAllocationsPdf = (accountId:string, year:string, month:string) => {
//       return this.dataService.getReport('/api/pdf/bankstatementbymonth/' + accountId + '/' + year + '/' + month);
//   };

  getByUploadAllocations = (bankStatementId:string, refresh:boolean) => {
      return this.dataService.getLookupData('/api/bankstatementbyupload/' + bankStatementId, refresh);
  };
//TODO - dataService getReport 
//   getByUploadAllocationsPdf = (bankStatementId:string) => {
//       return this.dataService.getReport('/api/pdf/bankstatementbyupload/' + bankStatementId);
//   };

  getBankStatementsWithUnallocatedItems = (refresh:boolean) => {
      return this.dataService.getLookupData('/api/bankstatementswithunallocateditems', refresh);
  };

  // TODO - to check if null should be passed
  // getBankStatementWithUnallocatedItems = (bankStatementId:string, refresh:boolean, dataOperations:any, filterFn:any) => {
  //     return this.dataService.getData('/api/bankstatementwithunallocateditems/' + bankStatementId, refresh, dataOperations, filterFn);
  // };

//TODO getFileUploaderInstanceWithData and NotificationBarService.error
//   getBankStatementFileUploaderInstance = () => {
//       var uploader = this.dataService.getFileUploaderInstanceWithData('/api/post/BankStatementUpload');

//       uploader.autoUpload = false;
//       uploader.removeAfterUpload = true;
//       uploader.queueLimit = 1;
//       uploader.filters.push({
//           name: 'bankStatementFilter',
//           fn: function (item:any, options:any) {
//               var fileExtension = '|' + item.name.slice(item.name.lastIndexOf('.') + 1) + '|';
//               var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
//               //OFX file type is blank for some reason so we fall back onto the file extension
//               var result = ('|vnd.ms-excel|csv|ofx|'.indexOf(type) !== -1 || '|csv|ofx|'.indexOf(fileExtension) !== -1);

//               if (!result) {
//                   NotificationBarService.error("The file being uploaded needs to be of type OFX or CSV Format (csv, ofx)");
//                   return result;
//               }


//               result = item.size < 4194304; //4MB

//               if (!result) {
//                   NotificationBarService.error("The file being uploaded can't be more than 4MB");
//                   return result;
//               }

//               result = this.queue.length < 1;

//               return result;
//           }
//       });

//       return uploader;
//   };

  getBankStatementLedgerAccounts = (refresh:boolean) => {
      return this.dataService.getLookupData('/api/bankstatement/ledgeraccounts', refresh);
  }

  saveBankStatement = (bankStatement:any) => {

      const modal = {BankStatementItemSaveViewModels: bankStatement}

      return this.dataService.post('/api/bankstatement/save', modal);
  }

  deleteBankStatement = (bankStatementId:string) => {
      return this.dataService.post('/api/delete/bankStatement/' + bankStatementId);
  }

  deleteUnallocatedBankStatementItem = (bankStatementId:any, itemId:any) => {
      return this.dataService.post('/api/bankstatementitem/delete', { bankStatementId: bankStatementId, itemId: itemId });
  }
}
