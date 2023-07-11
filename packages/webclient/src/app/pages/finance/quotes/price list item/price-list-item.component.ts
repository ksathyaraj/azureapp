import { Component } from "@angular/core";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "web-price-list-item",
  templateUrl: "./price-list-item.component.html",
})
export class PriceListItemComponent {
  id!:number;
  constructor(private dataService : DataService,private messagingService : MessagingService,private translateService : TranslateService,
    private notificationBarService:NotificationBarService ,private navigationService:NavigationService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.id = parseInt(params['id']);
        });
     }

  saveButton = false;
  savesuccessmessage="";
  pricelistitem:any={};
  getItem () {

    this.dataService.getLookupData('/api/vatInfo', true);


      if (this.id !== 0) {

          this.dataService.getRecord(webApi.getPricelistItem + this.id).subscribe((response:any)=>{
              this.pricelistitem = response;
          })
      }
  }

  save (pricelistitem:any,form:any) {
      this.messagingService.broadcastCheckFormValidatity();

      if (!form.invalid) {
          this.saveButton = true;
          pricelistitem.isDeleted = 0;
          
          this.dataService.post(webApi.savePricelistItem, pricelistitem).subscribe(()=> {
              this.notificationBarService.success(this.savesuccessmessage);
              this.dataService.invalidateRouteCache(webApi.pricelist)
              this.navigationService.goToPricelist();
          });
      }
  }



  enableSaveButton (args:any) {
      this.saveButton = false;
  }

  ngOnInit() {
    this.activate(); 
    this.messagingService.listenGlobalErrorEvent(this.enableSaveButton);
    this.messagingService.listenGlobalWarningEvent(this.enableSaveButton);
  }

  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg:string)=> {
          this.savesuccessmessage = msg;
      });
  }

  activate() {
      this.initTranslation();
      this.getItem();
  }

  
}
