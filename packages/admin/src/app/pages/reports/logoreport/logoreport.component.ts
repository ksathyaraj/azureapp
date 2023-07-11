import { Component } from "@angular/core";
import { Column, api, resourceMessages, searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { webPortal }  from 'packages/shared-lib/src/lib/services/api/webportal.api';
import { DataService } from "packages/shared-lib/src/lib/services/data.service";

@Component({
  selector: "app-logoreport",
  templateUrl: "./logoreport.component.html",
})
export class LogoreportComponent {
  constructor(
    private dataService: DataService
  ){}
  
  countries:any = [];
  selectedCountries = "";
  exportButton = true;
  inactiveUsersColumns: Column[] = [
    { columnDef: '', header: 'Registered Company'},
    { columnDef: '', header: 'Company Login Name'},
    { columnDef: '',header: 'Company Id'},
    { columnDef: '', header: 'Logo Size in MB'},
    { columnDef: '', header: 'Active'},
  ];
  api: api = {
    get:webPortal.logoReport
  };
  
  title = 'Logo Report (Logos > 5MB)';
  
  searchUIOptions: searchUIOptions = {
    searchInput:true
  };
  
  
  resourceMessages : resourceMessages = {
    noTableDataMessage:"No Items Found.",
    tableSearchPlaceHolder:'search registered company ...'
  };
}
