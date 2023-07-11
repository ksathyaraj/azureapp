import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "web-organisation-project",
  templateUrl: "./organisation-project.component.html",
})
export class OrganisationProjectComponent {
  savesuccessmessage = '';
  project:any = {};
  id!:number;
  contactId!:number;
  isExistingRecord = false;
  saveButton = false;
  constructor(private dataService: DataService, private notificationBarService: NotificationBarService, private navigation: NavigationService
    , private modalService: ModalService,private translateService: TranslateService, private activatedRoute: ActivatedRoute,
    private messagingService:MessagingService) {
    
     this.activatedRoute.params.subscribe(params => {
            this.id = parseInt(params['id']);
            this.contactId = parseInt(params['contactId']);
            this.isExistingRecord = this.id !== 0;
        });
    }
  ngOnInit(){
    this.getProject();
    this.initTranslation();
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
  }
  getProject () {
      if (this.id !== 0) {
        this.dataService.getRecord(webApi.getProject + this.id).subscribe((result)=>{
          this.project = result;
        })
      }
      this.dataService.getLookupData(webApi.organisationContactCompanyName + this.contactId, true).subscribe((result:any)=> {
              this.project.company = result[0].value;
          });

          this.dataService.getLookupData(webApi.companyProfile, false, false).subscribe((companyProfile)=> {
          this.checkStartingDetails(companyProfile);
      });
  }

  checkStartingDetails(companyProfile:any) {
      if (companyProfile.projectStartingDetailSet === false) {
          this.modalService.genericStartingDetailsModal(companyProfile.projectPrefix, companyProfile.projectNumber || 1).result.then((result)=> {
              this.dataService.post(webApi.saveProjectStartingDetails, result).subscribe(()=> {
                  this.dataService.getLookupData(webApi.companyProfile, true, false);
              });
          });
      }
  }


  save(project:any, frm:any) {
      this.messagingService.broadcastCheckFormValidatity();

      if (!frm.invalid) {
          this.saveButton = true;

          const projectToSave = {
              id: this.id,
              contactId: this.contactId,
              projectName: project.projectName,
              description: project.description
          };

          this.dataService.post(webApi.saveProject, projectToSave).subscribe(()=>{
            this.notificationBarService.success(this.savesuccessmessage);
            this.dataService.invalidateRouteCache(webApi.getProjects+'/'+this.contactId)
              this.navigation.goToParentState();
          });
      }
  }

  initTranslation() {
      this.translateService.setDefaultLang('en')
      this.translateService.use('en')
      this.translateService.get('resources.contacts-project-savesuccessmessage').subscribe((msg: any) => {
        this.savesuccessmessage = msg;
      });
  }

  enableSaveButton(args:any) {
      this.saveButton = false;
  }
}
