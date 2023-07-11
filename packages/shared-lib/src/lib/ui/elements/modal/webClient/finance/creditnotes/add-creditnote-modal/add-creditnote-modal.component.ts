import {
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { CreditNoteAdd } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";

@Component({
  selector: "lib-add-creditnote-modal",
  templateUrl: "./add-creditnote-modal.component.html",
})
export class AddCreditnoteModalComponent {
  @Input() public form = '';
  @Input() public modalInstance: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  invoiceOptions = [];
  customerInvoiceLookup: any;
  hideLabel = false;
  constructor(
    public activeModal: NgbActiveModal,
    private messagingService: MessagingService,
    private dataService : DataService
  ) { }

  customerInvoice: CreditNoteAdd = {
    id: 0,
    formattedInvoiceNumber: "",
    dateFinalised: "",
    customerName: "",
    reportingIsPaid: false,
    reportingNotPaid: true,
    reportingTotal: 0,
    reportingTotalOutstanding: 0,
    reportingTotalPaid :0
  }
  
  closeData = webConstants.closeData;

   ngOnInit(){
    this.getData();
    }
   
  passBack(form :any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!form.invalid) {
      this.activeModal.close(this.customerInvoice.id);
    }
  }

   closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  getData() {
    this.dataService.getRecord(webApi.creditNoteInvoice).subscribe((data: any) => {
      this.customerInvoiceLookup = data;
      this.invoiceOptions = data;
    })
  }     
  invoiceChange(data: any) {
    this.customerInvoice = this.customerInvoiceLookup.find((x: { id: any; }) => x.id === data);
    this.hideLabel = true;
  }
  
}
