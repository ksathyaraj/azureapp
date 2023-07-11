import { Component } from "@angular/core";

import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { DataService } from 'packages/shared-lib/src/lib/services//data.service';
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import {tabData } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';

@Component({
  selector: "web-prefixandstartingnumbersettings",
  templateUrl: "./prefixandstartingnumbersettings.component.html",
})
export class PrefixandstartingnumbersettingsComponent {
  constructor(
    private dataService:DataService,
    private modalService: ModalService,
    private notificationBarService: NotificationBarService,
    private messagingService:MessagingService,
    private translateService:TranslateService,
   ) {}

         supportVideoBaseUrl = webConstants.prefixSettingsVideoURL;
         prefixInformation:any={};
         saveSuccessMessage = '';
         modelHeading = '';
         numberInfo = "";
         frmcompanyprofile:any
         
        getData (refresh?:boolean) {
            this.dataService.getRecord(webApi.prefixInformation).subscribe((response:any)=> {
                this.prefixInformation = response;
            });
        }

        save (frmcompanyprofile:any) {
            this.messagingService.broadcastCheckFormValidatity();
            if (!frmcompanyprofile.invalid) {
                this.dataService.post(webApi.postPrefixInformation,this.prefixInformation)
                    .subscribe(()=> {
                        this.messagingService.broadcastCompanyProfileSaved();
                        this.notificationBarService.success(this.saveSuccessMessage);
                    });
            }
        }

        showInfo () {
            this.modalService.messageModal(this.modelHeading, this.numberInfo);
        }

        initTranslation() {

            this.translateService.setDefaultLang('en')

            this.translateService.use('en')
        
            this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg:any)=> {
                this.saveSuccessMessage = msg;
            });

            this.translateService.get('resources.prefixandstartingnumbersettings-controller-title-numbersettings').subscribe((msg:any)=>{
                this.modelHeading = msg;
            });

            this.translateService.get('resources.prefixandstartingnumbersettings-controller-numberinfo').subscribe((msg:any)=> {
                this.numberInfo = msg;
            });
        }

        activate() {
            this.initTranslation();
            this.getData();

        }
        ngOnInit(){
          this.activate();
        }  
        tabData: tabData[] = [
            {routerLink: '/settings/companyprofile', header: 'resources.settings-companyprofile-tabheading-companyprofile'},
            {routerLink: '/settings/taxinformation', header: 'resources.settings-companyprofile-tabheading-taxinformation'},
            {routerLink: '/settings/prefixandstartingnumber', header: 'resources.settings-companyprofile-tabheading-prefixandstartingnumbersettings', isActive: true},
            {routerLink: '/settings/bankingdetails', header: 'resources.settings-companyprofile-tabheading-bankingdetails'},
            {routerLink: '/settings/currency', header: 'resources.settings-companyprofile-tabheading-currency'},
            {routerLink: '/settings/partnerapps', header: 'Partner Apps'}
          ];

}
