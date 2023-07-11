import { Component } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { tabData, resourceMessages, api } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { TranslateService } from "@ngx-translate/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { StaffDataService } from "packages/shared-lib/src/lib/services/staff-data.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
@Component({
  selector: "app-individual-salary-schedule",
  templateUrl: "./individual-salary-schedule.component.html",
  styleUrls: ["./individual-salary-schedule.component.css"],
})
export class IndividualSalaryScheduleComponent {
  constructor(
    private translateService: TranslateService,
    private dataService: DataService,
    private messagingService: MessagingService,
    private staffDataService: StaffDataService,
    private modalService: ModalService
  ) { }


  helpLinkUrl = webConstants.individualSalaryScheduleHelpUrl;
  exportButton = true;
  pdfButton = true;
  refreshButton = false;
  addNewButton = false;
  modalHeading = "";
  staffMembers: any = "";
  taxYears: any = "";
  staffId: any = "";
  taxYear: any = "";


  ngOnInit() {
    this.activate();
    this.getData();
  }

  tabData: tabData[] = [
    { routerLink: '/staff/companysalaryschedule', header: 'resources.staff-companysalaryschedule-tabheading-companysalaryschedule', },
    { routerLink: 'staff/individualsalaryschedule', header: 'resources.staff-individualsalaryschedule-tabheading-individualsalaryschedule', isActive: true },
  ]

  resourceMessages: resourceMessages = {
    PDFModalHeading: "resources.staff-individualsalaryschedule-pageheading-individualsalaryschedule",
  };

  getStaffId(event: any) {
    this.staffId = event;
    this.api.exportParams.staffId = this.staffId;
    this.api.pdfParams.staffId = this.staffId;
  }

  getTaxYear(event: any) {
    this.taxYear = event;
    this.api.exportParams.taxYear = this.taxYear;
    this.api.pdfParams.taxYear = this.taxYear;
  }

  api: api = {
    export: webApi.exportIndividualSalaryCsv,
    exportParams: { staffId: this.staffId, taxYear: this.taxYear },
    pdf: webApi.exportIndividualSalaryPdf,
    pdfParams: { staffId: this.staffId, taxYear: this.taxYear }
  }


  activate() {
    this.getData();
  }

  getData() {
    Promise.all([
      this.dataService.getLookupData(webApi.getStaffMembers, true).subscribe((result: any) => {
        this.staffMembers = result;
        if (this.staffMembers.length > 0) {
          this.staffId = this.staffMembers[0].key;
          this.api.exportParams.staffId = this.staffId;
          this.api.pdfParams.staffId = this.staffId;
        }
      }),

      this.dataService.getLookupData(webApi.getTaxYears, true).subscribe((result: any) => {
        this.taxYears = result;
        if (this.taxYears.length > 0) {
          this.taxYear = this.taxYears[0].value;
          this.api.exportParams.taxYear = this.taxYear;
          this.api.pdfParams.taxYear = this.taxYear;
        }

      }),
    ])


  }

}

