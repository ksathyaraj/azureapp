import { Component, Input, OnInit } from '@angular/core';
import { NavButtonSetting, navButtonGrid } from '../../../interfaces/webclient.interface';
import { DataService } from '../../../services/data.service';
import { webApi } from '../../../services/api/webclient.api';
import { LocalStorageService } from '../../../services/local-storage.service';
import { env } from 'packages/shared-lib/src/environments/environment';

@Component({
  selector: 'lib-nav-button-grid',
  templateUrl: './nav-button-grid.component.html',
  styleUrls: ['./nav-button-grid.component.scss']
})
export class NavButtonGridComponent implements OnInit{
  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService
){}

  @Input() navButtonList: navButtonGrid[] = []

  navButtonListTemp: any[] = []
  noOfGrid = 9
  countryDashboardSettings = [];
  localStorageSessionKey = 'SMEasy-' + env.environment + '-AuthData';
  isAdminLogin:any = false;

  ngOnInit(){
    const localStorageData:any = this.localStorageService.get(this.localStorageSessionKey);
    const filteredLocalStorageData = Object.keys(localStorageData).find((item:string) => {
      return item === 'canImpersonate'
    });
    if(filteredLocalStorageData === 'canImpersonate') {
      this.isAdminLogin = true;
    } else {
      this.getData();
    }
    this.navButtonListTemp=this.navButtonListTemp.concat(this.navButtonList)

    for(let idx=0;idx<this.noOfGrid-this.navButtonList.length;idx++)
      this.navButtonListTemp.push({})
  }

  getData() {
    this.dataService.getLookupData(webApi.countrydashboardsettings, true).subscribe((result: any) =>{
      this.countryDashboardSettings = result;
    });
  }

  isButtonSupported(dashboardButton: string, conditionalRender: boolean) {
    if(conditionalRender !== undefined && !conditionalRender) {
      return false;
    }
    if(dashboardButton !== undefined && dashboardButton !== '') {
     const buttonSetting:NavButtonSetting = this.countryDashboardSettings.find((item:any)=> {return item.dashboardButton.toLowerCase() === dashboardButton.toLowerCase();})!
      if (buttonSetting !== undefined) {
        return typeof buttonSetting === "undefined" ? false : buttonSetting.isSupported
       } else {
        return false
      }
    } else {
      return false;
    }
  }
}
