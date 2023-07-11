import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MtnService {

  constructor(private dataService: DataService) { }

  upgradeWithExistingFreeTrialCompany () {
    return this.dataService.post('/api/mtn/upgrade/keep-free-trial-company', {});
}

  doesCompanyLoginNameExist (companyLoginName:string) {
      return this.dataService.get('/api/registration/doescompanysanitizednameexist/' + companyLoginName);
  }

  upgradeWithNewCompany () {
      return this.dataService.post('/api/mtn/upgrade/new-company', { });
  }

}
