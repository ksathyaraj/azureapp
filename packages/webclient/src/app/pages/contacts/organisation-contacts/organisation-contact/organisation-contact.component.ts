import { Component } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import {contactInterface} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: "web-organisation-contact",
  templateUrl: "./organisation-contact.component.html",
})
export class OrganisationContactComponent {
  contactId!: number;
  constructor(private dataService : DataService,private messagingService : MessagingService,private translateService : TranslateService,
    private notificationBarService:NotificationBarService ,private router:Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.contactId = parseInt(params['id']);
        });
     }
    ngOnInit(){
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
    this.activate();
    }

  savesuccessmessage = '';
  enableOrganisationSelect = true;
  organisationContactsURL = "/contacts/organisationContacts";
  contact:contactInterface={
    id: 0,
    organisationId: "",
    firstName:"",
    lastName: "",
    position: "",
    department: "",
    emailAddress: "",
    telephoneNumber: "",
    cellphone: "",
    individualContactType: "",
    organisationContactCode: "",
    fullName: "" 
  };
  saveButton = false;
  individualContactTypes: any;
  organisationContactCompanyNames:any;
  getData(refresh:boolean) {
    
        this.dataService.getLookupData(webApi.individualContactTypes, refresh).subscribe((response:any)=>{
            this.individualContactTypes = response
        })
        this.dataService.getLookupData(webApi.organisationContactCompanyNames, refresh).subscribe((response:any)=>{
            this.organisationContactCompanyNames = response
        })
        
      if (this.contactId !== 0) {        
        this.dataService.getRecord(webApi.organisationIndividualContact + this.contactId, true).subscribe((result:any)=> {
              this.contact = result;
              this.enableOrganisationSelect = false;
          });
      }
  }

  save (contact:any, frm:any) {
    
      this.messagingService.broadcastCheckFormValidatity();
      if (!frm.invalid) {
          this.saveButton = true;

          this.dataService.post(webApi.saveIndividual, contact).subscribe(()=> {
              this.notificationBarService.success(this.savesuccessmessage);
              this.dataService.invalidateRouteCache(webApi.individualContactsRoute);
              this.dataService.invalidateRouteCache(webApi.individualsByOrganisationRoute + contact.organisationId);
              this.router.navigateByUrl(this.organisationContactsURL);
          });
      }
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.contacts-organisationindividualcontact-savesuccessmessage').subscribe((msg:string)=> {
          this.savesuccessmessage = msg;
      });
  }

  enableSaveButton(args:any) {
      this.saveButton = false;
  }

  activate() {
      this.initTranslation();
      this.getData(true);
  }

  
}