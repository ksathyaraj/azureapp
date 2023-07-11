import { Component } from "@angular/core";
import * as moment from "moment";
import { Column, ColumnType, DateFilter, api, resourceMessages, searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";

@Component({
  selector: "admin-auditing",
  templateUrl: "./auditing.component.html"
})
export class AuditingComponent {
  constructor(private modalService: ModalService) {}

  auditingColumns: Column[] = [
    { columnDef: 'company', header: 'Company'},
    { columnDef: 'loggedOnUser', header: 'Logged On User', multipleInputSearchField: 'loggedOnUser'},
    { columnDef: 'timeStamp', header: 'Timestamp', showDateTimeFilter: true},
    { columnDef: 'commandType', header: 'Command Type', multipleInputSearchField: 'commandType'},
    { columnDef: 'messageId', header: 'Message Id'},
    { columnDef: '', header: 'Is Success' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true,hideSorting:true,
    optionalCheckboxCondition: () => {return true},
    checkboxClassField: (dataValue: any) => { return dataValue['isSuccess'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }},
    { columnDef: 'milliseconds', header: 'Milliseconds'},
    { columnDef: '', header: '', columnModal: ColumnType.modal, colWidth:'1%'}
  ];
  api: api = {
    getWithSingleDate: webPortal.getAuditing,
    singleDateFilter:{date: '', t: moment().millisecond() },
  };
  title = 'Command Audit Logs';
  searchUIOptions: searchUIOptions = {
    singleDateFilter: true,
    searchInput: true
  };
  resourceMessages : resourceMessages = {
    tableSearchPlaceHolder: 'search company, logged on user and command type...'
  };
  dateFilter:DateFilter = {
    smLabel: 'Date',
    smPlaceholder :'DD MMM YYYY e.g. 01 Jan 2015',
    smLabelclass :'col-md-2'
  }

  handleTableModal(event: any) {
    this.modalService.auditing(event);
  }

}
