import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";

@Component({
  selector: "lib-add-new-customer-modal",
  templateUrl: "./add-new-customer-modal.component.html",
  styleUrls: ["./add-new-customer-modal.component.css"],
})
export class AddNewCustomerModalComponent {
  

  constructor(
      private dataService:DataService,
      private messagingService:MessagingService,
      public activeModal: NgbActiveModal
  ){}
  form = {};
  organisation = {
    companyName:undefined,
    organisationCode:undefined,
    tradingAs:undefined,
    firstName:undefined,
    lastName:undefined,
    individualContactType:"",
    emailAddress:undefined,
  };
  contact = { organisationId: 0 };
  individualContactTypes: any;

  getData(refresh:boolean) {

      // LookupDataService.getIndividualContactTypes(refresh)
      //     .then(function (result) {
      //         individualContactTypes = result;
      //     });

          this.dataService.getLookupData(webApi.individualContactTypes, refresh).subscribe((result) => {
                    this.individualContactTypes = result;
                });
  }

  ok(addNewCustomerForm:NgForm) {
      this.messagingService.broadcastCheckFormValidatity();

      // parentForm = form.addNewCustomerForm;
      if (addNewCustomerForm.form.valid) {

        this.dataService.post(webApi.organisationAndIndividualContact, this.organisation).subscribe((orgId:any) => {
            this.activeModal.close(parseInt(orgId));
          });
      }
  }

  cancel(){
    this.activeModal.dismiss();
  }

  ngOnInit() {
      this.getData(false);
  }
  
}
