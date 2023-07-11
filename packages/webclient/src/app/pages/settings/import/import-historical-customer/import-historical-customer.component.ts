import { Component, OnInit } from "@angular/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { Column, api, helpPanelData, settingPages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";

@Component({
  selector: "web-import-historical-customer",
  templateUrl: "./import-historical-customer.component.html"
})
export class ImportHistoricalCustomerComponent{

  blockTemplate = 'resources.common-validation-customerinvoice-import-batchwarning';
  dateFormatLabel = 'resources.settings-import-bankstatement-label-dateformat';
  templatefilepath = webApi.customeInvoiceTemplateFilePath + '?' + webApi.x_api_key;
  lookupfilepath = webApi.customeInvoiceLookupFilePath + '?' + webApi.x_api_key;
  historicalCustomers: Column[] = [
    { columnDef: 'organisationCode', header: 'Organisation Code'},
    { columnDef: 'organisationContactCode', header: 'Organisation Contact Code'},
    { columnDef: 'bankAccountNumber', header: 'Bank Account Number'},
    { columnDef: 'invoiceDate', header: 'Invoice Date'},
    { columnDef: 'orderNumber', header: 'Order Number'},
    { columnDef: 'itemType', header: 'Item Type'},
    { columnDef: 'productDescription', header: 'Product Description'},
    { columnDef: 'qty', header: 'Qty'},
    { columnDef: 'unitPrice', header: 'Unit Price'},
    { columnDef: 'vat', header: 'Unit VAT'},
    { columnDef: 'comments', header: 'Comments'}

  ];
  api: api = {
    post: webApi.customerInvoice,
    getFileUploader: webApi.customerInvoiceFileUpload
  };
  helpPanelData: helpPanelData[] = [
    {header:'resources.common-settings-import-customerinvoice-helppanel-row1-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row1-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row2-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row2-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row3-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row3-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row4-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row4-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row5-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row5-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row6-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row6-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row7-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row7-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row8-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row8-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row9-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row9-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row10-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row10-text'},
    {header:'resources.common-settings-import-customerinvoice-helppanel-row11-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row11-text'},
    // {header:'resources.common-settings-import-customerinvoice-helppanel-row12-heading', data:'resources.common-settings-import-customerinvoice-helppanel-row12-text'},
  ];
  selectOptions = {
    dateFormats: webConstants.dateFormats
  };
  currentPage = settingPages.HistoricalCustomer;
}
