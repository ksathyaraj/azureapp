import { Component } from "@angular/core";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { ActivatedRoute } from '@angular/router';
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import Enumerable from "linq";
import { EnumsService } from "packages/shared-lib/src/lib/services/enums.services";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { NavigationService } from "packages/shared-lib/src/lib/services/navigation.service";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-user-permission",
  templateUrl: "./user-permission.component.html",
  styleUrls: ["./user-permission.component.css"],
})
export class UserPermissionComponent {

  userId!: number;
  constructor(private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private enumsService: EnumsService,
    private notificationBarService: NotificationBarService,
    private navigationService: NavigationService,
    private translateService : TranslateService) {

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
  tabData: tabData[] = [
    { routerLink: '../', header: 'resources.settings-users-tabheading-systemuseraccess' },
    { routerLink: '/users/:id/permissions/', header: 'resources.settings-users-tabheading-systemuserpermissions', isActive: true },
  ]

  helpLinkURL = webConstants.userPermissionHelpUrl;
  userPermissionSet: any = "";
  flattened: any = "";
  isSelectAllSelected: boolean = false;
  selectedPermissions: any = "";
  warningmessage = "";
  dataToReturn = {};
  savesuccessmessage = "";
  userPermissionEnum = this.enumsService.permissions;
  userPermissions:boolean = false;

  getUserPermissions() {
    this.dataService.get(webApi.getUserPermission + this.userId)
      .subscribe((result) => {
        this.userPermissionSet = result;
      });
  };

  getFlattenedData() {
    return Enumerable.from(this.userPermissionSet)
      .selectMany((data: any) => {
        return data.value
      }).toArray();
  }

  isSystemLockoutSelected() {
    const flattened = this.getFlattenedData();
    this.userPermissions = false;
    return flattened.filter((data:any)=>{
      if(data.id === this.enumsService.permissions.None) {
        this.userPermissions = data.isAllowed;
        return data;
      }
    })
  }

  systemLockoutPermissionChange() {
    const flattened = this.getFlattenedData();
    this.selectedPermissions = Enumerable.from(flattened)
     .where((c: any) => { return c.id != this.enumsService.permissions.None }).toArray();

    Enumerable.from(this.selectedPermissions).forEach((permissionSelectedData: any) => {
      permissionSelectedData.isAllowed = true;
      if (this.isSystemLockoutSelected()){
        permissionSelectedData.isAllowed = false;
      }
    });
    this.isSelectAllSelected = false;
  };

  save() {
    const flattened = this.getFlattenedData();
    this.selectedPermissions = Enumerable.from(flattened)
      .where((c: any) => {
        return c.isAllowed
      })
      .select((c: any) => {
        return c.id
      }).toArray();

    if (this.selectedPermissions.length <= 0) {
      this.notificationBarService.error(this.warningmessage);
      return;
    }

    this.dataToReturn = {
      UserPermissionSet: this.selectedPermissions,
      UserId: this.userId
    }

    this.dataService.post(webApi.postUserPermission, this.dataToReturn)
      .subscribe(() => {
        this.notificationBarService.success(this.savesuccessmessage);
        this.navigationService.goToParentState();
      });
  };


  selectAllChange() {
    const flattened = this.getFlattenedData();
    if (this.isSelectAllSelected) {
      Enumerable.from(flattened).forEach((data: any) => {
        data.isAllowed = true;
        this.userPermissions = false;
        if (data.id === this.enumsService.permissions.None)
          data.isAllowed = false;
      });
    } else {
      Enumerable.from(flattened).forEach((data: any) => {
        data.isAllowed = false;
        this.userPermissions = true;
        if (data.id === this.enumsService.permissions.None)
          data.isAllowed = true;
      });
    }
  };


  initTranslation() {
    this.translateService.setDefaultLang('en')
    this.translateService.use('en')

    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg:string)=>{
        this.savesuccessmessage = msg;
    });

    this.translateService.get('resources.settings-userpermissions-warningmessage').subscribe((msg:string)=>{
        this.warningmessage = msg;
    });
  }

  activate() {
    this.initTranslation();
    this.getUserPermissions();
  }

  ngOnInit(){
    this.activate();
  }
}
