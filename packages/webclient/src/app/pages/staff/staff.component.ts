import { Component } from "@angular/core";
import { navButtonGrid } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";

@Component({
  selector: "web-staff",
  templateUrl: "./staff.component.html",
  styleUrls: ["./staff.component.css"],
})
export class StaffComponent {
  constructor(
    private enumService: EnumsService
  ){}
  navButtonList: navButtonGrid[] = [
    {
      text: 'resources.dashboard-staff-staffdetails',
      sref: '/staff/staffdetails',
      buttonSupportName: this.enumService.dashboardButtons.StaffStaffDetails
    },
    {
      text: 'resources.dashboard-staff-payslips',
      sref: '/staff/payslips',
      buttonSupportName: this.enumService.dashboardButtons.StaffPayslips
    },
    {
      text: 'resources.dashboard-staff-salaryschedules',
      sref: '/staff/companysalaryschedule',
      buttonSupportName: this.enumService.dashboardButtons.StaffSalarySchedules
    }
  ]
}
