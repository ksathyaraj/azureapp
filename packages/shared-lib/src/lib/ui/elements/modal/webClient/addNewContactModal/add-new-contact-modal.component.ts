import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";

@Component({
  selector: "lib-add-new-contact-modal",
  templateUrl: "./add-new-contact-modal.component.html",
  styleUrls: ["./add-new-contact-modal.component.css"],
})
export class AddNewContactModalComponent {
    individualContactTypes: any;
	
    constructor(
        private dataService:DataService,
        private messagingService:MessagingService,
        public activeModal: NgbActiveModal
    ){}	
    params:any={}

    organisation : any = {
      companyName:undefined,
      organisationCode:undefined,
      tradingAs:undefined,
      firstName:undefined,
      lastName:undefined,
      individualContactType:"",
      emailAddress:undefined,
    };
		contact : any = {};

		getData (refresh:boolean) {
			this.dataService.getLookupData(webApi.individualContactTypes, refresh).subscribe((result) => {
          this.individualContactTypes = result;
      });
		}

		ok(addNewContactForm:NgForm) {
			this.messagingService.broadcastCheckFormValidatity();

			
			if (addNewContactForm.form.valid) {

        this.contact.firstName = this.organisation.firstName;
        this.contact.lastName = this.organisation.lastName;
        this.contact.individualContactType = this.organisation.individualContactType;
        this.contact.emailAddress = this.organisation.emailAddress;

				this.dataService.post(webApi.saveindividual, this.contact).subscribe((orgId:any) => {
          this.activeModal.close(parseInt(orgId));
        });
			}
		}

		cancel() {
			this.activeModal.dismiss();
		}

		ngOnInit() {
      this.contact.organisationId=this.params.orgId
      this.contact.organisationCode=this.params.orgCode
			this.getData(false);
		}
}
