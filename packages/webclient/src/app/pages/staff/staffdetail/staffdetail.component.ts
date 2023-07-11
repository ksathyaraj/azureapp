import { Component, Input } from "@angular/core";
import { StaffDataService } from 'packages/shared-lib/src/lib/services/staff-data.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service'
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { DateService } from "packages/shared-lib/src/lib/services/date.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import { staffDetailsInterface, tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
  selector: "web-staffdetail",
  templateUrl: "./staffdetail.component.html",
})
export class StaffdetailComponent {
  staffId!: number;
  constructor(
    private staffDataService: StaffDataService,
    private dataService: DataService,
    private dateService: DateService,
    private messagingService: MessagingService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.staffId = parseInt(params['id']);
    });
  }

  ngOnInit() {
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);

    this.activate();

  }

  staffTypes: any;
  payPackageTypes: any;
  employmentStatus: any;

  staff: staffDetailsInterface = {
    firstName: "",
    lastName: "",
    knownAs: "",
    idNumber: "",
    emailAddress: "",
    telephone: "",
    cellphone: "",
    employmentStartDate: undefined,
    employmentStatus: '',
    numberOfDependants: undefined,
    taxNumber: "",
    occupation: "",
    homeAddress: "",
    postalAddress: "",
    annualLeaveDays: undefined,
    terminationDate: undefined,
    employeeNumber: undefined,
    payPackageType: '',
    staffType: '',
    notes: "",
    nextOfKinFullName: "",
    nextOfKinRelationship: "",
    nextOfKinTelephone: "",
    nextOfKinCellphone: ""
  };

  isNewRecord = this.staffId === 0;
  formData = {};
  opened = false;
  openedTermination = false;
  saveButton = false;
  saveSuccessMessage = '';
  datePlaceHolder = webConstants.datePlaceHolderMessage

  getData(refresh?: boolean) {
    this.dataService.getLookupData(webApi.staffType, refresh).subscribe((response: any) => {
      this.staffTypes = response;
    }),

      this.dataService.getLookupData(webApi.payPackageType, refresh).subscribe((response: any) => {
        this.payPackageTypes = response;
      }),

      this.dataService.getLookupData(webApi.employmentStatus, refresh).subscribe((response: any) => {
        this.employmentStatus = response;
      })

    if (this.staffId !== 0) {
      this.dataService.getRecord(webApi.staff + this.staffId).subscribe((response: any) => {
        if (response !== null) {
          this.staff = response;
        }
      })
    }
    else this.tabData[1].smDisabled = true;
  }

  tabData: tabData[] = [
    { routerLink: 'staffdetail', header: 'resources.staff-staffdetails-staffrecorddetail-tabheading-staff', isActive: true },
    { routerLink: "packagedetails", header: 'resources.staff-staffdetails-packagedetails-tabheading-packagedetails', smDisabled: false }
  ];

  save(staff: any, frm: any) {
    this.messagingService.broadcastCheckFormValidatity();

    if (!frm.invalid) {
      this.saveButton = true;

      if (staff.employmentStartDate) {
        staff.employmentStartDate = this.dateService.getFormattedDateForWebApi(staff.employmentStartDate);
      }

      if (staff.terminationDate) {
        staff.terminationDate = this.dateService.getFormattedDateForWebApi(staff.terminationDate);
      }

      this.dataService.post(webApi.saveStaff, staff).subscribe((result: any) => {
        this.saveButton = false;
        this.staffDataService.clearStaffDetailsCache();
        this.staffId = result;
        staff.id = result;
        this.isNewRecord = false;
        this.notificationBarService.success(this.saveSuccessMessage);
        this.tabData[1].smDisabled = false;
        this.tabData[1].routerLink = '/staff/staffdetails/' + this.staffId + "/packagedetails"
      });
    }

  }

  enableSaveButton(args: any) {
    this.saveButton = false;
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.contacts-staff-savesuccessmessage').subscribe((msg: any) => {
      this.saveSuccessMessage = msg;

    });
  }

  activate() {
    this.initTranslation();
    this.getData(true);
  }

}
