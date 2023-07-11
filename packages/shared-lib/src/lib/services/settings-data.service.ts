import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsDataService {


  constructor(private dataService: DataService,
  ) { }

  getPrefixInformation(): any {
    return this.dataService.getRecord('/api/prefixInformation');
  };

  postPrefixInformation(prefixInformation: any): any {
    return this.dataService.post('/api/post/prefixInformation', prefixInformation);
  };


  saveCurrencySettings(currencyId: any, currencyToShowOnPdfReports: any): any {
    var data = {
      currencyId: currencyId,
      currencyToShowOnPdfReports: currencyToShowOnPdfReports
    };
    return this.dataService.post('/api/settings/savecurrency', data);
  };


  getCurrencySettings(): any {
    return this.dataService.getRecord('/api/settings/currency');
  };

}
