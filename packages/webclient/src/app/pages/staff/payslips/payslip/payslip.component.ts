import { Component } from "@angular/core";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { Router } from "@angular/router";
import Enumerable from "linq";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { StaffDataService } from "packages/shared-lib/src/lib/services/staff-data.service"
@Component({
  selector: "web-payslip",
  templateUrl: "./payslip.component.html",
  styleUrls: ["./payslip.component.scss"],
})
export class PayslipComponent {
  payslipId!: number;
  payslip: any = {};
  item: any;
  isNew = false;
  isView = true;

  constructor(
    private staffDataService: StaffDataService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private messagingService: MessagingService,
    private notificationBarService: NotificationBarService,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private router: Router,
    private dataService: DataService

  ) {
    this.activatedRoute.params.subscribe(params => {
      this.payslipId = parseInt(params['id']);
      this.isNew = this.payslipId === 0;
      this.isView = this.payslipId !== 0;
    });
  }

  ngOnInit() {
    
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
    this.activate();

  }
  saveButton = false;
  supportVideoBaseUrl = webConstants.addPayslipVideoUrl;

  staffMemberHeading = '';
  staffMemberWarningMessage = '';
  receivedItemconfirmdeletemessage = '';
  contributionsConfirmDeleteMessage = '';
  confirmDeleteWithAmount = '';
  payslipHeading = '';
  payslipwarningmessage = '';
  payslipSuccessMessage = '';
  modalHeading = '';
  emailModelHeading = '';
  staffMembers: any;
  staff: any;
  i = 0;
  params = {};
  selectedStaffId = '';
  sortKey = 'sortOrder';

  searchUIOptions: searchUIOptions = {
    searchInput: false,
    alphabetFilter: false,
    dateRange: true
  };


  setPayslipAndStaff(payslipViewModel: any) {
    this.payslip = payslipViewModel;
    this.staff = payslipViewModel.staff;
    this.calcTotals();
  }
  sortItems() {
    this.payslip.allowanceItems.sort((a: any, b: any) => {
      if (a[this.sortKey] < b[this.sortKey]) {
        return -1;
      } else if (a[this.sortKey] > b[this.sortKey]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.payslip.deductionItems.sort((a: any, b: any) => {
      if (a[this.sortKey] < b[this.sortKey]) {
        return -1;
      } else if (a[this.sortKey] > b[this.sortKey]) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  fixCustomAllowanceItemHoursAndRate(payslip: any) {
    //for display purposes, we don't want to display hours and rate for custom items, 
    //custom items will always have hours and rates values of zero, so we swap out zeros for null
    //also because we're in view mode the generated items will always have values for hours and rate, 
    //we don't display zero items in view mode for generated items
    for (this.i = 0; this.i < payslip.allowanceItems.length; this.i++) {
      if (payslip.allowanceItems[this.i].hours === 0) payslip.allowanceItems[this.i].hours = null;
      if (payslip.allowanceItems[this.i].rate === 0) payslip.allowanceItems[this.i].rate = null;
    }
  }

  getData() {
    if (this.isNew) {
      this.dataService.getLookupData(webApi.getCurrentlyEmployedStaffMembers, true).subscribe((result: any) => {//These lookups mustn't be cached
        this.staffMembers = result;
        this.hasAdditionalInfo();
      });

    }
    if (this.isView) {
      this.dataService.getRecord(webApi.getPaySlipData + this.payslipId, false).subscribe((result) => {
        this.setPayslipAndStaff(result);
        this.fixCustomAllowanceItemHoursAndRate(this.payslip);
        this.sortItems();
      });
    }
  }


  emailPayslip(payslipId: any) {
    this.dataService.getReport(webApi.payslipsPDF + '/' + payslipId).then((pdfUrl) => {
        this.dataService.getRecord(webApi.payslipEmailDetail + '/' + payslipId)
            .subscribe((payslipResponses:any) => {
              const emaiDetails = {
                toEmailAddress: payslipResponses.toEmail,
                ccEmailAddress: '',
                fromEmailAddress: payslipResponses.fromEmail,
                subject: payslipResponses.payslipSubject,
                body: payslipResponses.payslipBody,
                id: payslipResponses.id,
                password: payslipResponses?.password
              };
              const params = { data: emaiDetails, pdfUrl: pdfUrl, emailType: this.emailModelHeading, isPayslip: true };
                this.modalService.genericEmailModal(params).result.then(
                    (data:any) => {
                      const emailConfirmationParams = {contactId: payslipResponses.contactId, unSavedEmailAddress: []};
                      this.modalService.emailConfirmationModal(emailConfirmationParams);
                    });
            });

    });
}

  hasAdditionalInfo() {
    if (this.staffMembers == undefined || this.staffMembers.length == 0) {
      this.modalService.messageModal(this.staffMemberHeading, this.staffMemberWarningMessage + ".").result.then(
        () => {
          this.router.navigate(['/staff/staffdetails/0']);
        });
    }
  }
  onStaffChanged(staffId: any) {
    this.dataService.getRecord(webApi.staffApiData + staffId + webApi.payslipApiData, false).subscribe((result: any) => {
      this.setPayslipAndStaff(result);
    });
  }

  print(payslipId: any) {
    this.dataService.getReport(webApi.payslipsPDF + payslipId).then( (dataUrl: any) => {
        this.modalService.openPdfReportModal(this.modalHeading, dataUrl);
    });
}

  addAllowanceItem() {
    this.modalService.openPayslipCustomItemModal({}).result.then((result: any) => {
      this.payslip.allowanceItems.push(result);
      this.calcTotals();
    });
  }

  addDeductionItem() {
    this.modalService.openPayslipCustomItemModal({}).result.then((result: any) => {
      this.payslip.deductionItems.push(result);
      this.calcTotals();
    });
  }


  editAllowanceItem(item?: any) {
    this.modalService.openPayslipCustomItemModal(item).result.then((result: any) => {
      item.amount = result.amount;
      item.description = result.description;
      this.calcTotals();
    });
  }

  editDeductionItem(item?: any) {
    this.modalService.openPayslipCustomItemModal(item).result.then((result: any) => {
      item.amount = result.amount;
      item.description = result.description;
      this.calcTotals();
    });
  }

  deleteAllowanceItem(item: any) {
    this.modalService.confirmDelete(this.receivedItemconfirmdeletemessage + ' <strong>' + item.description + '</strong> ' + this.confirmDeleteWithAmount + ' <strong>' + item.amount + '</strong>?')
      .result
      .then(() => {
        this.payslip.allowanceItems = this.payslip.allowanceItems.filter(function (el: any) { return item.clientId !== el.clientId; });
        this.calcTotals();
      });
  }

  deleteDeductionItem(item: any) {
    this.modalService.confirmDelete(this.contributionsConfirmDeleteMessage + ' <strong>' + item.description + '</strong> ' + this.confirmDeleteWithAmount + ' <strong>' + item.amount + '</strong>?')
      .result
      .then(() => {
        this.payslip.deductionItems = this.payslip.deductionItems.filter(function (el: any) { return item.clientId !== el.clientId; });
        this.calcTotals();
      });
  }

  save(payslip: any, frm: any) {
    this.messagingService.broadcastCheckFormValidatity();

    if (!frm.invalid) {
      this.saveButton = true;

      this.modalService.questionModal('Create Payslip', 'Once a payslip is created it cannot be edited, are you sure you want to create this payslip?').result.then(() => {
        this.payslip.staffId = this.selectedStaffId;
        this.staffDataService.savePayslip(payslip).subscribe(() => {
          this.staffDataService.clearPayslipsCache();
          this.navigationService.goToParentState();
          this.notificationBarService.success(this.payslipSuccessMessage);
        });
      });
    }
  }

  sumItems(items: any) {
    return Enumerable
      .from(items)
      .where((i: any) => { return !isNaN(i.amount); })
      .sum((i: any) => { return i.amount; });
  }

  calcTotals() {
    this.payslip.grossAmount = this.sumItems(this.payslip.allowanceItems);
    this.payslip.deductionAmount = this.sumItems(this.payslip.deductionItems);

    this.payslip.nettAmount = this.payslip.grossAmount - this.payslip.deductionAmount;
  }

  calcGeneratedItemAmount(item: any) {
    item.amount = item.rate * item.hours;
    this.calcTotals();
  }

  enableSaveButton(args: any) {
    this.saveButton = false;
  }

  initTranslation() {

    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.staff-payslips-addstaffmember-heading-addstaffmember').subscribe((msg: any) => {
      this.staffMemberHeading = msg;
    });

    this.translateService.get('resources.staff-payslips-addstaffmember-warningmessage').subscribe((msg: any) => {
      this.staffMemberWarningMessage = msg;
    });

    this.translateService.get('resources.staff-payslips-receiveditemconfirmdelete').subscribe((msg: any) => {
      this.receivedItemconfirmdeletemessage = msg;
    });

    this.translateService.get('resources.staff-payslips-contributionsconfirmdelete').subscribe((msg: any) => {
      this.contributionsConfirmDeleteMessage = msg;
    });

    this.translateService.get('resources.staff-payslips-confirmdeletewithamount').subscribe((msg: any) => {
      this.confirmDeleteWithAmount = msg;
    });

    this.translateService.get('resources.staff-payslips-createpayslip-heading-createpayslip').subscribe((msg: any) => {
      this.payslipHeading = msg;
    });

    this.translateService.get('resources.staff-payslips-createpayslip-warningmessage').subscribe((msg: any) => {
      this.payslipwarningmessage = msg;
    });

    this.translateService.get('resources.staff-payslips-createpayslip-successmessage').subscribe((msg: any) => {
      this.payslipSuccessMessage = msg;
    });

    this.translateService.get('resources.staff-payslips-pageheading-payslipreport').subscribe((msg: any) => {
      this.modalHeading = msg;
    });

    this.translateService.get('resources.reports-emailmodel-modelheading-emailtype-payslip').subscribe((msg: any) => {
      this.emailModelHeading = msg;
    });
  }

  activate() {
    this.initTranslation();
    this.getData();
  }
}