import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "lib-auditing",
  templateUrl: "./auditing.component.html"
})
export class AuditingComponent implements OnInit{
  constructor(
    public activeModal: NgbActiveModal,
    private dataService: DataService
    ) {}
    
  @Input() params = {audit:{id:0}};  
  closeData = webConstants.closeData;
  audit:any = {};

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getRecord(webPortal.getAudit+'/'+this.params?.audit?.id)
    .subscribe((data:any) => {
      this.audit = data;
    })
  }

  ok() {
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }
}
