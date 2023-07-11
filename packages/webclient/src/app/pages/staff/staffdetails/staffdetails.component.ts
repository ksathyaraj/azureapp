import { Component } from "@angular/core";
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi } from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { Router } from '@angular/router';
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
  selector: "web-staffdetails",
  templateUrl: "./staffdetails.component.html",
})
export class StaffdetailsComponent {
  constructor(private router: Router) { }

  helpLinkURL = webConstants.staffDetailsHelpURL;
  addURL = 'staff/staffdetails/0';
  updateURL = '/staff/staffdetails'
  deleteSuccessMessage = '';
  confirmDeleteMessage = '';
  exportButton = true;

  staffDetailsColumns: Column[] = [
    { columnDef: 'fullName', header: 'Full Name', columnType: ColumnType.link },
    { columnDef: 'employmentStatus', header: 'Employment Status' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'telephone', header: 'Telephone' },
    { columnDef: 'cellphone', header: 'Cellphone' },
    { columnDef: '', header: '', columnType: ColumnType.deleteButton }
  ];

  api: api = {
    get: webApi.staffdetails,
    deleteForHttpPostMethod: webApi.deleteStaffDetails,
    export: webApi.exportStaffDetails
  };

  title = 'resources.staff-staffdetails-pageheading-staffdetails';

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };

  resourceMessages: resourceMessages = {
    noTableDataMessage: 'resources.staff-staffdetails-staffrecorddetail-label-warningmessage',
    deleteSuccessMessage: 'resources.staff-staffdetails-deletesuccessmessage',
    confirmDeleteMessage: 'resources.staff-staffdetails-confirmdeletemessage',
    tableSearchPlaceHolder: 'resources.staff-staffdetails-searchplaceholder'
  };

  handleAddButtonClick(event: Event) {
    this.router.navigateByUrl(this.addURL);
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + '/' + param.id);
  }
}
