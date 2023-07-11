import { HttpEventType } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { Column, ColumnType, api, resourceMessages, searchUIOptions } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { map } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { TableComponent } from "packages/shared-lib/src/lib/ui/elements/table/table.component";
import { helpPanel } from "packages/shared-lib/src/lib/interfaces/portal.interface";

@Component({
  selector: "admin-activation",
  templateUrl: "./activation.component.html"
})
export class ActivationComponent {
  @ViewChild(TableComponent) child:TableComponent | undefined;

  constructor(private dataService: DataService, 
    private notificationService: NotificationBarService,
    private modalService: ModalService) {

  }
  absaBatchColumns: Column[] = [
    { columnDef: 'cif', header: 'CIF', multipleInputSearchField:'cif'},
    { columnDef: 'country', header: 'Country', multipleInputSearchField:'country'},
    { columnDef: 'accountName', header: 'Account Name', multipleInputSearchField:'accountName'},
    { columnDef: 'tradingName', header: 'Trading Name', multipleInputSearchField:'tradingName'},
    { columnDef: 'entityType', header: 'Entity Type', multipleInputSearchField:'entityType'},
    { columnDef: 'vatRegistered', header: 'VAT Registered', multipleInputSearchField:'vatRegistered'},
    { columnDef: 'fullName', header: 'Full Name', multipleInputSearchField:'fullName'},
    { columnDef: 'cellphoneNumber', header: 'Cellphone Number', multipleInputSearchField:'cellphoneNumber'},
    { columnDef: 'emailAddress', header: 'Email Address', multipleInputSearchField:'emailAddress'},
    { columnDef: 'companyLoginName', header: 'Company Login Name', multipleInputSearchField:'companyLoginName'},
    { columnDef: 'username', header: 'Username', multipleInputSearchField:'username'},
    { columnDef: 'voucherCode', header: 'Voucher Code', multipleInputSearchField:'voucherCode'},
    { columnDef: 'companyId', header: 'Company Id', multipleInputSearchField:'companyId'},
    { columnDef: '', header: 'Registered' ,columnCheckbox:ColumnType.checkbox,transparentBtn:true,hideSorting:true,
    optionalCheckboxCondition: () => {return true},
    checkboxClassField: (dataValue: any) => { return dataValue['isRegistered'] ? 'fa fa-check-square-o' : 'fa fa-square-o' }},
    { columnDef: 'accountNumber', header: 'Account Number'},
    { columnDef: 'applicationNumber', header: 'Application Number'},
    { columnDef: 'dateTimeUploaded', header: 'Upload Date', showDateTimeFilter: true},
    { columnDef: 'comments', header: 'Comments'},
    { columnDef: '', header: 'Promote to Registration', columnType: ColumnType.promote, optionalCheckboxCondition: (dataValue:any) => { return dataValue.promoteStatus === 0 && dataValue.companyId === null && dataValue.isRegistered === null ? 'a' : dataValue.promoteStatus === 1 ? 'b' : dataValue.promoteStatus === 2 ? 'c' : false },},
  ];
  api: api = {
    getWithDateRange: webPortal.getAbsaBatchActivation
  };
  title = 'ABSA Batch Activations';
  searchUIOptions: searchUIOptions = {
    dateRange: true,
    searchInput: true
  };
  resourceMessages : resourceMessages = {
    tableSearchPlaceHolder: 'search on any of the fields in the grid...'
  };
  progress = 0;
  uploaderFileName = '';
  showProgressbar = false;
  helpPanel: helpPanel = {
    helpPanelHeading: 'Upload details',
    helpRowItems: []
  };

  handleTableModal(activation:any) {
    const message = 'Are you sure you want to Promote this Activation ('+ activation.accountName +') to the Registration Step?';
    this.modalService.questionModal('Promote Activation to Regsitration?', message).result.then(() => {
        this.dataService.post(webPortal.postAbsaBatch + activation.id).subscribe(() => {
          this.modalService.messageModal('Queued Request', 'PLEASE NOTE:  This is a background process, please refresh the Activations list to see when the process is complete.');
          this.child?.getData(true);
        });
    });
  }

  onFileSelected(event:any) {
    const file = event?.target?.files[0];
    if (file && file.size < 4194304) {
      const formData = new FormData();
      formData.append("file", file);
      this.dataService.getFileUploaderInstance(webPortal.uploadAbsaBatch, formData)
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            if (event.body.length > 1001) { 
              this.notificationService.warning('The file has more than 1001 records, the limit is 1000.','');
              return;
            }
            this.progress = 0;
            this.showProgressbar = false;
            this.child?.getData(true);
            this.notificationService.success('File uploaded, please see upload details');
            this.uploaderFileName = '';
          }
        }),
        catchError((err: any) => {
          this.progress = 0;
          this.notificationService.warning('There was a problem ,importing your file','');
          return throwError(() => err.message);
        })
      )
      .toPromise();
    } else {
      this.notificationService.warning("The file being uploaded can't be more than 4MB");
      return;
    }
  }
}
