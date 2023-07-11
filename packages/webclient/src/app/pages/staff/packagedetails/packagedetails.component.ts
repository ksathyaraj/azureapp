import { Component } from "@angular/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service'
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import Enumerable from 'linq';
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
  selector: "web-packagedetails",
  templateUrl: "./packagedetails.component.html",
  styleUrls: ["./packagedetails.component.scss"],
})
export class PackagedetailsComponent {
  staffId!: any;
  packagedetails: any;
  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private messagingService: MessagingService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.staffId = params['id'];
    });
  }

  supportVideoBaseUrl = webConstants.packageDetailsURL;
  savesuccessmessage = '';
  receivedItemConfirmDeleteMessage = '';
  contributionsItemConfirmDeleteMessage = '';
  confirmDeleteWithAmount = '';
  enableSaveButton = false;

  getData(refresh?: any) {
    this.dataService.getRecord(webApi.staffApi + this.staffId + webApi.packageDetails, refresh).subscribe((result: any) => {
      this.packagedetails = result;
      this.sortgeneratedAllowanceItems();
    })
  }
  sortgeneratedAllowanceItems(){
    this.packagedetails.generatedAllowanceItems = this.packagedetails.generatedAllowanceItems.sort((a: any, b:any) => {
      return a.amount < b.amount ? 1:-1;
    });
  }

  tabData: tabData[] = [
    { routerLink: '../', header: 'resources.staff-staffdetails-staffrecorddetail-tabheading-staff' },
    { routerLink: 'packagedetails', header: 'resources.staff-staffdetails-packagedetails-tabheading-packagedetails', isActive: true }
  ];

  sumItems(items: any) {
    return Enumerable
      .from(items)
      .where((i: any) => { return !isNaN(i.amount); })
      .sum((i: any) => { return i.amount; });
  }

  save(packagedetails: any, frm: any) {
    if (!frm.invalid) {
      this.enableSaveButton = true;
      this.dataService.post(webApi.staffApi + this.staffId + webApi.savePackageDetails, packagedetails).subscribe(() => {
        this.enableSaveButton = false;
        this.getData(true);
        this.notificationBarService.success(this.savesuccessmessage)
      });
    }
  }

  addCustomDeductionModal() {
    this.modalService.openStaffPackageDetailsCustomItemModal({}).result.then((item: any) => {
      this.packagedetails.customDeductionItems.push(item);
      this.calcTotals();
    });
  }
  addCustomIncomeModal() {
    this.modalService.openStaffPackageDetailsCustomItemModal({}).result.then((item: any) => {
      this.packagedetails.customAllowanceItems.push(item);
      this.calcTotals();
    });
  }

  editCustomDeductionModal(item: any) {
    this.modalService.openStaffPackageDetailsCustomItemModal(item).result.then((result: any) => {
      item.amount = result.amount;
      item.description = result.description;
      this.calcTotals();
    });
  }
  editCustomIncomeModal(item: any) {
    this.modalService.openStaffPackageDetailsCustomItemModal(item).result.then((result: any) => {
      item.amount = result.amount;
      item.description = result.description;
      this.calcTotals();
    });
  }

  deleteCustomIncomeModal(item: any) {
    this.modalService.confirmDelete(this.receivedItemConfirmDeleteMessage + ' <strong>' + item.description + '</strong> ' + this.confirmDeleteWithAmount + ' : <strong>' + item.amount + '</strong>?')
      .result
      .then(() => {
        this.packagedetails.customAllowanceItems = this.packagedetails.customAllowanceItems.filter((el: any) => {
          return el.clientId !== item.clientId;
        });
        this.calcTotals();
      });
  }
  deleteCustomDeductionModal(item: any) {

    this.modalService.confirmDelete(this.contributionsItemConfirmDeleteMessage + ' <strong>' + item.description + '</strong> ' + this.confirmDeleteWithAmount + ' : <strong>' + item.amount + '</strong>?')
      .result
      .then(() => {
        this.packagedetails.customDeductionItems = this.packagedetails.customDeductionItems.filter((el: any) => {
          return el.clientId !== item.clientId;
        });
        this.calcTotals();
      });
  }

  calcTotals() {
    const generatedIncome = this.sumItems(this.packagedetails.generatedAllowanceItems);
    const generatedDeductions = this.sumItems(this.packagedetails.generatedDeductionItems);
    const customIncome = this.sumItems(this.packagedetails.customAllowanceItems);
    const customDeductions = this.sumItems(this.packagedetails.customDeductionItems);

    this.packagedetails.totalAllowances = generatedIncome + customIncome;
    this.packagedetails.totalDeductions = generatedDeductions + customDeductions;
    this.packagedetails.nettPay = this.packagedetails.totalAllowances - this.packagedetails.totalDeductions;
  }

  calcGeneratedItemAmount(item: any) {
    item.amount = item.rate * item.hours;
    this.calcTotals();
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.contacts-packagedetails-savesuccessmessage').subscribe((msg: any) => {
      this.savesuccessmessage = msg;
    });

    this.translateService.get('resources.staff-staffdetails-packagedetails-receiveditemconfirmdeletemessage').subscribe((msg: any) => {
      this.receivedItemConfirmDeleteMessage = msg;
    });

    this.translateService.get('resources.staff-staffdetails-packagedetails-contributionsitemconfirmdeletemessage').subscribe((msg: any) => {
      this.contributionsItemConfirmDeleteMessage = msg;
    });

    this.translateService.get('resources.staff-staffdetails-packagedetails-confirmdeletewithamount').subscribe((msg: any) => {
      this.confirmDeleteWithAmount = msg;
    });

  }

  enablesaveButton(args: any) {
    this.enableSaveButton = false;
  }

  activate() {
    this.initTranslation();
    if (this.staffId === 0) {
      this.navigationService.goToParentState();
    } else {
      this.getData();
    }
  }

  ngOnInit() {
    this.messagingService.listenGlobalErrorEvent(this.enablesaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enablesaveButton);
    this.activate();
  }

}
