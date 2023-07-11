import { Component, Input } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import Enumerable from 'linq';
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "lib-opening-balance-required-info-modal",
  templateUrl: "./opening-balance-required-info-modal.component.html",
  styleUrls: ["./opening-balance-required-info-modal.component.scss"],
})
export class OpeningBalanceRequiredInfoModalComponent {
    customers: any;
    suppliers: any;
    contact: any='';
    supplier: any='';
  constructor(
    private dataService: DataService,
    private messagingService: MessagingService,
    private activeModal: NgbActiveModal,
  ){}
  @Input() public params: any = {};
  form:any;
  requiredInfo:any={};
  requiredInfoForm:any={}
  modalTitle = '';
  contactRelationshipTypes:any={};
  contactRelationshipType=0;

  getData() {
    this.dataService.getLookupData(webApi.debtorsCreditorsOpeningBalance,true)
        .subscribe((result:any) => {
            switch (this.contactRelationshipType) {
                case this.contactRelationshipTypes.customer:
                    this.customers = Enumerable.from(result)
                        .where((c:any) => { return c.contactRelationshipType == this.contactRelationshipTypes.customer; })
                        .toArray();
                    break;
                case this.contactRelationshipTypes.supplier:
                    this.suppliers = Enumerable.from(result)
                        .where((c:any) => { return c.contactRelationshipType == this.contactRelationshipTypes.supplier; })
                        .toArray();
                    break;

                default:
            }
        });
  }

  ok(requiredInfoForm:any) {
      this.messagingService.broadcastCheckFormValidatity();
      if (!requiredInfoForm.invalid) {
          this.hydrateModel();
          this.activeModal.close(this.requiredInfo);
      } 
  }

  cancel(){
     this.activeModal.dismiss();
  }

  hydrateModel() {
    
      this.requiredInfo.contactRelationshipType = this.contactRelationshipType;

      switch (this.contactRelationshipType) {
          case this.contactRelationshipTypes.customer:
              this.requiredInfo.contactId = this.contact.id;
              break;
          case this.contactRelationshipTypes.supplier:
              this.requiredInfo.contactId = this.supplier.id;
              break;

          default:
      }
  }
  
  ngOnInit(){
    this.modalTitle = this.params.modalTitle;
    this.contactRelationshipTypes = this.params.contactRelationshipTypes;
    this.contactRelationshipType = this.params.contactRelationshipType;
    this.getData()
  }
}
