import { Component } from "@angular/core";
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webApi } from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { Router } from '@angular/router';


@Component({
  selector: "web-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent {

  constructor(private router: Router) { }


  title = 'resources.settings-users-pageheading-users';
  addURL = '/settings/users/0';
  updateURL = 'settings/users'
  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };

  userColumns: Column[] = [
    { columnDef: 'name', header: 'Full Name', columnType: ColumnType.link },
    { columnDef: 'lowerCaseUserName', header: 'Username' },
    { columnDef: 'loweredEmail', header: 'Email' },
    { columnDef: 'mobileNumber', header: 'Mobile Number' },
    {
      columnDef: '', header: 'Is Primary User', hideSorting: true,columnCheckbox: ColumnType.defaultCheckbox,
      optionalCheckboxCondition: () => { return true },
      checkboxModelValue: (dataValue: any) => { return dataValue['isPrimaryUser'] ? true : false },
    },
    {
      columnDef: '', header: '', columnType: ColumnType.deleteButton, columnCheckbox: ColumnType.checkbox,
      optionalCheckboxHiddenCondition: (dataValue: any, originalDataSet: any) => { return dataValue['isPrimaryUser'] || !originalDataSet.canChangePrimaryUser },
      checkboxClassField: (dataValue: any) => { return dataValue['isPrimaryUser'] ? 'fa fa-check-square-o' : 'fa fa-square-o' },
      optionalDeleteHidden: (dataValue: any, originalDataSet: any) => { return dataValue['isPrimaryUser'] },
    }
  ];
  additionalGetPageResponse = 'users';
  api: api = {
    get: webApi.getUsers,
    deleteForHttpDeleteMethod: webApi.deleteUsers,
    checkboxUpdateApi: webApi.makePrimaryUser
  };
  deleteSuccessMessage = "";
  confirmDeleteMessage = "";
  confirmMakeUserPrimaryMsg = "";
  makeprimaryusersuccessmessage = "";
  makePrimaryUserModalHeading = "";
  userData = {};
  resourceMessages: resourceMessages = {
    deleteSuccessMessage: 'resources.settings-users-deletesuccessmessage',
    confirmDeleteMessage: 'resources.settings-users-confirmdeletemessage',
    messageModalTitle: 'resources.settings-users-makeprimaryusermodalheading',
    messageModalMessage: 'resources.settings-users-confirmmakeprimaryusermessage',
    checkboxUpdateSuccessMessage: 'resources.settings-users-makeprimaryusersuccessmessage',
    tableSearchPlaceHolder:'resources.settings-users-searchplaceholder'

  };

  handleAddButtonClick(event: Event) {
    this.router.navigateByUrl(this.addURL);

  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + '/' + param.id);
  }
}
