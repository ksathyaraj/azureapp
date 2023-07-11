import { Component } from "@angular/core";
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service';
import Enumerable from 'linq'
import { TranslateService } from "@ngx-translate/core";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import {salesLeadInterface} from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: "web-sales-lead",
  templateUrl: "./sales-lead.component.html",
})
export class SalesLeadComponent {
  salesLeadId!: number;
  firstContactRelationshipType: any;
  constructor(
    private dataService: DataService,
    private messagingService: MessagingService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.salesLeadId = params['id'];
    });
  }
  savesuccessmessage = '';
  salesLead: salesLeadInterface={
  alternateContactNumber: "",
  cellphone: "",
  company: "",
  companyId: "",
  contactRelationshipType: "",
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  notes: "",
  position: "",
  title: "",
  workContactNumber: "",
  };
  saveButton = false;
  contactRelationshipTypes: any;

  getSalesLead(refresh: boolean) {
    this.dataService.getLookupData(webApi.contactRelationshipType, refresh)
      .subscribe((result: any) => {
        this.contactRelationshipTypes = result;

        if (this.salesLeadId != 0) {
          this.dataService.getRecord(webApi.salesLead + this.salesLeadId)
            .subscribe((results:any) => {
              this.salesLead = results;
            });
        }
        this.init();
      });
  }

  save = (salesLead: salesLeadInterface, frm: any) => {
    this.messagingService.broadcastCheckFormValidatity();

    if (!frm.invalid) {
      this.saveButton = true;

      this.dataService.post(webApi.saveSalesLead, salesLead).subscribe(() => {
        this.notificationBarService.success(this.savesuccessmessage);
        this.dataService.invalidateRouteCache(webApi.salesLeadRoute);
        this.router.navigateByUrl("/contacts/salesleads")
        
      });
    }
  }

  ngOnInit() {
    this.activate();
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
  }

  enableSaveButton(args: any) {
    this.saveButton = false;
  }

  init() {
    if (this.salesLeadId == 0) {
      this.firstContactRelationshipType = Enumerable.from(this.contactRelationshipTypes).firstOrDefault();
      this.salesLead.contactRelationshipType = this.firstContactRelationshipType.key;
    }
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg) => {
      this.savesuccessmessage = msg;
    });
  }

  activate() {
    this.initTranslation();
    this.getSalesLead(true);
  }

}