import { Component } from '@angular/core';
import { navButtonGrid } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { EnumsService } from 'packages/shared-lib/src/lib/services/enums.services';

@Component({
  selector: 'web-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent{
  constructor(
    private enumService: EnumsService
){}

  navButtonList: navButtonGrid[] = [
    {
      text:'CUSTOMERS / SUPPLIERS',
      subText:'Organisations',
      sref: '/contacts/organisations',
      buttonSupportName: this.enumService.dashboardButtons.ContactsOrganisations
    },
    {
      text:'SALES LEADS',
      sref: '/contacts/salesleads',
      buttonSupportName: this.enumService.dashboardButtons.ContactsSalesleads
    }
  ];
}
