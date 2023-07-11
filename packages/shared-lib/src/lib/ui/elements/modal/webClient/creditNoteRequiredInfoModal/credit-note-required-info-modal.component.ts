import { Component, Input } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "lib-credit-note-required-info-modal",
  templateUrl: "./credit-note-required-info-modal.component.html",
  styleUrls: ["./credit-note-required-info-modal.component.scss"],
})
export class CreditNoteRequiredInfoModalComponent {
  contact:any=''
  customerCreditNotes: any;
  customers: any;
  customerCreditNote: any='';
  constructor(
    private dataService: DataService,
    private messagingService: MessagingService,
    private activeModal: NgbActiveModal
  ){}
  @Input() public params: any = {};
  form:any;
  requiredInfoForm:any={invalid:true}
  requiredInfo:any={};
  modalTitle = "";

  customerChange(contactId:any) {
      this.requiredInfo.contactId = contactId;
      const paramFilters:{contactId:any}={contactId:this.requiredInfo.contactId}
      this.dataService.getRecordWithParams(webApi.customerCreditNotesWithDetails,paramFilters)
      .subscribe((result) => {
          this.customerCreditNotes = result;
          });
  }

  getData() {
    this.dataService.getLookupData(webApi.customersWithCreditNotes,true)
          .subscribe((result:any) => {
              this.customers = result;
          });
  }

  ok(requiredInfoForm:any) {
      this.messagingService.broadcastCheckFormValidatity();
      if (!requiredInfoForm.invalid) {
          this.requiredInfo.creditNoteId = this.customerCreditNote.creditNoteId;
          this.activeModal.close(this.requiredInfo);
      } 
  }

  cancel() {
     this.activeModal.dismiss();
  }

  ngOnInit() {
    this.modalTitle = this.params.modalTitle;
      this.getData();
  }
}
