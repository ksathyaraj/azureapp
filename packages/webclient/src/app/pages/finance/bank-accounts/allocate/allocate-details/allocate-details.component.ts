import { Component } from "@angular/core";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import Enumerable from "linq";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import {SimpleListScreenViewModelService} from 'packages/shared-lib/src/lib/services/simple-list-screen-view-model.service'
import BigNumber from "bignumber.js";

@Component({
  selector: "web-allocate-details",
  templateUrl: "./allocate-details.component.html",
  styleUrls: ["./allocate-details.component.scss"],
})
export class AllocateDetailsComponent {

  bankStatementId!: number;
  accountId!:number;
  constructor(private dataService : DataService,private modalService : ModalService,private messagingService : MessagingService,private translateService : TranslateService,
    private notificationBarService:NotificationBarService ,private router:Router, private activatedRoute: ActivatedRoute, private navigation: NavigationService,
    private vatService:VatService,public simpleListScreenViewModelService: SimpleListScreenViewModelService) {
        this.activatedRoute.params.subscribe(params => {
            this.bankStatementId = parseInt(params['id']);
            this.accountId = parseInt(params['accountId']);
        });

     }

  dataOperations:any={
    sortPredicate:'name',
    paging:{
      pageSize:10
    }
  };

  alphabetFilterAttributeName = 'name';

  hidePotentialDuplicates = false;
  frm:any= {};
  saveSuccessMessage = '';
  deleteSuccessMessage = '';
  deleteConfirmMessage = '';
  addAccConfimMessage = '';
  saveRequiredValidation = '';
  saveRequiredValidationMessage = '';
  blankItem = { reference: '', vat: 0, preVatAmount: 0, amount: 0,selectedLedgerAccount:'' };
  showSplitScreen = false;
  customer = '';
  supplier = '';
  duplicateMessage = '';
  modelHeading = '';
  deleteConfimationPotential = '';
  deleteWithAmount = '';
  allocateDataChanged='';
  accountDropdownPlaceholder='';
  data: {
        "bankStatementId"?: number;
        "id"?: number;
        "datePosted"?: string;
        "description"?: string;
        "amount"?: number;
        "preVatAmount"?: number;
        "vat"?: number;
        "isDuplicate"?: boolean;
        "ledgerActionType"?: number;
        "selectedLedgerAccount"?:any;
        "split"?:any;
        "isSplit"?:any;
        "allocations"?:any;
        "reference"?:any;
    }[]=[{}];
  ledgerAccounts:any;
  contactRelationshipTypes:any;
  ledgerActionType:any={};
  vatInfo:any={}
  fullCount=0;
  filteredCount=0;
  itemsEditted=false
  showVat=false;
  isVatRegistered=false;
  ledgerAccountMoneyIn:any=[];
  ledgerAccountMoneyOut:any=[];
  selectedBankStatementItem:any={}
  showErrorLabel=false;
  selectedDisplayBankStatementItem:any={}

  ngOnInit(){
    this.initTranslation();
    this.getData(true);
    this.messagingService.listenGlobalTranslationRefresh(()=> {
      this.initTranslation();
  });
  }
  initTranslation(){
      
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe( (msg:string) => {
          this.saveSuccessMessage = msg;
      });

      this.translateService.get('resources.common-messages-deletesuccessmessage').subscribe( (msg:string) => {
          this.deleteSuccessMessage = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocate-deleteconfirmmessage').subscribe( (msg:string) => {
          this.deleteConfirmMessage = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocatedetails-confimationaddaccountmessage').subscribe( (msg:string) => {
          this.addAccConfimMessage = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocatedetails-saverequiredvalidation').subscribe( (msg:string) => {
          this.saveRequiredValidation = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocatedetails-saverequiredvalidationmessage').subscribe( (msg:string) => {
          this.saveRequiredValidationMessage = msg;
      });
      this.translateService.get('resources.finance-businesscash-addbusinesscash-customer').subscribe( (msg:string) => {
          this.customer = msg;
      });

      this.translateService.get('resources.finance-businesscash-addbusinesscash-supplier').subscribe( (msg:string) => {
          this.supplier = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocate-deleteconfimationpotentialduplicate').subscribe( (msg:string) => {
          this.deleteConfimationPotential = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocate-deleteconfimationpotentialduplicatewithamount').subscribe( (msg:string) => {
          this.deleteWithAmount = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocatedetails-duplicatemessage').subscribe( (msg:string) => {
        this.duplicateMessage = msg;
      });

      this.translateService.get('resources.finance-bankaccounts-allocatedetails-potentialduplicates').subscribe( (msg:string) => {
        this.modelHeading = msg;
      });
      this.translateService.get('resources.finance-accountdropdown-placeholder').subscribe( (msg:string) => {
        this.accountDropdownPlaceholder = msg;
      });
      this.translateService.get('resources.bsallocate-datachanged-content').subscribe( (msg:string) => {
        msg = msg.replace("label-warning","text-bg-warning");
        msg = msg.replace("label-primary","text-bg-primary");
        msg = msg.replace("label","badge text-white");
        msg = msg.replace("label","badge text-white");
        this.allocateDataChanged = msg;

      });
  }

  duplicatesCountText () {
      if (this.data)
          return '(' + Enumerable.from(this.data).count((i:any) =>  { return i.isDuplicate === true; }) + ')';
      else {
          return '';
      }
  }

  duplicatesArePresent () {
      if (this.data)
          return Enumerable.from(this.data).count((i:any) =>  { return i.isDuplicate === true; }) > 0;
      else
          return false;
  }

  change (item:any) {
      if (item.reference || item.selectedLedgerAccount) {
          this.switchOnEditMode();
      }
  }

  undo () {
      this.dataService.getData(webApi.getBankStatementWithUnallocatedItems + this.bankStatementId, true, this.dataOperations, null).subscribe((response:any)=>{
        this.setTransactionDataonViewModel(response)
        this.switchOffEditMode();
      })
  }

  showDuplicateHelp () {
    this.modalService.messageModal(this.modelHeading, this.duplicateMessage);
  }

  deleteDuplicate  (o:any) {
      this.modalService.confirmDelete(this.deleteConfimationPotential + ' <strong>' + o.description + '</strong> ' + this.deleteWithAmount + ' <strong>' + o.amount + '</strong>?').result.then(()=> {
          this.dataService.post(webApi.deleteUnallocatedBankStatementItem, { bankStatementId: this.bankStatementId, itemId: o.itemId }).subscribe(()=>{
            this.notificationBarService.success(this.deleteSuccessMessage);
            this.data = this.data.filter((i:any) =>  { return i.id !== o.id; });
          })
      });
  }

  deleteUnallocatedItem  (o:any) {
      this.modalService.confirmDelete('Are you sure you want to delete the item with description: <strong>' + o.description + '</strong> and amount: <strong>' + o.amount + '</strong>?').result.then(()=> {
        this.dataService.post(webApi.deleteUnallocatedBankStatementItem, { bankStatementId: this.bankStatementId, itemId: o.itemId }).subscribe(()=>{
          this.notificationBarService.success(this.deleteSuccessMessage);
          this.data = this.data.filter((i:any) =>  { return i.id !== o.id; });
        })
      });

  }

  getData (refresh:boolean) {
      this.dataService.getData(webApi.getBankStatementWithUnallocatedItems + this.bankStatementId, refresh, this.dataOperations, null).subscribe((response:any)=>{
        this.setTransactionDataonViewModel(response);
      });
      this.dataService.getLookupData(webApi.getBankStatementLedgerAccounts, refresh).subscribe((response:any)=>{
        this.ledgerAccounts = response;
        this.init();
      })
      this.dataService.getLookupData(webApi.getContactRelationshipTypeEnums, refresh).subscribe((response:any)=>{
        this.contactRelationshipTypes = response;
      })
      this.dataService.getLookupData(webApi.getLedgerActionTypes, refresh).subscribe((response:any)=>{
        this.ledgerActionType = response;
      })
      this.dataService.getLookupData(webApi.getVatInfo, refresh).subscribe((response:any)=>{
        this.vatInfo = response;
      })
  }

  getTransactions (event:any,refresh?:boolean) {
      return this.dataService.getData(webApi.getBankStatementWithUnallocatedItems + this.bankStatementId, refresh?refresh:true, this.dataOperations, null).subscribe(this.setTransactionDataonViewModel)
  }

  setTransactionDataonViewModel(result:any) {
      this.data = result.pagedData;
      this.data.map((dataItem:any)=>{
        dataItem.selectedLedgerAccount = new String();
        return dataItem;
      })
      this.fullCount = result.dataCount;
      this.filteredCount = result.filteredDataCount;
  }
  recordCountDescription = () => {
    if (this.filteredCount || this.fullCount) {
        return '(' + this.filteredCount + ')';
    } else {
        return '';
    }
};
  switchOffEditMode() {
      this.itemsEditted = false;
  }

  switchOnEditMode() {
      this.itemsEditted = true;
  }

  init(){

      if (this.data.length <= 0) {//No items to allocate so return to parent sceern
          this.navigation.goToParentState();
      }

      this.showVat = this.vatInfo.showVat;
      this.isVatRegistered = this.vatInfo.isVatRegistered;
      this.ledgerAccountMoneyIn = Enumerable.from(this.ledgerAccounts)
              .where((c:any)=> {
                  return (c.isMoneyIn
                      && c.isAllowed)
                  && c.id != this.accountId;
              }).toArray();

      this.ledgerAccountMoneyOut = Enumerable.from(this.ledgerAccounts)
              .where((c:any)=> {
                return (c.isMoneyOut
                    && c.isAllowed)
                && c.id != this.accountId;
            }).toArray();
  }

  getAllocatedItems() {
      const filteredBankStatementItems = Enumerable.from(this.data).where( (c:any) => {
          return c.allocations != null
              || c.selectedLedgerAccount != '';
      }).toArray();

      return filteredBankStatementItems;
  }

  save (frm:any, saveSuccessfulCallBack?:any) {

      this.messagingService.broadcastCheckFormValidatity();
      if ((this.showSplitScreen && !this.isAllocatedAmountSameAsTotal()) || frm.invalid) {
          return false; //If invalid return out of function.
      }

      const bankStatementItemsToUpload: any = [];

      const filteredBankStatementItems:any = this.getAllocatedItems();
      filteredBankStatementItems.forEach( (bankStatementItem:any, key:any)=> {
          bankStatementItemsToUpload.push(this.createBankStatementItemModal(bankStatementItem));
      });
      const model :any= {}
      model["BankStatementItemSaveViewModels"] = bankStatementItemsToUpload;
      this.dataService.post(webApi.saveBankStatement, model).subscribe(()=>{
        if(saveSuccessfulCallBack){
          saveSuccessfulCallBack();
        }
        this.notificationBarService.success(this.saveSuccessMessage);
        this.dataService.invalidateRouteCache(webApi.getInvoiceOutRoute)
        setTimeout(() => {
          this.messagingService.broadcastCompanyProfileSaved({ hideOverlay: true });
        }, 2000);
        this.getData(true);
        this.switchOffEditMode();
      });
      return true;
  }

  createBankStatementItemModal(bankStatementItem:any) {
      const bankStatementItemModal:any = {
          Id: bankStatementItem.id,
          BankStatementId: bankStatementItem.bankStatementId,
          
      };
      bankStatementItemModal.Allocations=[]

      if (bankStatementItem.isSplit != null && bankStatementItem.isSplit) {
            
          bankStatementItem.allocations.forEach((allocation:any, key:any)=> {

              const singleAllocation:any = {
                  Amount: allocation.preVatAmount,
                  VatPortion: allocation.vat,
                  Description: bankStatementItem.description,
                  Reference: allocation.reference,
                  AllocationType: bankStatementItem.ledgerActionType == this.ledgerActionType.debit ? allocation.selectedLedgerAccount.moneyOutAllocationTypeId : allocation.selectedLedgerAccount.moneyInAllocationTypeId,
                  LedgerAccountId: allocation.selectedLedgerAccount.id,
                  IsCustomAccount: allocation.selectedLedgerAccount.isCustomAccount,
                  LoanAccountId: allocation.selectedLedgerAccount.loanAccountId,
                  BusinessCashId: allocation.selectedLedgerAccount.businessCashId,
                  IsMemberLoanAccount: allocation.selectedLedgerAccount.isMemberLoanAccount,
                  IsCompanyLoanAccount: allocation.selectedLedgerAccount.isCompanyLoanAccount,
                  IsDebtorsControlAccount: allocation.selectedLedgerAccount.isDebtorsControlAccount,
                  IsCreditorsControlAccount: allocation.selectedLedgerAccount.isCreditorsControlAccount,
                  IsDebtorsControlOpeningBalance: allocation.selectedLedgerAccount.isDebtorsControlOpeningBalance,
                  IsCreditorsControlOpeningBalance: allocation.selectedLedgerAccount.isCreditorsControlOpeningBalance,
                  IsDebtorsControlRefundGiven: allocation.selectedLedgerAccount.isDebtorsControlRefundGiven,
                  IsAskMyAccountant: allocation.selectedLedgerAccount.isAskMyAccountant,
                  IsBusinessCash: allocation.selectedLedgerAccount.isBusinessCash,
                  IsBankStatementableCustomLedgerAccount: allocation.selectedLedgerAccount.isBankStatementableCustomLedgerAccount,
                  LedgerActionType: bankStatementItem.ledgerActionType
              };
              if(allocation.requiredInfo !== null){
                singleAllocation.ContactId = allocation.requiredInfo.contactId;
                singleAllocation.CreditNoteId = allocation.requiredInfo.creditNoteId,
                singleAllocation.InvoiceInId = allocation.requiredInfo.invoiceInId,
                singleAllocation.InvoiceOutId = allocation.requiredInfo.invoiceOutId
              }

              bankStatementItemModal.Allocations.push(singleAllocation);
          });
          return bankStatementItemModal;
      } else {
          const singleAllocation:any = {
              Amount: bankStatementItem.preVatAmount,
              VatPortion: bankStatementItem.vat,
              Description: bankStatementItem.description,
              Reference: bankStatementItem.reference,
              AllocationType: bankStatementItem.ledgerActionType == this.ledgerActionType.debit ? bankStatementItem.selectedLedgerAccount.moneyOutAllocationTypeId : bankStatementItem.selectedLedgerAccount.moneyInAllocationTypeId,
              LedgerAccountId: bankStatementItem.selectedLedgerAccount.id,
              IsCustomAccount: bankStatementItem.selectedLedgerAccount.isCustomAccount,
              LoanAccountId: bankStatementItem.selectedLedgerAccount.loanAccountId,
              BusinessCashId: bankStatementItem.selectedLedgerAccount.businessCashId,
              IsMemberLoanAccount: bankStatementItem.selectedLedgerAccount.isMemberLoanAccount,
              IsCompanyLoanAccount: bankStatementItem.selectedLedgerAccount.isCompanyLoanAccount,
              IsDebtorsControlAccount: bankStatementItem.selectedLedgerAccount.isDebtorsControlAccount,
              IsCreditorsControlAccount: bankStatementItem.selectedLedgerAccount.isCreditorsControlAccount,
              IsDebtorsControlOpeningBalance: bankStatementItem.selectedLedgerAccount.isDebtorsControlOpeningBalance,
              IsCreditorsControlOpeningBalance: bankStatementItem.selectedLedgerAccount.isCreditorsControlOpeningBalance,
              IsDebtorsControlRefundGiven: bankStatementItem.selectedLedgerAccount.isDebtorsControlRefundGiven,
              IsAskMyAccountant: bankStatementItem.selectedLedgerAccount.isAskMyAccountant,
              IsBusinessCash: bankStatementItem.selectedLedgerAccount.isBusinessCash,
              IsBankStatementableCustomLedgerAccount: bankStatementItem.selectedLedgerAccount.isBankStatementableCustomLedgerAccount,
              LedgerActionType: bankStatementItem.ledgerActionType
             
          };
          if(bankStatementItem.requiredInfo != null){
            singleAllocation.ContactId = bankStatementItem.requiredInfo.contactId;
            singleAllocation.CreditNoteId = bankStatementItem.requiredInfo.creditNoteId;
            singleAllocation.InvoiceInId = bankStatementItem.requiredInfo.invoiceInId;
            singleAllocation.InvoiceOutId = bankStatementItem.requiredInfo.invoiceOutId;
          }

          bankStatementItemModal.Allocations.push(singleAllocation);
      }

      return bankStatementItemModal;
  }

  saveSplit (frm:any) {

      this.messagingService.broadcastCheckFormValidatity();

      if (this.haveSplitItemsContainZeroTotal()) {
          return false;
      }

      if (frm.invalid) {
          return false; //If invalid return out of function.
      }

      this.showSplitScreen = false;
      return true;
  }

  splitCancel () {
      this.selectedBankStatementItem.allocations = null;
      this.selectedBankStatementItem.isSplit = false;
      this.showSplitScreen = false;
  }

  vatAmountChange  (bankStatementItem:any,vat:number) {
      if (this.showVat && !this.isVatRegistered) {
          bankStatementItem.vat = 0;
          return;
      }
      if (vat >= 0) {
          bankStatementItem.preVatAmount = bankStatementItem.amount - vat;
      }
  }

  allocationTotal() {
      return Enumerable.from(this.selectedBankStatementItem.allocations)
              .sum((c:any)=> {
                  if (c.amount != null && c.amount!=0) {
                      return c.amount;
                  }
                  return 0;
              });
  }

  allocationAndSelectedBankStatementTotalDifference() {
      if (this.selectedBankStatementItem != null && this.selectedBankStatementItem.allocations != null) {
          const allocationsTotal = this.allocationTotal();

          const result = (this.selectedBankStatementItem.amount) - allocationsTotal;
          return new BigNumber(result).decimalPlaces(2).toNumber();
      }
      return 0;
  }

  haveSplitItemsContainZeroTotal () {
      const result = Enumerable.from(this.selectedBankStatementItem.allocations)
              .any((c:any)=>{
                  return c.amount === 0;
              });

      this.showErrorLabel = result;
      return result;
  }

  isAllocatedAmountSameAsTotal () {
      if (!this.showSplitScreen) {//Functions must only be called when in split mode
          return false;
      }

      return this.allocationAndSelectedBankStatementTotalDifference() == 0;
  }

  isAllocatedAmountLessThanTotal () {
      if (!this.showSplitScreen) {//Functions must only be called when in split mode
          return false;
      }
      return this.allocationAndSelectedBankStatementTotalDifference() < 0;
  }

  isAllocatedAmountLessThanOrEqualToTotal () {
      if (!this.showSplitScreen) {//Functions must only be called when in split mode
          return false;
      }

      return this.allocationAndSelectedBankStatementTotalDifference() <= 0;
  }

  amountChange  (allocationItem:any, selectedLedgerAccount:any) {
      if (!this.showSplitScreen) {//Functions must only be called when in split mode
          return;
      }

      this.haveSplitItemsContainZeroTotal();

      if (allocationItem.amount >= 0) {

          if (this.isAllocatedAmountLessThanTotal()) {
              return;
          }

          if (selectedLedgerAccount.isVatable) {
              console.log('amountChange:allocationItem.datePosted', this.selectedDisplayBankStatementItem.datePosted)
              const vatRate = this.vatService.getVatRate(this.vatInfo, this.selectedDisplayBankStatementItem.datePosted);
              allocationItem.vat = this.vatService.calculateVatFromInclusive(this.isVatRegistered, vatRate, allocationItem.amount);
          }
          allocationItem.preVatAmount =  allocationItem.amount - allocationItem.vat;

          this.displayBankStatementNewValues();
      }
  }

  displayBankStatementNewValues() {
      

      //New Display BankStatementDetails Values
      this.selectedDisplayBankStatementItem.amount = this.allocationAndSelectedBankStatementTotalDifference();

      const vatRate = this.vatService.getVatRate(this.vatInfo, this.selectedDisplayBankStatementItem.datePosted);
      this.selectedDisplayBankStatementItem.preVatAmount = this.vatService.calculateExclusiveAmount(this.isVatRegistered, this.selectedDisplayBankStatementItem.amount, vatRate);
      this.selectedDisplayBankStatementItem.vat = this.vatService.calculateVatFromInclusive(this.isVatRegistered, vatRate, this.selectedDisplayBankStatementItem.amount);
  }

  isSplitChange  (bankStatementItem:any) {
      bankStatementItem.invalid = false;
      //Force the reference field to be empty string if null
      if (bankStatementItem.reference == null && bankStatementItem.isSplit) {
          bankStatementItem.reference = '';
      }
      if (bankStatementItem.isSplit) {
        this.showSplitScreen = true;
        this.showErrorLabel = false; //Default the zero error label to not show.
        this.selectedDisplayBankStatementItem = {...bankStatementItem};
        this.selectedBankStatementItem = bankStatementItem;
        this.blankItem.reference = bankStatementItem.reference == '' ? bankStatementItem.reference : bankStatementItem.reference + ' - ';
        this.selectedBankStatementItem.allocations = [];
        this.selectedBankStatementItem.allocations.push({...this.blankItem});
        this.selectedBankStatementItem.allocations.push({...this.blankItem});
      } else {
          //Remove all allocation
          bankStatementItem.allocations = null;
      }

  }

  addSplitRow () {
    this.selectedBankStatementItem.allocations.push({...this.blankItem});
  }

  removeSplitItem  (item:any, index:any) {

      this.modalService.confirmDelete(this.deleteConfirmMessage + item.reference + '?').result.then(
          ()=> {

            this.selectedBankStatementItem.allocations.splice(index, 1);

              if (item.amount > 0) {
                this.selectedDisplayBankStatementItem.amount = this.selectedDisplayBankStatementItem.amount + item.amount;
                this.displayBankStatementNewValues();
              }
          }
          );
  }

  filteredledgerAccounts (ledgerActionType:any) {
      switch (ledgerActionType) {
          case this.ledgerActionType.debit:
              if (this.showSplitScreen) {//This removes the 'add new accounts' from the dropdown in split mode
                  return Enumerable.from(this.ledgerAccountMoneyOut)
                      .where( (c:any) => {
                          return !c.isAddNew;
                      }).toArray();
              } else {
                  return this.ledgerAccountMoneyOut;
              }
          case this.ledgerActionType.credit:
              if (this.showSplitScreen) {//This removes the 'add new accounts' from the dropdown in split mode
                  return Enumerable.from(this.ledgerAccountMoneyIn)
                      .where( (c:any) => {
                          return !c.isAddNew;
                      }).toArray();
              } else {
                  return this.ledgerAccountMoneyIn;
              }
          default:
              return null;
      }
  }

  ledgerAccountChange  (bankStatementSelectedItem:any, selectedLedgerAccount:any, datePosted:any,frm:any) {      

      if (selectedLedgerAccount ==='') return;

      this.change(bankStatementSelectedItem);

      if (selectedLedgerAccount.isVatable) {
          console.log('ledgerAccountChange:bankStatementSelectedItem.datePosted ', datePosted)
          const vatRate = this.vatService.getVatRate(this.vatInfo, datePosted);
          bankStatementSelectedItem.vat = this.vatService.calculateVatFromInclusive(this.isVatRegistered, vatRate, bankStatementSelectedItem.amount);
          bankStatementSelectedItem.preVatAmount = this.vatService.calculateExclusiveAmount(this.isVatRegistered, bankStatementSelectedItem.amount, vatRate);
      } else {

          bankStatementSelectedItem.preVatAmount = bankStatementSelectedItem.amount;
          bankStatementSelectedItem.vat = 0;
      }
      const params = {
          modalTitle: "",
          contactRelationshipTypes: this.contactRelationshipTypes,
          contactRelationshipType: {}
      };

      
      if (selectedLedgerAccount.isDebtorsControlAccount) {
          params.modalTitle = this.customer;
          params.contactRelationshipType = this.contactRelationshipTypes.customer;
          this.showInvoiceRequiredInfoModal(bankStatementSelectedItem, params);

      } else if (selectedLedgerAccount.isCreditorsControlAccount) {
          params.modalTitle = this.supplier;
          params.contactRelationshipType = this.contactRelationshipTypes.supplier;
          this.showInvoiceRequiredInfoModal(bankStatementSelectedItem, params);

      } else if (selectedLedgerAccount.isDebtorsControlOpeningBalance) {
          params.modalTitle = this.customer;
          params.contactRelationshipType = this.contactRelationshipTypes.customer;
          this.showOpeningBalanceRequiredInfoModal(bankStatementSelectedItem, params);

      }
      else if (selectedLedgerAccount.isCreditorsControlOpeningBalance) {
          params.modalTitle = this.supplier;
          params.contactRelationshipType = this.contactRelationshipTypes.supplier;
          this.showOpeningBalanceRequiredInfoModal(bankStatementSelectedItem, params);

      }
      else if (selectedLedgerAccount.isDebtorsControlRefundGiven) {
          params.modalTitle = this.customer;
          params.contactRelationshipType = this.contactRelationshipTypes.customer;
          this.showCreditNoteRequiredInfoModal(bankStatementSelectedItem, params);
      }
      else if (selectedLedgerAccount.isAddNew) {

          bankStatementSelectedItem.selectedLedgerAccount = new String();//This is nulled out because by selecting 'A new account to add' is causes validation which will stop them from saving and continue.

          const message = this.addAccConfimMessage;

          this.modalService.addNewAccountModal(selectedLedgerAccount.customDisplayName, message).result.then(
              ()=> {
                  switch (selectedLedgerAccount.displayName) {
                      case 'MembersAddNew':
                          if (this.saveAndContinue(frm,'/finance/ownersmoney') !== true) {
                              this.modalService.messageModal(this.saveRequiredValidation, this.saveRequiredValidationMessage);
                          }
                          break;
                      case 'LoanAddNew':
                          if (this.saveAndContinue(frm,'/finance/businessloans') !== true) {
                              this.modalService.messageModal(this.saveRequiredValidation, this.saveRequiredValidationMessage);
                          }
                          break;
                      case 'BankAccountAddNew':
                          if (this.saveAndContinue(frm,'/settings/companyprofile') !== true) {
                              this.modalService.messageModal(this.saveRequiredValidation, this.saveRequiredValidationMessage);
                          }
                          break;
                      case 'CustomAccountAddNew':
                          if (this.saveAndContinue(frm,'/accountant/customledgeraccounts') !== true) {
                              this.modalService.messageModal(this.saveRequiredValidation, this.saveRequiredValidationMessage + ".");
                          }
                          break;

                      default:
                  }

              },
              ()=>{return}
          );
      }
  }

  saveAndContinue(frm:any,redirectPath:any) {

     const filteredBankStatementItems = this.getAllocatedItems();
      if (filteredBankStatementItems.length <= 0) { //No items have been selected so no point trying to save. Just redirect
          this.router.navigateByUrl(redirectPath);
          return true;
      }
      if (this.save(frm, ()=> {
        this.router.navigateByUrl(redirectPath);
      })) {
          //DONT SHOW VALIDATION MODAL
          return true;
      } else {
          return false;
      }
  }

  showInvoiceRequiredInfoModal(item:any, params:any) {
        this.modalService.addInvoiceRequiredInfoModal(params).result.then(
           (requiredInfo:any)=> {
              item.requiredInfo = requiredInfo;
          },
              ()=> {
                  item.requiredInfo = null;
                  item.selectedLedgerAccount = '';
              });
  }

  showOpeningBalanceRequiredInfoModal(item:any, params:any) {
        this.modalService.addOpeningBalanceRequiredInfoModal(params).result.then(
          (requiredInfo:any)=> {
              item.requiredInfo = requiredInfo;

          },
              ()=> {
                  item.requiredInfo = null;
                  item.selectedLedgerAccount = '';
              });
  }

  showCreditNoteRequiredInfoModal(item:any, params:any) {
        this.modalService.addCreditNoteRequiredInfoModal(params).result.then(
          (requiredInfo:any)=> {
              item.requiredInfo = requiredInfo;

          },
            ()=> {
            item.requiredInfo = null;
            item.selectedLedgerAccount = '';
            });
  }
  
}


