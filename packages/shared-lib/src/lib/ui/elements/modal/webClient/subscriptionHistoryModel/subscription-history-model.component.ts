import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "lib-subscription-history-model",
  templateUrl: "./subscription-history-model.component.html",
  styleUrls: ["./subscription-history-model.component.scss"],
})
export class SubscriptionHistoryModelComponent {

  constructor(
    private activeModal: NgbActiveModal,
    private dataService: DataService
  ) {}
  
  params:any={}
  subscriptionHistory:any=[]
  
  ok() {
    this.activeModal.close()
  }
  
  cancel() {
    this.activeModal.close()
  }

  ngOnInit() {
    this.dataService.getRecordWithParams(webPortal.subscriptionHistory, { companyId: this.params.companyId }).subscribe((result:any) => {
          this.subscriptionHistory = result;
      });
  }

}
