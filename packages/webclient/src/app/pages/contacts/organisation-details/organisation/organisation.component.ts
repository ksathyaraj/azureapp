import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import Enumerable from "linq";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { ContactsDataService } from "packages/shared-lib/src/lib/services/contacts-data.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { ActivatedRoute } from "@angular/router";
import {OrganisationInterface, tabData} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";


@Component({
  selector: "web-organisation",
  templateUrl: "./organisation.component.html",
})
export class OrganisationComponent {
  organisationId !: number;
  viewInfoHeading = '';
  viewInfoMessage = '';
  successMessage = '';
  addressesHelpInfo='';
isOrganisationContactCustomerType: any;         
contactRelationshipTypes: any;
enableRelationship = true;
countries: any;
enableProvinceSelect: any;
provinces:any;
businessTypes: any;
tradingStatusTypes: any;
saveButton = false;

  organisation:OrganisationInterface={
   id: 0,
  organisationId: "0",
  companyName: "",
  organisationCode:"",
  tradingAs: "",
  telephone: "",
  contactRelationshipType: "",
  fax: "",
  website: "",
  postalIsSameAsPhysicalAddress : false,
  physicalAddress: {
    addressLine1: "",
    addressLine2: "",
    town: "",
    code: "",
    countryId: "",
    provinceId: ""
  },
  postalAddress: {
    addressLine1: "",
    addressLine2: "",
    town: "",
    code: "",
    countryId: "",
    provinceId: ""
  },
  vatNumber: "",
  companyRegistrationNumber: "",
  businessType: "",
  tradingStatusId: "",
  supplierNumber: "",
  notes: ""

  };

  
  constructor(private dataService : DataService,private contactsDataService : ContactsDataService, private navigation: NavigationService
    , private notificationBarService: NotificationBarService, private modalService: ModalService, private messagingService: MessagingService, private translateService: TranslateService,private activatedRoute: ActivatedRoute, private lookupDataService : LookupDataService) {
    
     this.activatedRoute.params.subscribe(params => {
            this.organisationId = parseInt(params['id']);
        });
    }
  
    tabData: tabData[] = [
      {routerLink: '.', header: 'resources.contacts-organisations-organisationdetails-tabheading-organisationdetail', isActive: true}
    ];

  ngOnInit() {
    this.initTranslation();
    this.getOrganisation(true);
    if(this.organisationId!==0){
      this.tabData.push(
        {routerLink: 'contacts', header: 'resources.contacts-organisations-contacts-tabheading-contacts', isActive: false},
      {routerLink: 'projects', header: 'resources.contacts-organisations-projects-tabheading-projects', isActive: false},
      )
      if(this.isOrganisationContactCustomerType){
        this.tabData.push({routerLink: 'invoices', header: 'resources.contacts-organisations-invoices-tabheading-invoices', isActive: false})
      }
    }
    
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
    this.messagingService.listenGlobalTranslationRefresh(this.initTranslation);
      
  }

    enableSaveButton(args:any) {
      this.saveButton = false;
  }
    initTranslation() {
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
       this.translateService.get('resources.contacts-organisations-organisationdetails-addnew-viewinfo-message').subscribe((msg:string)=> {
          this.viewInfoMessage = msg;
      });
      this.translateService.get('resources.contacts-organisations-successmessage').subscribe((msg:string)=> {
          this.successMessage = msg;
      });
    }
   getOrganisation(refresh: boolean) {
     this.dataService.getLookupData(webApi.contactRelationshipTypeFilePath, refresh).subscribe((response: any) => {
       this.contactRelationshipTypes = Object.keys(response).map(key => ({ key: response[key], value: key }));
     }),
       this.dataService.getLookupData(webApi.countriesFilePath, refresh).subscribe((response: any) => {
         this.countries = response;
       }),
       this.dataService.getLookupData(webApi.businessTypesFilePath, refresh).subscribe((response: any) => {
        this.businessTypes = response;
         if (this.organisationId == 0) {
           const businessType: any = Enumerable.from(this.businessTypes).firstOrDefault();
           this.organisation.businessType = businessType.key;
         }
       });
     this.dataService.getLookupData(webApi.tradingStatusTypesFilePath, refresh).subscribe((response: any) => {
       this.tradingStatusTypes = response;
       if (this.organisationId == 0) {
         const tradingStatusType: any = Enumerable.from(this.tradingStatusTypes).firstOrDefault();
         this.organisation.tradingStatusId = tradingStatusType.key;
       }
     });
     
      if (this.organisationId !== 0) {
        this.dataService.getRecord(webApi.organisationFilePath + this.organisationId, true).subscribe((response: any) => {
          this.organisation = response;
          this.organisation.postalAddress={
            addressLine1: "",
            addressLine2: "",
            town: "",
            code: "",
            countryId: "",
            provinceId: ""
          }
          this.organisation.physicalAddress={
            addressLine1: "",
            addressLine2: "",
            town: "",
            code: "",
            countryId: "",
            provinceId: ""
          }
        });
        this.dataService.getLookupData(webApi.isOrganisationContactCustomerTypeFilepath + this.organisationId, refresh).subscribe((response: any) => {
          this.isOrganisationContactCustomerType = response;
          if(response)this.tabData.push({routerLink: 'invoices', header: 'resources.contacts-organisations-invoices-tabheading-invoices', isActive: false})
        });

      if (this.organisation.physicalAddress && this.organisation.physicalAddress.countryId) {
        this.countryChange(this.organisation.physicalAddress.countryId);
        }
      }
    }
  
  countryChange(countryId: any) {
    this.provinces = null;
    this.dataService.getLookupData(webApi.provincesFilePath + countryId, true).subscribe((data: any) => {
      this.provinces = data.length == 0 ? null : data;});
   }
  
  postalIsSameAsPhysicalAddressChange() {
            if (this.organisation.postalIsSameAsPhysicalAddress) {
              this.organisation.postalAddress = { ...this.organisation.physicalAddress };
    }
  }
  
  showInfo() {
     this.translateService.get('resources.contacts-organisations-addresses-helpinfo').subscribe((msg:string)=> {
          this.addressesHelpInfo = msg;
     });
     this.translateService.get('resources.contacts-organisations-organisationdetails-addnew-viewinfo-heading-addresses').subscribe((msg:string)=> {
          this.viewInfoHeading = msg;
     });
    this.modalService.messageModal(this.viewInfoHeading, this.viewInfoMessage);
  }

  save(organisation:any, frm:any) {
            this.messagingService.broadcastCheckFormValidatity();

            if (!frm.invalid) {
              this.saveButton = true;
              this.dataService.post(webApi.saveOrganisationContactFilePath , organisation).subscribe((data: any) => {
                this.notificationBarService.success(this.successMessage);
                this.contactsDataService.clearOrganisationContactsCache();
                this.navigation.goToOrganisationContacts();

              })
            }
        }


}
