import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { searchUIOptions,DateFilter, dropDownFilter} from "../../../interfaces/webclient.interface";
import { DateService } from "../../../services/date.service";
import { TranslateService } from "@ngx-translate/core";
import { portalConstants } from "../../../constants/portal.constants";

@Component({
  selector: "lib-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit{

  constructor(
    private dateService: DateService,
    private translateService: TranslateService
   ){}

  @Output() handleSearch: EventEmitter<string> = new EventEmitter(); 
  @Output() letterToSearch: EventEmitter<string> = new EventEmitter(); 
  @Output() searchByDateRange: EventEmitter<any> = new EventEmitter(); 
  @Output() searchBySingDate: EventEmitter<any> = new EventEmitter(); 
  @Output() searchByDropdown: EventEmitter<any> = new EventEmitter(); 
  @Output() searchByMultiSelect: EventEmitter<any> = new EventEmitter();
  @Input() searchUIOptions: searchUIOptions = {};
  @Input() smPlaceHolder = '';
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
  @Input() emptyDefaultDates = false;
  @Input() searchInputDivClass = 'col-md-12';
  @Input() dateRangeDivClass = 'col-md-6';
  @Input() selectInputDivClass = 'col-md-6';
  @Input() singleDateFilterDivClass = 'col-md-6';
  @Input() multiSelectDivClass = 'col-md-6'
  singleDateFilterSearch: any;
  selectedSearchFilterDropdown = '';

  dateOptions = {
    'show-weeks': false
  }
  openedStart = false;
  openedEnd = false;
  fromDate:any;
  toDate:any;
  fromDateLabel = '';
  toDateLabel = '';
  datePlaceholder = '';
  

  ngOnInit() {
    this.getTranslation();
    // this.adjustWidth();
    this.fromDate = this.emptyDefaultDates ? undefined : this.dateService.getDefaultFromDate();
    this.toDate = this.emptyDefaultDates ? undefined : this.dateService.getDefaultToDate();
    if(this.searchUIOptions.dateRange !== undefined) {
      this.onSearchByDateRange();
    }
    if(this.dropDownFilter.selectedSearchFilterDropdown) {
      this.onDropDownSelect();
    }
  }

  adjustWidth() {
    if((this.searchUIOptions.dateRange && this.searchUIOptions.dropdown)) {
      this.searchInputDivClass = 'col-md-6'
    } else if((this.searchUIOptions.dropdown && this.searchUIOptions.singleDateFilter)) {
      this.searchInputDivClass = 'col-md-4'
    } else if(this.searchUIOptions.dropdown) {
      this.searchInputDivClass = 'col-md-6'
    } else if(this.searchUIOptions.singleDateFilter) {
      this.searchInputDivClass = 'col-md-6'
    } else if(this.searchUIOptions.dateRange) {
      this.searchInputDivClass = 'col-md-4'
    } else {
      this.searchInputDivClass = 'col-md-12'
    }

    if(this.searchUIOptions.searchInput && this.searchUIOptions.singleDateFilter) {
      this.selectInputDivClass = 'col-md-4';
    } else if(this.searchUIOptions.searchInput && this.searchUIOptions.dateRange) {
      this.selectInputDivClass = 'col-md-6'
    } else if(this.searchUIOptions.dateRange) {
      this.selectInputDivClass = 'col-md-4'
    } else {
      this.selectInputDivClass = 'col-md-6';
    }

    if(this.searchUIOptions.searchInput && !this.searchUIOptions.dropdown) {
      this.dateRangeDivClass = 'col-md-4';
    } else if((this.searchUIOptions.searchInput && this.searchUIOptions.dropdown)) {
      this.dateRangeDivClass = 'col-md-6';
    } else if(this.searchUIOptions.dropdown) {
      this.dateRangeDivClass = 'col-md-4';
    } else {
      this.dateRangeDivClass = 'col-md-6';
    }

    if(this.searchUIOptions.searchInput && this.searchUIOptions.dropdown) {
      this.singleDateFilterDivClass = 'col-md-4';
    } else {
      this.singleDateFilterDivClass = 'col-md-6'
    }
  }

  onSearch(event: any) {
    this.handleSearch.emit(event.target.value);
  }

  onLetterSearch(value: string) {
    this.letterToSearch.emit(value);
  }

  onSearchByDateRange() {
    const params = {
      fromDate: this.fromDate,
      toDate: this.toDate
    }
    this.searchByDateRange.emit(params);
  }

  onSearchBySingleDate() {
    const params = {
      datePeriod: this.singleDateFilterSearch
    }
    this.searchBySingDate.emit(params);
  }

  onDropDownSelect() { 
    this.searchByDropdown.emit(this.dropDownFilter.selectedSearchFilterDropdown);
  }

  onMultiSelect(event:any) {
    if(event.length > 0) {
      this.searchByMultiSelect.emit(event.toString());
    }
  }

  getTranslation() {
    this.translateService.get('resources.finance-quotes-quotes-fromdate').subscribe((res: string) => {
      this.fromDateLabel = res !== undefined && res !== '' && res !== 'resources.finance-quotes-quotes-fromdate' ? res : portalConstants.fromDateLabel;
    });
    this.translateService.get('resources.staff-payslips-label-todate').subscribe((res: string) => {
      this.toDateLabel = res !== undefined && res !== '' && res !== 'resources.staff-payslips-label-todate' ? res : portalConstants.toDateLabel;
    });
    this.translateService.get('resources.calendar-placeholder').subscribe((res: string) => {
      this.datePlaceholder = res !== undefined && res !== '' && res !== 'resources.calendar-placeholder' ? res : portalConstants.datePlaceholder;
    })
  }
}
