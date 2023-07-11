import { Component } from "@angular/core";
import { VatService } from "packages/shared-lib/src/lib/services/vat.service";
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { Router } from "@angular/router";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { BusinessCashDataService } from "packages/shared-lib/src/lib/services/business-cash-data.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import Enumerable from 'linq';


@Component({
  selector: "web-add-business-cash",
  templateUrl: "./add-business-cash.component.html",
})
export class AddBusinessCashComponent {
  placeHolderDate= webConstants.datePlaceHolderMessage
  allocation: any
  vatInfo: {
    showVat?: any,
    vatRate?: any,
    isVatRegistered?: any,

  }={};
  isVatRegistered: any;
  staffMember:any= '';
  calcVat: any;
  params:any= { modalTitle:"", contactRelationshipTypes: {}, contactRelationshipType: {} }
  pleaseSelectAnOption: any;
  enterTotal: any;
  whospentmoney: any;
  whoreceivedmoney: any;
customerInvoice: any={};
  constructor(
    private vatService: VatService,
    private lookupdataService: LookupDataService,
    private dataService: DataService,
    private modalService: ModalService,
    private router: Router,
    private messagingService: MessagingService,
    private businessCashDataService: BusinessCashDataService,
    private translateService: TranslateService,
    private notificationBarService: NotificationBarService,
    private navigationService: NavigationService,
    private dateService: DateService,
  ) { }
  businessCash: {
    item ?: any
    allocations ?:any
    ledgerAccount ?:any
    items ?:any
  } = {item:
    {exclusiveAmount:0,vatAmount:0},
     ledgerAccount:'', items:[]};
  showVat = false;
  vatRate = 0;
  splitItems = false;
  enableSaveButton = false;
  message:any
  staffMembers = [];
  ledgerAccounts = [];
  filteredLedgerAccounts = [];
  moneyInLedgerAccounts = [];
  moneyOutLedgerAccounts = [];
  contactRelationshipTypes: any = {}; //was declared as an array
  businessCashItemTypes: any = {}; //was delcared as an array
  i:any
  addStaffMember = '';
  addStaffMemberMessage = '';
  customer = '';
  supplier = '';
  confirmAddNewAccount = '';
  confirmDelete = '';
  oldVatDate = null;
  result:any
  blankItem = { description: '', ledgerAccount:'' };
  //Datepicker
  openedStart = false;
  openedEnd = false;
  dateOptions = {
    'show-weeks': false
  };

  businessCashDateChanged() {
    if (this.VatDateHasActuallyChanged(this.oldVatDate, this.businessCash.item.dateTime)) {
      if (this.oldVatDate === null || this.vatService.isStandardVatAmount(this.vatInfo, this.oldVatDate, this.businessCash.item.exclusiveAmount, this.businessCash.item.vatAmount)) {
        this.oldVatDate = this.businessCash.item.dateTime;

        //only re-calculate VAT if date has actually changed AND vat was standard Vat prior to the vat date change
        this.vatRate = this.vatService.getVatRate(this.vatInfo, this.businessCash.item.dateTime);
        if (this.splitItems) {
          for ( this.i = 0; this.i < this.businessCash.allocations.length; this.i++) {
            this.calculateSplitVat(this.businessCash.allocations[this.i]);
          }
        } else {
          this.calculateVat();
        }
      }
    }

  }

  VatDateHasActuallyChanged(currentDate: any, newDate: any) {

    if ((currentDate === null && newDate === null) || currentDate === newDate) return false;
    if ((currentDate === null && newDate !== null) || currentDate !== newDate) return true;
    return 
  }


  getData(refresh: boolean) {
    this.dataService.getLookupData(webApi.vatInfo, true).subscribe((response: any) => {
      this.vatInfo = response
      this.showVat = this.vatInfo.showVat;
      this.vatRate = this.vatInfo.vatRate;
      this.isVatRegistered = this.vatInfo.isVatRegistered;
    })

    this.dataService.getLookupData(webApi.currentlyemployedstaffmembers, true).subscribe((response: any) => {
      this.staffMembers = response
      if(response.length===0){
       this.hasAdditionalInfo()
      }
    })

    this.dataService.getLookupData(webApi.businesscashledgeraccounts, true).subscribe((response: any) => {
      this.ledgerAccounts = response
      this.moneyInLedgerAccounts = Enumerable.from(this.ledgerAccounts)
      .where((c: any) => { return c.isMoneyIn && c.isAllowed; }).toArray();
    this.moneyOutLedgerAccounts = Enumerable.from(this.ledgerAccounts)
      .where((c: any) => { return c.isMoneyOut && c.isAllowed; }).toArray();

    })

    this.dataService.getLookupData(webApi.contactRelationshipTypeFilePath, refresh).subscribe((response: any) => {
      this.contactRelationshipTypes = response
    })

    this.dataService.getLookupData(webApi.businessCashItemTypes, refresh).subscribe((response: any) => {
      this.businessCashItemTypes = response
    })
  }

  isAllocatedAmountZero() {
    if (!this.splitItems) {//Functions must only be called when in split mode
      return false;
    }

    if (this.businessCash != null && this.businessCash.allocations != null) {
       this.result = Enumerable.from(this.businessCash.allocations)
        .where((c: any) => { return c.total == 0; }).toArray().length > 0;
      return this.result;
    }
    return false;
  }

  hasAdditionalInfo() {
    if (this.staffMembers == undefined || this.staffMembers.length == 0) {

      this.modalService.messageModal(this.addStaffMember, this.addStaffMemberMessage).result.then(
        () => {
          this.router.navigate(['/staff/staffdetails/0'])
        });
      return false;
    }
    return true;
  }

  accountChange(item: any, ledgerAccount: any) {

    if (ledgerAccount == "") return;

    if (ledgerAccount.isVatable) {
       this.calcVat = (this.showVat && ledgerAccount.isVatable);
      item.vatAmount = this.vatService.calculateVatFromInclusive(this.calcVat, this.vatRate, item.total);
      item.vatAmount=Number.isNaN(item.vatAmount)?0:item.vatAmount;
      item.exclusiveAmount = item.total?(item.total - item.vatAmount):item.vatAmount;

    } 
    else {
      item.vatAmount = 0;
      item.exclusiveAmount = item.total;
    }

     this.params = {
      modalTitle: "",
      contactRelationshipTypes: this.contactRelationshipTypes,
      contactRelationshipType: {}
    };

    if (ledgerAccount.isDebtorsControlAccount) {
      this.params.modalTitle = this.customer;
      this.params.contactRelationshipType = this.contactRelationshipTypes.customer;
      this.showInvoiceRequiredInfoModal(item, this.params);
    } 
    
    else if (ledgerAccount.isCreditorsControlAccount) {
      this.params.modalTitle = this.supplier;
      this.params.contactRelationshipType = this.contactRelationshipTypes.supplier;
      this.showInvoiceRequiredInfoModal(item, this.params);
    } 
    
    else if (ledgerAccount.isDebtorsControlOpeningBalance) {
      this.params.modalTitle = this.customer;
      this.params.contactRelationshipType = this.contactRelationshipTypes.customer;
      this.showOpeningBalanceRequiredInfoModal(item, this.params);
    }

    else if (ledgerAccount.isCreditorsControlOpeningBalance) {
      this.params.modalTitle = this.supplier;
      this.params.contactRelationshipType = this.contactRelationshipTypes.supplier;
      this.showOpeningBalanceRequiredInfoModal(item, this.params);
    }

    else if (ledgerAccount.isDebtorsControlRefundGiven) {
      this.params.modalTitle = this.customer;
      this.params.contactRelationshipType = this.contactRelationshipTypes.customer;
      this.showCreditNoteRequiredInfoModal(item, this.params);
    }

    else if (ledgerAccount.isAddNew) {

       this.message = this.confirmAddNewAccount + '?';
      this.modalService.questionModal(ledgerAccount.customDisplayName, this.message).result.then(
        () => {
          switch (ledgerAccount.displayName) {
            case 'MembersAddNew':
              this.router.navigate(['/finance/ownersmoney'])
              break;
            case 'LoanAddNew':
              this.router.navigate(['/finance/businessloans'])
              break;
            case 'BankAccountAddNew':
              this.router.navigate(['/settings/companyprofile'])
              break;
            case 'CustomAccountAddNew':
              this.router.navigate(['/accountant/customledgeraccounts'])
              break;
            default:
          }

        },
      )
    }
  }

  showInvoiceRequiredInfoModal(item: any, params: any) {
    this.modalService.addInvoiceRequiredInfoModal(params).result.then(
      (requiredInfo: any) => {
        item.requiredInfo = requiredInfo;
      },
      () => {
        this.businessCash.ledgerAccount = "";
        item.ledgerAccount = "";
      });
  }

  showOpeningBalanceRequiredInfoModal(item: any, params: any) {
    this.modalService.addOpeningBalanceRequiredInfoModal(params).result.then(
      (requiredInfo: any) => {
        item.requiredInfo = requiredInfo;
      },
      () => {
        this.businessCash.ledgerAccount = "";
        item.ledgerAccount = "";
      });
  }

  showCreditNoteRequiredInfoModal(item: any, params: any) {
    this.modalService.addCreditNoteRequiredInfoModal(params).result.then(
      (requiredInfo: any) => {
        item.requiredInfo = requiredInfo;
      },
      () => {
        this.businessCash.ledgerAccount = "";
        item.ledgerAccount = "";
      });
  }

  directionChange(value: any) {

    if (value == this.businessCashItemTypes.outOfBusinessCash) {

      this.filteredLedgerAccounts = this.moneyOutLedgerAccounts;
    } else if (value == this.businessCashItemTypes.intoBusinessCash) {
      this.filteredLedgerAccounts = this.moneyInLedgerAccounts;
    }
    if(!this.filteredLedgerAccounts.find((elem:any) => elem.id == this.businessCash.ledgerAccount.id))
      this.businessCash.ledgerAccount=''
  }

  splitItemsChange() {
    //clear the items 
    this.businessCash.allocations =[];

    if (this.splitItems) {
      this.businessCash.allocations.push({ ...this.blankItem });
      this.businessCash.allocations.push({ ...this.blankItem });
    }
  }

  addSplitRow() {
    this.businessCash.allocations.push({ ...this.blankItem });
  }

  removeSplitItem(item: any, index: any) {

    this.modalService.confirmDelete(this.confirmDelete + item.description + '?').result.then(
      () => {

        this.businessCash.allocations.splice(index, 1);
      });
    
  }

  save(businessCash: any, form: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!form.invalid) {
      // this.enableSaveButton = true;

      this.hydrateModels();

      this.dataService.post(webApi.saveBusinessCash, businessCash).subscribe((result) => {
        this.translateService.setDefaultLang('en')
        this.translateService.use('en')
        this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: any) => {
          this.notificationBarService.success(msg);
        });

        this.dataService.invalidateRouteCache(webApi.getBusinessCashRoute)
        this.dataService.invalidateRouteCache(webApi.getInvoiceOutRoute)
        this.navigationService.goToBusinessCash();
      });
    }
  }

  cancel() {
    this.navigationService.goToBusinessCash();
  }

  hydrateModels() {
    //Business Cash Item
    this.businessCash.item.dateTime = this.dateService.getFormattedDateForWebApi(this.businessCash.item.dateTime);
    this.businessCash.item.staffId = this.staffMember.key;
    this.businessCash.item.isDeleted = false;
    this.businessCash.item.allocations = [];
    this.businessCash.items.length = 0;

    if (this.splitItems) {
      this.hydrateSplitModel();
    } else {
      this.hydrateSingleModel();
    }
  }

  hydrateSingleModel() {
    //Business Cash Item Allocation
    this.allocation = {
      exclusiveAmount: this.businessCash.item.exclusiveAmount,
      vatAmount: this.businessCash.item.vatAmount,
      description: this.businessCash.item.description,
      allocationType: this.businessCash.item.businessCashItemType == this.businessCashItemTypes.outOfBusinessCash ? this.businessCash.ledgerAccount.moneyOutAllocationTypeId : this.businessCash.ledgerAccount.moneyInAllocationTypeId,
      ledgerAccountId: this.businessCash.ledgerAccount.id,
      dateTime: this.businessCash.item.dateTime,
      loanAccountId: this.businessCash.ledgerAccount.loanAccountId,
      isDeleted: false
    };

    //Debtors or Creditors
    if (this.businessCash.item.requiredInfo != null && this.businessCash.item.requiredInfo != undefined) {
      this.allocation.contactId = this.businessCash.item.requiredInfo.contactId;
      this.allocation.invoiceOutId = this.businessCash.item.requiredInfo.invoiceOutId;
      this.allocation.invoiceInId = this.businessCash.item.requiredInfo.invoiceInId;
      this.allocation.creditNoteId = this.businessCash.item.requiredInfo.creditNoteId;
    }

    this.businessCash.item.allocations.push(this.allocation);
    this.businessCash.items.push(this.businessCash.item);
  }

  hydrateSplitModel() {
    //Business Cash Item Allocations
    this.businessCash.allocations.forEach((value: any, key: any) => {
      value.allocationType = this.businessCash.item.businessCashItemType == this.businessCashItemTypes.outOfBusinessCash ? value.ledgerAccount.moneyOutAllocationTypeId : value.ledgerAccount.moneyInAllocationTypeId;
      value.ledgerAccountId = value.ledgerAccount.id;
      value.dateTime = this.businessCash.item.dateTime;
      value.loanAccountId = value.ledgerAccount.loanAccountId;
      value.isDeleted = false;

      //Debtors or Creditors
      if (value.requiredInfo != null && value.requiredInfo != undefined) {
        value.contactId = value.requiredInfo.contactId;
        value.invoiceOutId = value.requiredInfo.invoiceOutId;
        value.invoiceInId = value.requiredInfo.invoiceInId;
        value.creditNoteId = value.requiredInfo.creditNoteId;
        this.businessCash.item.contactId = value.requiredInfo.contactId;
      }
      this.businessCash.item.allocations.push(value);
    });
    this.businessCash.items.push(this.businessCash.item);
  }

  calculateVat() {
    if (this.showVat && !this.isVatRegistered) {
      this.businessCash.item.vatAmount = 0;
    } else {
       this.calcVat = (this.showVat && this.businessCash.ledgerAccount.isVatable);
      this.businessCash.item.vatAmount = this.vatService.calculateVatFromInclusive(this.calcVat, this.vatRate, this.businessCash.item.total);
      this.businessCash.item.vatAmount = Number.isNaN(this.businessCash.item.vatAmount)?0:this.businessCash.item.vatAmount;
    }
    this.calculateExclusiveAmount();
  }

  calculateExclusiveAmount() {
    this.businessCash.item.exclusiveAmount = this.businessCash.item.total - this.businessCash.item.vatAmount;
  }

  calculateSplitVat(item: any) {

    if (item.ledgerAccount.isVatable) {
      item.vatAmount = this.vatService.calculateVatFromInclusive(this.isVatRegistered, this.vatRate, item.total);
    } else {
      item.vatAmount = 0;
    }
    this.calculateSplitExclusiveAmount(item);
  }

  calculateSplitExclusiveAmount(item: any) {
    item.exclusiveAmount = item.total - item.vatAmount;
  }

  // enablesaveButton( args: any) {
  //   this.enableSaveButton = false;
  // }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')

    this.translateService.get('resources.finance-businesscash-addbusinesscash-addstaffmember-heading-addstaffmember').subscribe((msg) => {
      this.addStaffMember = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-addstaffmember-message').subscribe((msg) => {
      this.addStaffMemberMessage = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-customer').subscribe((msg) => {
      this.customer = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-supplier').subscribe((msg) => {
      this.supplier = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-confirmaddnewaccount').subscribe((msg) => {
      this.confirmAddNewAccount = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-confirmdeletemessage').subscribe((msg) => {
      this.confirmDelete = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-pleaseselectanoption').subscribe((msg) => {
      this.pleaseSelectAnOption = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-entertotal').subscribe((msg) => {
      this.enterTotal = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-label-whospentmoney').subscribe((msg) => {
      this.whospentmoney = msg;
    });

    this.translateService.get('resources.finance-businesscash-addbusinesscash-label-whoreceivedmoney').subscribe((msg) => {
      this.whoreceivedmoney = msg;
    });

  }


  ngOnInit() {
    this.initTranslation();
    this.getData(true);
    // this.messagingService.listenGlobalErrorEvent(this.enablesaveButton);
    // this.messagingService.listenGlobalWarningEvent(this.enablesaveButton);
  }

}
