import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Column, api, buttonParameters, dataOperation, dropDownFilter, resourceMessages, searchUIOptions, tabData,DateFilter } from "../../../interfaces/webclient.interface";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { ModalService } from "../../../services/modal.service";
import { webApi } from "../../../services/api/webclient.api";
import { DateService } from "../../../services/date.service";
import * as moment from "moment";
import { Router } from '@angular/router';
import { NotificationBarService } from "../../../services/notification-bar.service";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "../../../constants/web.constants";
import { portalConstants } from "../../../constants/portal.constants";

@Component({
  selector: "lib-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  constructor(private dataService: DataService, private dateService: DateService, private _router: Router, private notificationService:NotificationBarService, private translateService: TranslateService, private modalService: ModalService) {}

  @Input() tableColumns: Column[] = [];
  @Input() totalColumn: any = [];
  @Input() title = "";
  @Input() smTitle2 = "";
  @Input() smTitle3 = "";
  @Input() requestGLButton = false;
  @Input() exportButton = false;
  @Input() pdfButton = false;
  @Input() refreshButton = true;
  @Input() addNewButton = true;
  @Input() emailButton = false;
  @Input() downloadButton = false;
  @Input() requestReportButton = false;
  @Input() usageReportButton = false;
  @Input() detailReportButton = false;
  @Input() showTitleBar = true;
  @Input() api: api = {};
  @Input() tabData: tabData[] = [];
  @Input() searchUIOptions: searchUIOptions = {};
  @Input() helpLinkURL = '';
  @Input() optionalCheckboxCondition = false;
  @Input() resourceMessages: resourceMessages = {};
  @Input() additionalGetPageResponse = '';
  @Input() showPagination = true;
  @Input() deleteModalWithData = '';
  @Input() blockquote = '';
  @Input() pageName = '';
  @Input() isCustomerInvoice = false;
  @Input() dropDownFilter:dropDownFilter = {
    smOptions: [],
    smRequired: false,
    smLabel: '',
    smOptionDisplayField: '',
    smOptionValueField: '',
    smPlaceholder: '',
    smLabelClass: '',
    selectedSearchFilterDropdown:''
  };
  @Input() dateFilter:DateFilter = {
    smLabel: ''
  }
  @Input() emptyDefaultDates=false;
  @Input() showCount = true;
  @Input() searchInputDivClass = '';
  @Input() dateRangeDivClass = '';
  @Input() singleDateFilterDivClass = '';
  @Input() selectInputDivClass = '';
  @Input() multiSelectDivClass = '';
  @Output() smHandleAddButtonClick: EventEmitter<Event> = new EventEmitter(); 
  @Output() smHandleDownloadButtonClick: EventEmitter<Event> = new EventEmitter(); 
  @Output() smHandleUpdateButtonClick: EventEmitter<buttonParameters> = new EventEmitter();
  @Output() smHandleCheckboxUpdate: EventEmitter<Event> = new EventEmitter(); 
  @Output() smHandleDefaultCheckboxUpdate: EventEmitter<Event> = new EventEmitter();  
  @Output() smHandleDownloadTableData: EventEmitter<Event> = new EventEmitter();  
  @Output() smHandleDropdownClick: EventEmitter<Event> = new EventEmitter();  
  @Output() smHandleTableModal: EventEmitter<any> = new EventEmitter();  
  @Output() smHandleEmailButtonClick: EventEmitter<Event> = new EventEmitter();
  @Output() smHandleTitleButtonAction: EventEmitter<any> = new EventEmitter();

  isSearchOptionAvailable = false;
  tableData: any = [];
  totalCount = 0;
  filteredDataCount = 0;
  recordCount = '';
  allData = [];
  filterColumn = "";
  filterFn: any = "";
  organisedContact = true;
  dataOperations: dataOperation = {
    sortPredicate: this.filterColumn,
    sortOrder: true,
    paging: {
      pageSize: 10,
      currentPage: 1,
      maxPagesToShow: 5
    },
  };
  getApi = '';
  PDFApi = '';
  getWithDateRangeApi = '';
  getWithSingleDate = '';
  dateRangeFilter = {
    from: '',
    to: '',
    t: 0
  };
  fromDate = this.dateService.getDefaultFromDate();
  toDate = this.dateService.getDefaultToDate();
  datePeriod = undefined;
  canChangePrimaryUser = false;
  originalDataSet:any = {};
  isTableDataForDropdownLoaded = true;
  isPayslip = false;
  defaultFilter = '';
  inputMultipleSearch:any = [];

  ngOnInit() {
    this.isPayslip = this.pageName === webConstants.payslipPage ? true : false;
    this.PDFApi = this.api.pdf !== undefined ? this.api.pdf : '';
    this.getWithDateRangeApi = this.api.getWithDateRange !== undefined ? this.api.getWithDateRange : '';
    this.getWithSingleDate = this.api.getWithSingleDate !== undefined ? this.api.getWithSingleDate : '';
    if(this.getWithDateRangeApi !== '' && !this.emptyDefaultDates) {
      this.searchByDateRange({fromDate:this.fromDate,toDate:this.toDate})
    }
    if(this.getWithSingleDate !== '') {
      this.searchBySingDate({datePeriod:this.datePeriod})
    }
    this.filterTableColumns();
    this.getData(false, this.filterFn);
    this.searchOptionsVerification();
    this.getTranslation();
    this.resourceMessages.noTableDataMessage = this.resourceMessages.noTableDataMessage !== undefined && this.resourceMessages.noTableDataMessage !== '' ? this.resourceMessages.noTableDataMessage : portalConstants.noDataFound;
  }

  getData(refresh: boolean, filterFn?: any) {
    this.getApi = this.api.get !== undefined ? this.api.get : '';
    let paramValues: any = {};
    if(this.getWithDateRangeApi !== '') {
      if(this.api.dateRangeFilter !== undefined) {
        paramValues = this.api.dateRangeFilter;
      } else {
        paramValues = this.dateRangeFilter;
      }
    }
    if(this.getWithSingleDate !== '') {
      paramValues = this.api.singleDateFilter;
    }
    if(this.api.dropDownFilter !== undefined){
      paramValues =  {...paramValues, ...this.api.dropDownFilter};
    }
    if(this.api.getWithMultiSelectFilter !== undefined){
      paramValues =  {...paramValues, ...this.api.getWithMultiSelectFilter};
    }
    if(this.defaultFilter !== undefined && this.defaultFilter !== '') {
      this.dataOperations.sortPredicate = this.defaultFilter;
      this.dataOperations.sortOrder = false;
    }
    this.dataService
      .getData( this.getApi || this.getWithDateRangeApi || this.getWithSingleDate, refresh, this.dataOperations, filterFn, this.additionalGetPageResponse ? (data:any)=> {  return data[this.additionalGetPageResponse]; } : '', paramValues)
      .subscribe((data: any) => {
        this.originalDataSet = data.originalDataset;
        this.tableData = data?.pagedData;
        this.totalCount = parseInt(data?.dataCount);
        this.filteredDataCount = parseInt(data?.filteredDataCount);
        this.allData = data?.allData;
        this.recordCountDescription(); 
        if(!this.isTableDataForDropdownLoaded) {
          this.searchByDropdown(this.dropDownFilter.selectedSearchFilterDropdown);
        }
      });
  }

  handlePageChange(page: number) {
    this.dataOperations.paging.currentPage = page;
    this.getData(false, this.filterFn);
  }

  handleSort() {
    this.defaultFilter = '';
    this.getData(false, this.filterFn);
  }

  handleSearch(search: string) {
    if (search && search.length > 0) {
      this.filterFn = (datum: any) => {
        const lowerCaseSearchTerm = search.toLowerCase();
        const verifyData = [];
        for (let i = 0; i < this.tableColumns.length; i++) {
          if (this.tableColumns[i].columnDef !== "") {
            if(datum[this.tableColumns[i].columnDef] && typeof datum[this.tableColumns[i].columnDef] === 'string') {
              const searchTerm = datum[this.tableColumns[i].columnDef] && datum[this.tableColumns[i].columnDef]
              .toLowerCase()
              .includes(lowerCaseSearchTerm);
              if(this.inputMultipleSearch.length > 0) {
                for(let j=0; j<=this.inputMultipleSearch.length; j++) {
                  if(datum[this.inputMultipleSearch[j]] && typeof datum[this.inputMultipleSearch[j]] === 'string' ) {
                    verifyData.push(
                      searchTerm || datum[this.inputMultipleSearch[j]]
                          .toLowerCase()
                          .includes(lowerCaseSearchTerm)
                    );
                  }
                }
                
              } else {
                  verifyData.push(
                    searchTerm
                  );
              }
            } 
          }
        }
        return verifyData.includes(true);
      };
    } else {
      this.filterFn = null;
    }
    this.getData(false, this.filterFn);
  }

  deleteData(record: any) {
    const deleteForHttpPostMethod = this.api.deleteForHttpPostMethod !== undefined ? this.api.deleteForHttpPostMethod.replace(':id',record.id) : '';
    const deleteForHttpDeleteMethod = this.api.deleteForHttpDeleteMethod !== undefined ? this.api.deleteForHttpDeleteMethod.replace(':id',record.id) : '';
    const httpPost = 'post';
    const httpDelete = 'delete';
    const deleteApi = deleteForHttpPostMethod !== '' ? deleteForHttpPostMethod : deleteForHttpDeleteMethod;
    const deleteModalDataToShow = this.deleteModalWithData !== '' && this.deleteModalWithData !== undefined ? record[this.deleteModalWithData] : record[this.filterColumn];
    this.modalService.confirmDelete(this.resourceMessages.confirmDeleteMessage + ': ' +  deleteModalDataToShow + '?').result.then((data: any) => {
      this.dataService[deleteForHttpDeleteMethod !== '' ? httpDelete : httpPost](deleteApi)
        .subscribe(() => {
        this.getData(true, this.filterFn);
        this.notificationService.success(this.resourceMessages.deleteSuccessMessage !== undefined ? this.resourceMessages.deleteSuccessMessage : webConstants.recordDeleteSuccessMessage);
      });
    })
  }

  sendInvoice(recordId:any) {
    this.modalService.questionModal(this.resourceMessages.questionModalTitle !== undefined ? this.resourceMessages.questionModalTitle : '', this.resourceMessages.questionModalMessage !== undefined ? this.resourceMessages.questionModalMessage : '').result.then((data: any) => {
      const invoiceApi = this.api.invoice !== undefined ? this.api.invoice : '';
      this.dataService
        .post(invoiceApi + '/' + recordId +'/' + webApi.convertPostfix)
        .subscribe((invoiceId: any) => {
          this._router.navigateByUrl('/finance/invoicing/customerinvoices/' + invoiceId);
      });
    })
  }

  sendPDF(record: any) {
    let heading = this.resourceMessages.PDFModalHeading
    if(this.isCustomerInvoice){
      heading = heading + " - " + record.formattedInvoiceNumber
    }
    this.dataService
      .getReport(this.PDFApi + '/' + record.id)
      .then((dataUrl:any)=> {
        this.modalService.openPdfReportModal(heading,  dataUrl);
    });
  }


  sendEmail(recordId:any) {
    const EmailApi = this.api.email !== undefined ? this.api.email : '';
    this.dataService
      .getReport(this.PDFApi + '/' + recordId)
      .then((pdfUrl:any)=> {
        this.dataService
        .getRecord(EmailApi + '/' + recordId)
        .subscribe((emailResult:any)=> {
          const emaiDetails = {
            toEmailAddress: emailResult.toEmail,
            ccEmailAddress: '',
            fromEmailAddress: emailResult.fromEmail,
            subject: emailResult.payslipSubject || emailResult.quoteSubject || emailResult.invoiceSubject,
            body: emailResult.payslipBody || emailResult.quoteBody || emailResult.invoiceBody,
            id: emailResult.id,
            password: emailResult?.password
          };

          const params = { data: emaiDetails, pdfUrl: pdfUrl, emailType: this.resourceMessages.emailModelHeading, isPayslip: this.isPayslip };
          this.modalService.genericEmailModal(params).result.then((data: any) => {
            const emailConfirmationParams = {contactId: emailResult.contactId, unSavedEmailAddress: this.isPayslip ? [] : (data.unSavedEmailAddress ? data.unSavedEmailAddress : []) };
             this.modalService.emailConfirmationModal(emailConfirmationParams);
          });
        });
    });
  }

  searchOptionsVerification()  {
    if(Object.keys(this.searchUIOptions).length === 0) {
      this.isSearchOptionAvailable = false;
    } else {
      this.isSearchOptionAvailable = true;
    }
  }

  onLetterSearch(value: string) {
    this.filterFn = (datum:any) => {
      if(value === '#'){
        return new RegExp('[^a-z]').test(datum[this.filterColumn].toLowerCase().charAt());
      } else {
        return datum[this.filterColumn].toLowerCase().startsWith(value.toLowerCase());
      }
    };
    this.getData(false, this.filterFn);
  }

  searchByDateRange(event:any) {
    const start = moment(); // jshint ignore:line
    if(this.api.dateRangeFilter !== undefined) {
      this.api.dateRangeFilter[Object.keys(this.api.dateRangeFilter)[0]] = this.dateService.getFormattedDateForWebApi(event.fromDate);
      this.api.dateRangeFilter[Object.keys(this.api.dateRangeFilter)[1]] = this.dateService.getFormattedDateForWebApi(event.toDate);
    }
    this.dateRangeFilter.from = this.dateService.getFormattedDateForWebApi(event.fromDate);
    this.dateRangeFilter.t = start.millisecond();
    this.dateRangeFilter.to = this.dateService.getFormattedDateForWebApi(event.toDate);
    if(this.api.pdfParams !== undefined) {
      this.api.pdfParams[Object.keys(this.api.pdfParams)[0]] = this.dateService.getFormattedDateForWebApi(event.fromDate);
      this.api.pdfParams[Object.keys(this.api.pdfParams)[1]] = this.dateService.getFormattedDateForWebApi(event.toDate);
    }
    if(this.api.exportParams !== undefined) {
      this.api.exportParams[Object.keys(this.api.exportParams)[0]] = this.dateService.getFormattedDateForWebApi(event.fromDate);
      this.api.exportParams[Object.keys(this.api.exportParams)[1]] = this.dateService.getFormattedDateForWebApi(event.toDate);
    }
  }

  searchBySingDate(event:any) {
    if(this.api.singleDateFilter !== undefined){
      this.api.singleDateFilter[Object.keys(this.api.singleDateFilter)[0]] = !this.api.datesWithoutFormat ? this.dateService.getFormattedDateForWebApi(event.datePeriod) : event.datePeriod;
    }
    if(this.api.exportParams !== undefined){
      this.api.exportParams[Object.keys(this.api.exportParams)[0]] = this.dateService.getFormattedDateForWebApi(event.datePeriod);
    }
    if(this.api.pdfParams !== undefined){
      this.api.pdfParams[Object.keys(this.api.pdfParams)[0]] = this.dateService.getFormattedDateForWebApi(event.datePeriod);
    }
  }

  searchByDropdown(event:any) {
    if(this.allData.length === 0) {
      this.isTableDataForDropdownLoaded = false;
    }
    this.smHandleDropdownClick.emit(event);
    if(this.api.dropDownFilter !== undefined){
      this.api.dropDownFilter[Object.keys(this.api.dropDownFilter)[0]] = event;
      this.isTableDataForDropdownLoaded = true;
    } else {
      this.showCount = false;
      this.tableData = this.allData.filter((data:any)=> {
        this.isTableDataForDropdownLoaded = true;
        return data[this.dropDownFilter.getDataByValue !== undefined ? this.dropDownFilter.getDataByValue : 'id'] === event;});
    }
    if(this.api.exportParams !== undefined){
      this.api.exportParams[Object.keys(this.api.exportParams)[0]] = event;
    }
  }

  searchByMultiSelect(event:any) {
    if(this.api.getWithMultiSelectFilter !== undefined) {
      this.api.getWithMultiSelectFilter[Object.keys(this.api.getWithMultiSelectFilter)[0]] = event;
    }
    if(this.api.exportParams !== undefined && this.api.exportParams['countryIds'] !== undefined){
      this.api.exportParams['countryIds'] = event;
    }
  }

  recordCountDescription() {
    if(this.totalCount === this.filteredDataCount){
      this.recordCount = this.totalCount.toString();
    } else {
      this.recordCount = this.filteredDataCount.toString() + ' of ' + this.totalCount.toString();
    }
  }

  filterTableColumns() {
    this.tableColumns.filter((c: Column) => {
      if (c.columnType === 0) {
        this.filterColumn = c.columnDef;
      }
      if(c.defaultFilter) {
        this.defaultFilter = c.columnDef;
      }
      if(c.multipleInputSearchField !== undefined && c.multipleInputSearchField !== '') {
        this.inputMultipleSearch.push(c.multipleInputSearchField);
      }
    });
  }

  handleRefreshButtonClick() {
    this.getData(true, this.filterFn);
  }

  handleAddButtonClick(event: Event) {
    this.smHandleAddButtonClick.emit(event);
  }

  handleDownloadButtonClick(event: Event) {
    this.smHandleDownloadButtonClick.emit(event);
  }

  handleUpdateButtonClick(event: Event, id: number, data: any) {
    this.smHandleUpdateButtonClick.emit({event,id, data});
  }

  handleDefaultCheckboxUpdate(event:any) {
    this.smHandleDefaultCheckboxUpdate.emit(event);
  }

  handleDownloadTableData(event:any) {
    this.smHandleDownloadTableData.emit(event);
  }

  handleCheckBoxClick(){
    this.smHandleCheckboxUpdate.emit()
  }

  handleTableModal(data: any, columnType?: number) {
    this.smHandleTableModal.emit({data, columnType});
  }

  handleEmailButtonClick(data:any) {
    this.smHandleEmailButtonClick.emit(data);
  }

  handleTitleButtonAction(event:any) {
    const data = this.dateRangeFilter;
    this.smHandleTitleButtonAction.emit({event, data});
  }

   handleCheckboxUpdate(record: any) {
    // this.smHandleCheckboxUpdate.emit(data);
    this.modalService.questionModal(this.resourceMessages.messageModalTitle !== undefined ? this.resourceMessages.messageModalTitle : '', this.resourceMessages.messageModalMessage !== undefined ? this.resourceMessages.messageModalMessage + record[this.filterColumn]: '' ).result.then((data:any) =>{
    this.api.checkboxUpdateApi = this.api.checkboxUpdateApi !== undefined ? this.api.checkboxUpdateApi : '';
    this.api.checkboxUpdateApi = this.api.checkboxUpdateApi.replace(':id',record.id);
    this.dataService
      .post(this.api.checkboxUpdateApi)
      .subscribe(() => {
        this.notificationService.success(this.resourceMessages.checkboxUpdateSuccessMessage !== undefined ? this.resourceMessages.checkboxUpdateSuccessMessage : webConstants.checkboxUpdateSuccessMessage);
        this.getData(true, this.filterFn);
      });
    })
  }

  getTranslation() {
    if(this.resourceMessages?.deleteSuccessMessage){
    this.translateService.get(this.resourceMessages.deleteSuccessMessage !== undefined ? this.resourceMessages.deleteSuccessMessage : '').subscribe((res: string) => {
      this.resourceMessages.deleteSuccessMessage = res;
    })
  }
    if(this.resourceMessages?.confirmDeleteMessage){
    this.translateService.get(this.resourceMessages?.confirmDeleteMessage !== undefined ? this.resourceMessages?.confirmDeleteMessage : '').subscribe((res: string) => {
      this.resourceMessages.confirmDeleteMessage = res;
    })
  }
    if(this.resourceMessages?.checkboxUpdateSuccessMessage){
    this.translateService.get(this.resourceMessages?.checkboxUpdateSuccessMessage !== undefined ? this.resourceMessages?.checkboxUpdateSuccessMessage : '').subscribe((res: string) => {
      this.resourceMessages.checkboxUpdateSuccessMessage = res;
    });
  }
    if(this.resourceMessages?.PDFModalHeading){
      this.translateService.get(this.resourceMessages?.PDFModalHeading && this.resourceMessages?.PDFModalHeading!== undefined ? this.resourceMessages?.PDFModalHeading : '').subscribe((res: string) => {
        this.resourceMessages.PDFModalHeading = res;
      });
    }
    if(this.resourceMessages?.emailModelHeading){
      this.translateService.get(this.resourceMessages?.emailModelHeading && this.resourceMessages?.emailModelHeading!== undefined ? this.resourceMessages?.emailModelHeading : '').subscribe((res: string) => {
        this.resourceMessages.emailModelHeading = res;
      });
    }
    if(this.resourceMessages?.questionModalTitle){
    this.translateService.get(this.resourceMessages?.questionModalTitle && this.resourceMessages?.questionModalTitle !== undefined ? this.resourceMessages?.questionModalTitle : '').subscribe((res: string) => {
      this.resourceMessages.questionModalTitle = res;
    });
    }
    if(this.resourceMessages?.questionModalMessage){
      this.translateService.get(this.resourceMessages?.questionModalMessage && this.resourceMessages?.questionModalMessage !== undefined ? this.resourceMessages?.questionModalMessage : '').subscribe((res: string) => {
        this.resourceMessages.questionModalMessage = res;
      });
    }
    if(this.resourceMessages?.messageModalTitle){
      this.translateService.get(this.resourceMessages?.messageModalTitle && this.resourceMessages?.messageModalTitle !== undefined ? this.resourceMessages?.messageModalTitle : '').subscribe((res: string) => {
        this.resourceMessages.messageModalTitle = res; 
      });
    }
    if(this.resourceMessages?.messageModalMessage){
      this.translateService.get(this.resourceMessages?.messageModalMessage && this.resourceMessages?.messageModalMessage !== undefined ? this.resourceMessages?.messageModalMessage : '').subscribe((res: string) => {
        this.resourceMessages.messageModalMessage = res;
      });
    }
  }

   // finalisedInvoice(recordId: any) {
    // this.api.finalisedInvoice = this.api.finalisedInvoice !== undefined ? this.api.finalisedInvoice : '';
    // this.api.finalisedInvoice = this.api.finalisedInvoice.replace(':id',recordId);
    // this.dataService
    //   .post(this.api.finalisedInvoice)
    //   .subscribe((invoiceId: any) => {
    //     this.notificationService.success(this.resourceMessages.finalisedInvoiceSuccessMessage !== undefined ? this.resourceMessages.finalisedInvoiceSuccessMessage : webConstants.finalisedInvoiceSuccessMessage);
    // });
  // }

}
