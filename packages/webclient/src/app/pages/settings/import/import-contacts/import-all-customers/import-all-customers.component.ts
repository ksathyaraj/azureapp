import { Component, OnInit } from "@angular/core";
import { webApi }  from 'packages/shared-lib/src/lib/services/api/webclient.api';
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { Column, api } from "packages/shared-lib/src/lib/interfaces/webclient.interface";

@Component({
  selector: "web-import-all-customers",
  templateUrl: "./import-all-customers.component.html"
})
export class ImportAllCustomersComponent implements OnInit{

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getData();
  }

  templatefilepath = webApi.templatefilepath + '?' + webApi.x_api_key;
  lookupfilepath = '';
  blockTemplate = 'resources.settings-importdashboard-paragraph-blockorganisation';
  helpPanelData: any = [
    {header:'resources.common-settings-import-organisation-helppanel-row1-heading',data:'resources.common-settings-import-organisation-helppanel-row1-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row2-heading',data:'resources.common-settings-import-organisation-helppanel-row2-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row3-heading',data:'resources.common-settings-import-organisation-helppanel-row3-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row4-heading',data:'resources.common-settings-import-organisation-helppanel-row4-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row5-heading',data:'resources.common-settings-import-organisation-helppanel-row5-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row6-heading',data:'resources.common-settings-import-organisation-helppanel-row6-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row7-heading',data:'resources.common-settings-import-organisation-helppanel-row7-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row8-heading',data:'resources.common-settings-import-organisation-helppanel-row8-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row9-heading',data:'resources.common-settings-import-organisation-helppanel-row9-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row10-heading',data:'resources.common-settings-import-organisation-helppanel-row10-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row11-heading',data:'resources.common-settings-import-organisation-helppanel-row11-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row12-heading',data:'resources.common-settings-import-organisation-helppanel-row12-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row13-heading',data:'resources.common-settings-import-organisation-helppanel-row13-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row15-heading',data:'resources.common-settings-import-organisation-helppanel-row14-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row15-heading',data:'resources.common-settings-import-organisation-helppanel-row15-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row16-heading',data:'resources.common-settings-import-organisation-helppanel-row16-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row17-heading',data:'resources.common-settings-import-organisation-helppanel-row17-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row18-heading',data:'resources.common-settings-import-organisation-helppanel-row18-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row19-heading',data:'resources.common-settings-import-organisation-helppanel-row19-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row20-heading',data:'resources.common-settings-import-organisation-helppanel-row20-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row21-heading',data:'resources.common-settings-import-organisation-helppanel-row21-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row22-heading',data:'resources.common-settings-import-organisation-helppanel-row22-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row23-heading',data:'resources.common-settings-import-organisation-helppanel-row23-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row24-heading',data:'resources.common-settings-import-organisation-helppanel-row24-text'},
    {header:'resources.common-settings-import-organisation-helppanel-row25-heading',data:'resources.common-settings-import-organisation-helppanel-row25-text'}
  ];
  api: api = {
    post: webApi.importOrganisations,
    getFileUploader: webApi.organisationFileUpload
  };
  organisationColumns: Column[] = [
    { columnDef: 'organisationCode', header: 'Organisation Code'},
    { columnDef: 'organisationName', header: 'Organisation Name'},
    { columnDef: 'tradingAs', header: 'Trading As'},
    { columnDef: 'relationshipType', header: 'Relationship Type'},
    { columnDef: 'website', header: 'Website'},
    { columnDef: 'telephone', header: 'Telephone'},
    { columnDef: 'fax', header: 'Fax'},
    { columnDef: 'physicalAddressLine1', header: 'Physical Address Line1'},
    { columnDef: 'physicalAddressLine2', header: 'Physical Address Line2'},
    { columnDef: 'physicalAddressCityTown', header: 'physical Address City Town'},
    { columnDef: 'physicalAddressCode', header: 'Physical Address Code'},
    { columnDef: 'physicalAddressCountry', header: 'Physical Address Country'},
    { columnDef: 'physicalAddressProvince', header: 'Physical Address Province'},
    { columnDef: 'postalAddressLine1', header: 'Postal Address Line1'},
    { columnDef: 'postalAddressLine2', header: 'Postal Address Line2'},
    { columnDef: 'postalAddressCityTown', header: 'Postal Address City Town'},
    { columnDef: 'postalAddressCode', header: 'Postal Address Code'}, 
    { columnDef: 'postalAddressCountry', header: 'Postal Address Country'},
    { columnDef: 'postalAddressProvince', header: 'Postal Address Province'},
    { columnDef: 'vatNumber', header: 'Vat Number'},
    { columnDef: 'businessType', header: 'Business Type'},
    { columnDef: 'supplierNumber', header: 'Supplier Number'},
    { columnDef: 'registrationNumber', header: 'Registration Number'},
    { columnDef: 'status', header: 'Status'},
    { columnDef: 'notes', header: 'Notes'}
  ];

  getData() {
    this.dataService
      .getRecord(webApi.userContacts)
      .subscribe((data: any) => {
        this.lookupfilepath = webApi.files + data.countryCode + webApi.lookupfilepath + '?' + webApi.x_api_key;
      });
  }
}
