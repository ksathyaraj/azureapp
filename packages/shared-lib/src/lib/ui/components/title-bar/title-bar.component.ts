import { Component, EventEmitter, Input, Output } from '@angular/core';
import { api, resourceMessages, tabData } from '../../../interfaces/webclient.interface';
import { DataService } from '../../../services/data.service';
import { DateService } from '../../../services/date.service';
import { NotificationBarService } from '../../../services/notification-bar.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'lib-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent {
  constructor(private dataService: DataService, private dateService: DateService, private notificationService: NotificationBarService, private modalService: ModalService) { }

  @Input() title = '';
  @Input() smTitle2 = '';
  @Input() count = '';
  @Input() exportButton = false;
  @Input() pdfButton = false;
  @Input() requestGLButton = false;
  @Input() refreshButton = true;
  @Input() addNewButton = true;
  @Input() downloadButton = false;
  @Input() requestReportButton = false;
  @Input() emailButton = false;
  @Input() usageReportButton = false;
  @Input() detailReportButton = false;
  @Input() tabData: tabData[] = [];
  @Input() helpLinkURL = '';
  @Input() resourceMessages: resourceMessages = {};
  @Input() blockquote = '';
  // @Input() smAddURL = '';
  @Input() api: api = {
    get: ''
  };

  @Output() handleAddButtonClick: EventEmitter<Event> = new EventEmitter();
  @Output() handleRefreshButtonClick: EventEmitter<Event> = new EventEmitter();
  @Output() handleRequestGLButtonClick: EventEmitter<Event> = new EventEmitter();
  @Output() handleDownloadButtonClick: EventEmitter<Event> = new EventEmitter();
  @Output() smHandleEmailButtonClick: EventEmitter<Event> = new EventEmitter();
  @Output() smHandleTitleButtonAction: EventEmitter<Event> = new EventEmitter();

  handleButtonAction(param: any) {
    if (param.id === 0) {
      this.handleAdd(param.event);
    }
    if (param.id === 1) {
      this.handleRefresh();
    }
    if (param.id === 2) {
      this.handleExport();
    }
    if (param.id === 3) {
      this.handlePDF();
    }
    if(param.id === 4) {
      this.handleRequestGL();
    }
    if(param.id === 5) {
      this.handleDownload();
    }
    if(param.id === 6) {
      this.handleEmail();
    }
    if(param.id === 7 || param.id === 8) {
      this.handleTitleButtonAction(param);
    }
  }

  handleAdd(event: Event) {
    this.handleAddButtonClick.emit(event);
  }

  handleExport() {
    const exportApi = this.api.export !== undefined ? this.api.export : '';
    if (this.api.exportParams !== undefined) {
      this.dataService.getReportWithParams(exportApi, this.api.exportParams).then((url: any) => {
        window.open(url, '_blank', '');
      })
    }
    else {
      this.dataService.getReport(exportApi).then((url: any) => {
        window.open(url, '_blank', '');
      })
    }
  }

  handleRefresh() {
    this.handleRefreshButtonClick.emit();
  }

  handlePDF() {
    const PDFApi = this.api.pdf !== undefined ? this.api.pdf : '';
    const toDate = this.dateService.getDefaultEndOfYear();
    const paramFilters = !this.api.pdfParams ? ({periodEnd: this.dateService.getFormattedDateForWebApi(toDate)}) : this.api.pdfParams;
    this.dataService
      .getReportWithParams(PDFApi,paramFilters)
      .then((result:any) => {
        this.modalService.openPdfReportModal(this.resourceMessages.PDFModalHeading !== undefined ? this.resourceMessages.PDFModalHeading : '', result);
      });
  }

  handleRequestGL() {
    this.handleRequestGLButtonClick.emit();
  }

  handleDownload() {
    this.handleDownloadButtonClick.emit();
  }

  handleEmail() {
    this.smHandleEmailButtonClick.emit();
  }

  handleTitleButtonAction(params:any) {
    this.smHandleTitleButtonAction.emit(params);
  }

}
