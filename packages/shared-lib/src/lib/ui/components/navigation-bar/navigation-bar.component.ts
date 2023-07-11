import { Component, Input } from '@angular/core';
import { DashboardButtonService } from '../../../services/dashboard-button.service';
import { NavigationService } from '../../../services/navigation.service';
import { AuthService } from '../../../services/auth.service';
import { EnumsService }  from '../../../services/enums.services';

@Component({
  selector: 'lib-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(
                private dashboardButtonService: DashboardButtonService,
                private navigationService: NavigationService,
                private authService: AuthService,
                private enumsService: EnumsService
            ){}

@Input() isAdminSectionEnable = false;          

  back() {
    this.navigationService.goToParentState();
  }

  dashboardButtons = this.enumsService.dashboardButtons;
  permissions = this.enumsService.permissions;

  IsButtonSupported(id: any) {
      // return this.dashboardButtonService.IsButtonSupported(id);
      return true
  }

  isDashboardButtonAllowed(isButtonSupportedId: any, permission: any) {
      // return this.IsButtonSupported(isButtonSupportedId) && this.authService.hasRequiredPermission(permission);
      return true
  }
}
