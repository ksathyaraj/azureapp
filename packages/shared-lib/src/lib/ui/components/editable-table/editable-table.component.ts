import { Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import Enumerable from 'linq';
import { VatService } from "../../../services/vat.service";
import { TranslateService } from "@ngx-translate/core";
import { ModalService } from "../../../services/modal.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import * as moment from 'moment';
import { NgForm } from "@angular/forms";

@Component({
  selector: "lib-editable-table",
  templateUrl: "./editable-table.component.html",
  styleUrls: ["./editable-table.component.scss"]
})
export class EditableTableComponent implements OnChanges {

  constructor(
      private vatService:VatService,
      private translateService: TranslateService,
      private modalService:ModalService
  ){}

  @Input()
  vatInfo: any={};

  @Input()
  items: any=[]

  @Input()
  vatDate: any;
  
  @Input()
  disable: any;
  
  @Input()
  hideInterestItemBtn =false;
  
  @Input()
  productList: any;

  @Input()
  disabled: any;
  
  @Output() 
  itemDeleted = new EventEmitter<any>();
  
  @Output()
  itemSaved = new EventEmitter<any>();

  @Output()
  itemOnCreation = new EventEmitter<any>();

    vatOptionsManual=[
        {"display":"Standard VAT 15%","value":"STANDARD"},
        {"display":"No VAT","value":"NONE"},
        {"display":"Manual VAT","value":"MANUAL"}
    ]

    vatOptions=[
        {"display":"Standard VAT 15%","value":"STANDARD"},
        {"display":"No VAT","value":"NONE"}
    ]

    autoFillValues=[];

  baseConfig : any = {
      handle: ".handle",
      stop: (e:any, ui:any) => {
          this.items.forEach((value : any, key : any) => {
              value.displayOrder = key;
          });
      }
  };
  
  itemType: any = {
    salesItem: 0,
    discountItem: 1,
    interestItem: 2 
  }

  editMode=-1;
  itemEditMode: any;


  confirmDeleteMessage = "";
  maxLength = false; // init item to not be over maxLength
  descMaxLength = 200;
  itemMasterCopy : any = {};
//   selected = this.item.description;

  addSalesItem() {
    const salesItem = this.getGenericObject();
    salesItem.itemType = this.itemType.salesItem;
    salesItem.quantity = 0;
    salesItem.vat = 0;
    salesItem.priceListItemId = null;
    salesItem.editMode = true;
    this.itemOnCreation.emit(true)
    this.createItem(salesItem);
  }

  addDiscountItem() {
    const discountItem = this.getGenericObject();
    discountItem.itemType = this.itemType.discountItem;
    discountItem.displayQuantity = 'Discount';
    discountItem.vat = 0;
    discountItem.editMode = true;
    this.itemOnCreation.emit(true)
    this.createItem(discountItem);
  }

  addInterestItem() {
      const interestItem = {
        itemType : this.itemType.interestItem,
        displayQuantity : 'Interest'
      }
      this.createItem(interestItem);
      this.itemOnCreation.emit(true)
  }

  getGenericObject() : any {
      return {
          id: 0,
          description: '',
          unitPrice: 0,
          amount: 0,
          total: 0,
          displayOrder: this.getNewDisplayOrder(),
          isDeleted: false,
          vatType: this.vatInfo.isVatRegistered ? 'STANDARD' : 'NONE'
      };
  }

  getNewDisplayOrder() {
      if (this.items.length == 0) return 1;
      const maxDisplayOrder = Enumerable.from(this.items).max((c: any) => { return c.displayOrder });
      return maxDisplayOrder + 1;
  }

  createItem(item:any) {
      this.items.push(item);
      this.editMode=this.filterItems(this.items).length-1;
      console.log(item)
    //   this.checkIfItemNeedsToBeInEditMode();
    //   this.makeValuesNegativeIfDiscount();
  }

//   editableItemOnEditModeEvent(args:any) {
//       this.itemEditMode = args.editMode;
//   }

  isDisabled() {
      if (this.disable)
          return this.disable;
      return this.itemEditMode;
  }

  isFinalised() {
      if (this.itemEditMode)
          return false;
      return !this.disable;
  }

  ngOnInit() {
    // this.messagingService.listenEditableItemOnEditModeEvent(this.editableItemOnEditModeEvent);
    this.initTranslation();
  }

  ngOnChanges(){
    if(this.productList){
        this.autoFillValues=this.productList.map((el: { displayDescription: string })=>el.displayDescription) 
    }
  }

  handleModalChange(item:any){
     const selectedItem=this.productList&&this.productList.find((el: { displayDescription: string; })=> el.displayDescription===item)
     if(selectedItem){
        this.items[this.items.length-1].unitPrice=selectedItem.exclusiveAmount
     }
  }
  //editable-item

  delete(frm:NgForm,item:any) {
    console.log(frm)
    this.modalService.confirmDelete(this.confirmDeleteMessage + ': ' + item.description + '?').result.then(
         () => {
            item.isDeleted = true;
            this.itemDeleted.next(item)
            this.editMode=-1
            this.itemOnCreation.emit(false)
            // this.raiseOnItemDeleted();
        },
        () => { console.log('cancelled')});
}

edit(idx:number,item:any) {
    this.setEditMode(idx);
    this.makeValuesPositiveIfDiscount(item);
    // console.log(frm)
    // frm.resetForm(this.items[idx])
    // frm.resetForm()
    // this.copyItemOnEdit();
    this.itemMasterCopy=JSON.parse(JSON.stringify(this.items[idx]));
    this.itemOnCreation.emit(false)
}

save(item:any) {
    this.setEditMode(-1);
    this.makeValuesNegativeIfDiscount(item);
    // this.manipulateDescription();

    // this.raiseOnItemSaved();
    this.itemSaved.next(item)
    this.itemOnCreation.emit(false)
}

undo(idx:number) {
    Object.assign(this.items[idx], this.itemMasterCopy)
    // frm.resetForm(this.itemMasterCopy)
    // this.resetItemToMasterCopy();
}

// private manipulateDescription() { // This check is in place to see if they've just selected an item or they've selected an item but then edited it.
//     if (typeof this.selected === 'string' || this.selected instanceof String) { //selected is a string so they've edited item
//         this.item.description = this.selected;
//     } else {
//         this.item.description = this.selected.displayDescription; //selected is an object which means they haven't edited.
//     }
// }

// raiseOnItemSaved() { // Fire of event when Item is saved
//   this.itemSaved.next(this.item);
// }

//TODO
// raiseOnItemDeleted() { // Fire of event when Item is deleted
//     this.itemDeleted.next(this.item);

//     if (this.editMode) //If you deleted the item while being in edit mode then we need to fire the setEditMode to re-enabled all the other items
//         this.setEditMode(idx);
// }

calculateVat(item:any) {
    const vatRate = this.vatService.getVatRate(this.vatInfo, this.vatDate);

    if (item.itemType == this.itemType.interestItem) { // InterestItem doesn't have VAT so only calculate totals
        this.calculateSummary(item);
        return;
    }

    const quantity = this.isNumber(item.quantity) ? parseInt(item.quantity) : 0;
    const unitPrice = this.isNumber(item.unitPrice) ? parseInt(item.unitPrice) : 0.0;
    item.amount = item.itemType == this.itemType.discountItem ? unitPrice : this.vatService.roundToMoney(unitPrice * quantity); //Caters for discount & sales
    console.log('calculateVat', item.vatType, item);
    if (item.vatType === 'STANDARD') {
        item.vat = this.vatService.calculateVat(this.vatInfo.isVatRegistered, vatRate, item.amount);
    } else if (item.vatType === 'NONE') {
        item.vat = 0;
    }

    this.calculateSummary(item);
}

calculateSummary(item:any) {
    if (item.itemType == this.itemType.interestItem) {
        this.calculateInterestSummary(item);
        return;
    }

    // var quantity = isNumber(item.quantity) ? item.quantity : 0;
    // var exclusiveAmount = isNumber(item.unitPrice) ? item.unitPrice : 0.0;
    // var vatAmount = isNumber(item.vat) ? item.vat : 0.0;
    // item.amount = item.itemType == this.itemType.discountItem ? exclusiveAmount : exclusiveAmount * quantity; //Caters for discount & sales
    // item.vat = this.vatInfo.isVatRegistered ? vatAmount : 0; //Caters for discount & sales
    item.total = this.vatService.roundToMoney(item.amount + item.vat);
}

calculateInterestSummary(item:any) {
    const exclusiveAmount = this.isNumber(item.unitPrice) ? item.unitPrice : 0.0;

    item.amount = exclusiveAmount;
    item.vat = 0;
    item.total = item.amount;
}

isNumber(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

makeValuesPositiveIfDiscount(item:any) { //These functions are more for UI nicety. 
    if (item.itemType && item.itemType == this.itemType.discountItem) {
        item.unitPrice = Math.abs(item.unitPrice);
        item.amount = Math.abs(item.amount);
        item.vat = Math.abs(item.vat);
        item.total = Math.abs(item.total);
    }
}

makeValuesNegativeIfDiscount(item:any) { //These functions are more for UI nicety. 
    if (item.itemType && item.itemType == this.itemType.discountItem) {
        item.unitPrice = Math.abs(item.unitPrice) * -1;
        item.amount = Math.abs(item.amount) * -1;
        item.vat = Math.abs(item.vat) * -1;
        item.total = Math.abs(item.total) * -1;
    }
}

setEditMode(idx:number) { // This controlles if the item is in edit mode. It also broadcasts itself and the state it's going into. 
    this.editMode = idx;
}



onVatDateChangedEvent(args:any) {
    // if (this.VatDateHasActuallyChanged(this.vatDate, args) && this.vatService.isStandardVatAmount(this.vatInfo, this.vatDate, this.item.amount, this.item.vat)) {
    //     //only fire the calculateVat routine if the date has actually changed and the Vat is standard VAT (i.e. not zero or custom vat amount)
    //     this.vatDate = args;
    //     this.calculateVat();
    // }
}

VatDateHasActuallyChanged(currentDate:any, newDate:any) {
    //currentDate is going to be 1 of 4 formats (see below)
    //currentDate is an object: currentDateFormat = 'object'
    //currentDate is a moment: currentDateFormat = 'moment'
    //currentDate is 'DD/MM/YYYY': currentDateFormat = 'short'
    //currentDate is 'YYYY-MM-DDT00:00:00': currentDateFormat = 'long'
    const currentDateFormat = (currentDate._isAMomentObject === true) 
                                ? 'moment' 
                                : (typeof currentDate === 'object')
                                    ? 'object'
                                    : currentDate.contains('/') 
                                        ? 'short' 
                                        : 'long'; 
    const shortFormat = 'DD/MM/YYYY';

    const result = (currentDateFormat === 'short' && currentDate !== newDate.format(shortFormat)) ||
        (currentDateFormat === 'long' && currentDate !== newDate.format('YYYY-MM-DDTHH:mm:SS')) ||
        (currentDateFormat === 'moment' && currentDate.format(shortFormat) !== newDate.format(shortFormat)) ||
        (currentDateFormat === 'object' && moment(currentDate).format(shortFormat) !== newDate.format(shortFormat));

    return result;
}

// editableItemOnEditModeEvent(args:any) {
//     if (args.uniqueidentifier == this.item.$$hashKey) return; //This checks to see if the item that is broadcasting is itself. If it is itself no need to do anything

//     //Logic below is for items that didn't broadcast

//     //args.editMode = true - Item that broadcasted itself is in edit mode so disable yourself
//     //args.editMode = false - Item that broadcasted itself is not in edit mode so enable yourself
//     this.item.disable = args.editMode;
// }

// isDisabled() {
//     if (this.disable) // If this.disable is true then disable youself. If not check if item needs to be disabled.
//         return this.disable;
//     return this.item.disable;
// }

// productList = new Bloodhound({
//     datumTokenizer: function (d) {
//         return Bloodhound.tokenizers.whitespace(d.displayDescription);
//     },
//     queryTokenizer: Bloodhound.tokenizers.whitespace,
//     local: this.productList
// });

// // initialize the bloodhound suggestion engine
// productList.initialize();

// productListDataset = {
//     displayKey: 'displayDescription',
//     source: productList.ttAdapter(),
//     limit: 10
// };

// typeaheadOptions = {
//     highlight: true
// };

// $scope.$on('typeahead:select', function (evt) {
//     $scope.$apply(function () {
//         this.item.priceListItemId = this.selected.id;
//         this.item.unitPrice = this.selected.exclusiveAmount;
//         this.item.amount = this.selected.exclusiveAmount;
//         this.calculateVat();
//         checkIfSelectedOrWrittenIsToLong(descMaxLength);
//     });
// });

// $scope.$on('typeahead:change', function (evt) {
//     $scope.$apply(function () {
//         checkIfSelectedOrWrittenIsToLong(descMaxLength);
//     });
// });

// $scope.$on('typeahead:cursorchange', function (evt) {
//     $scope.$apply(function () {
//         checkIfSelectedOrWrittenIsToLong(descMaxLength);
//     });
// });

// checkIfSelectedOrWrittenIsToLong(length: number) { //We have to manually check for maxLength as maxLength attribute is not working with typeahead
    // if (this.selected) return;

    // this.maxLength = false;
    // // $scope.form.description.$setValidity("maxLength", true);

    // if (typeof this.selected === 'string' || this.selected instanceof String) {
    //     if (this.selected.length > length) {
    //         this.maxLength = true;
    //         // $scope.form.description.$setValidity("maxLength", false);
    //     }
    // } else {
    //     if (this.selected.displayDescription.length > length) {
    //         // $scope.form.description.$setValidity("maxLength", false);
    //         this.maxLength = true;
    //     }
    // }
// }

// checkIfItemNeedsToBeInEditMode() { //When an new item is added it needs to be in edit mode.
//     if (this.item.editMode)
//         this.setEditMode();
// }

copyItemOnEdit() { // Make copy of original object
    // this.itemMasterCopy = JSON.parse(JSON.stringify(this.item));
}

resetItemToMasterCopy() { // rest item to original state.
    // this.item=JSON.parse(JSON.stringify(this.itemMasterCopy));

    // this.selected = this.item.description;
}

notEdited(item:any) : boolean{ // Check to see if Item has changed
    return (this.itemMasterCopy.description === item.description) &&
     (this.itemMasterCopy.quantity === item.quantity) &&
     (this.itemMasterCopy.unitPrice === item.unitPrice) &&
     (this.itemMasterCopy.vatType === item.vatType) &&
     (this.itemMasterCopy.vatAmount === item.vatAmount) ;
}

initTranslation() {
    this.translateService.get('resources.finance-invoicing-customerinvoices-deleteconfirmmessage').subscribe((msg:string) => {
        this.confirmDeleteMessage = msg;
    });
}

filterItems(items:any[]){

    const filterFn = function (datum: any) { return !datum.isDeleted; }
    const newItems=Enumerable.from(items).where(filterFn).toArray();

    return newItems
}

drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
}

}
