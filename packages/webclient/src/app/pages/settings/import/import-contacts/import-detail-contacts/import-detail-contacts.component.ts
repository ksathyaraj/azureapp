import { Component } from "@angular/core";
import { Column, api, helpPanelData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "web-import-detail-contacts",
  templateUrl: "./import-detail-contacts.component.html"
})
export class ImportDetailContactsComponent {

  blockTemplate = 'resources.settings-importdashboard-paragraph-blockorganisationcontacts';
  templatefilepath = webApi.contactTemplateFilePath + '?' + webApi.x_api_key;
  lookupfilepath = webApi.contactLookupFilePath + '?' + webApi.x_api_key;
  organisationContactColumns: Column[] = [
    { columnDef: 'organisationCode', header: 'OrganisationCode'},
    { columnDef: 'organisationContactCode', header: 'Organisation Contact Code'},
    { columnDef: 'title', header: 'Title'},
    { columnDef: 'firstName', header: 'First Name'},
    { columnDef: 'lastName', header: 'Last Name'},
    { columnDef: 'position', header: 'Position'},
    { columnDef: 'department', header: 'Department'},
    { columnDef: 'emailAddress', header: 'Email Address'},
    { columnDef: 'telephone', header: 'Telephone'},
    { columnDef: 'cellphone', header: 'Cellphone'},
    { columnDef: 'contactType', header: 'Contact Type'}

  ];
  api: api = {
    post: webApi.importOrganisationContacts,
    getFileUploader: webApi.organisationContactFileUpload
  };
  helpPanelData: helpPanelData[] = [
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row1-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row1-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row2-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row2-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row3-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row3-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row4-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row4-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row5-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row5-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row6-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row6-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row7-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row7-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row8-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row8-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row9-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row9-text'},
    {header:'resources.common-settings-import-organisationcontacts-helppanel-row10-heading', data:'resources.common-settings-import-organisationcontacts-helppanel-row10-text'}
  ];
}
