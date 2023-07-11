import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import Enumerable from 'linq';

@Injectable({
  providedIn: 'root'
})
export class DashboardButtonService {

  constructor(private dataService: DataService) { }

  private countryDashboardSettings: any = {};

  initService(refresh: boolean) {
    this.dataService.getLookupData('/api/countrydashboardsetting/countrydashboardsettings', refresh).subscribe((result: any) =>{
          this.countryDashboardSettings = result;
          // $state.reload();
      });
  }

  IsButtonSupported(dashboardButton: string) {
      const buttonSetting: any = Enumerable.from(this.countryDashboardSettings).where((c: any) => { return c.dashboardButton.toLowerCase() === dashboardButton.toLowerCase(); }).singleOrDefault();
      if (buttonSetting)
        return typeof buttonSetting == "undefined" ? false : buttonSetting.isSupported;
      else
        return false
  }
}
