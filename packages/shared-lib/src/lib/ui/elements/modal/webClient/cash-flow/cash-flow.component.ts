import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";

@Component({
  selector: "lib-cash-flow",
  templateUrl: "./cash-flow.component.html",
})
export class CashFlowComponent {
  closeData = webConstants.closeData;
  okClick = webConstants.okClick;
  addNewFormDetails = {};
  params:any = {}
  
  constructor(
    public activeModal: NgbActiveModal
  ) {}

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  // passBack(addNewFormDetails:any ,addNewForm:NgForm) {
  //   this.activeModal.close();
  // }
}
