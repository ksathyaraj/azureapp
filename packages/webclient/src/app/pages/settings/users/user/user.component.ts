import { Component } from "@angular/core";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import { SessionService } from "packages/shared-lib/src/lib/services/session.service";

@Component({
  selector: "web-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {

  userId!: number;
  constructor(
    private messagingService: MessagingService,
    private dataService: DataService,
    private navigationService: NavigationService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId == 0) {
        this.tabData.splice(1, 1);
      }
    });
  }
  ngOnInit() {
    this.activate();
  }
  helpLinkUrl = webConstants.userDetailHelpUrl;
  savesuccessmessage = "";
  user: any = {};
  title ="resources.settings-users-panelheading-userdetail";
  tabData: tabData[] = [
    { routerLink: '/users/0', header: 'resources.settings-users-tabheading-systemuseraccess', isActive: true },
    { routerLink: 'permissions', header: 'resources.settings-users-tabheading-systemuserpermissions' },
  ]

  getUser() {
    if (this.userId != 0) {
      this.dataService
        .get(webApi.getUsers + '/' + this.userId)
        .subscribe((result) => {
          this.user = result;
        })
    }
  };

  save(frm: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frm.invalid) {
      this.dataService
        .post(webApi.postUsers, this.user)
        .subscribe(() => {
          this.notificationBarService.success(this.savesuccessmessage);
          this.navigationService.goToParentState();
        });
    }
  };

  initTranslation() {
    this.translateService
      .get('resources.common-messages-savesuccessmessage')
      .subscribe((msg: string) => {
        this.savesuccessmessage = msg;
      });


  }

  activate() {
    if (this.sessionService.isProvisioned == 'True' && this.userId == 0) {
      this.navigationService.goToParentState();
    } else {
      this.initTranslation();
      this.getUser();
    }
  }


}

