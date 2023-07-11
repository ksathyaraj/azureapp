import { Injectable } from '@angular/core';
import { DataService } from './data.service'
import { webApi } from './api/webclient.api';

@Injectable({
  providedIn: 'root'
})
export class LookupDataService {

  constructor(private dataService : DataService) { }

  private getPricelistRoute = '/api/pricelist';

  clearCache() {
      return this.dataService.invalidateCache();
  }

  getSetupWizardQuestions(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/setupwizardquestions', refresh);
  }

  getProvisioningProviders(refresh: boolean) {
      return this.dataService.getLookupData('/api/provisioning/providers', refresh);
  }

  getBusinessTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/businessTypes', refresh);
  }

  getBusinessTypesForCompanySettings(countryId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/businessTypesForCompanySettings/' + countryId, refresh);
  }

  getCompanyProfileImage(refresh: boolean, hideOverlay: boolean) {
      return this.dataService.getLookupData(webApi.companyProfileImage, refresh, hideOverlay);
  }

  getCompanyProfile(refresh: boolean, hideOverlay: boolean) {
      return this.dataService.getLookupData('/api/companyProfile', refresh, hideOverlay);
  }

  getBankingDetailsForReference(refresh: boolean) {
      return this.dataService.getLookupData('/api/bankingDetailsForReference', refresh);
  }

  getBankingDetailsForImport(refresh: boolean) {
      return this.dataService.getLookupData('/api/bankingDetailsForImport', refresh);
  }

  getBankingDetails(refresh: boolean) {
      return this.dataService.getLookupData('/api/bankingDetails', refresh);
  }

  getPartnerapps(refresh: boolean) {
      return this.dataService.getLookupData('/api/integration/authorisedapps', refresh);
  }

  getPricelist(refresh: boolean) {
      return this.dataService.getLookupData(this.getPricelistRoute, refresh);
  }

  getBankingDetail(bankId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/bankingDetails/' + bankId, refresh);
  }

  getContactRelationshipType(refresh: boolean) {
      return this.dataService.getLookupData('/api/contactRelationshipTypes', refresh);
  }

  getIndividualContactTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/individualContactTypes', refresh);
  }

  getOrganisationContactCompanyNames(refresh: boolean) {
      return this.dataService.getLookupData('/api/organisationContactCompanyNames', refresh);
  }

  getOrganisationContactCompanyName(contactId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/organisationContactCompanyName/' + contactId, refresh);
  }

  getProvinces(countryId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/provinces/' + countryId, refresh);
  }

  getCountries(refresh: boolean) {
      return this.dataService.getLookupData('/api/countries', refresh);
  }

  getSupportedCountries(refresh: boolean) {
      return this.dataService.getLookupData('/api/supportedcountries', refresh);
  }

  getTradingStatusTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/tradingStatusTypes', refresh);
  }

  getStaffType(refresh: boolean) {
      return this.dataService.getLookupData('/api/staffTypes', refresh);
  }

  getExportTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/exportTypes', refresh);
  }

  getExportTypesEnum(refresh: boolean) {
      return this.dataService.getLookupData('/api/exportTypesEnum', refresh);
  }

  getPayPackageType(refresh: boolean) {
      return this.dataService.getLookupData('/api/payPackageTypes', refresh);
  }

  getInvoiceInItemTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/invoiceInItemTypes', refresh);
  }

  getLedgerActionTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/ledgerActionTypes', refresh);
  }

  getQuoteItemTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/quoteItemTypes', refresh);
  }

  getInvoiceOutItemTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/invoiceOutItemTypes', refresh);
  }

  getCreditNoteItemTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/creditNoteItemTypes', refresh);
  }

  getBusinessCashItemTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/businessCashItemTypes', refresh);
  }

  getCashGaugeItemTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/cashGaugeItemTypes', refresh);
  }

  getStaffMembers(refresh: boolean) {
      return this.dataService.getLookupData('/api/staffmembers', refresh);
  }

  getCurrentlyEmployedStaffMembers(refresh: boolean) {
      return this.dataService.getLookupData('/api/currentlyemployedstaffmembers', refresh);
  }

  getSuppliers(refresh: boolean, filtered: boolean) {
      const url = filtered ? 'api/suppliers-filtered' : 'api/suppliers';
      return this.dataService.getLookupData(url, refresh);
  }

  getSupplierInvoices(supplierId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/supplierinvoices/' + supplierId, refresh);
  }

  getCustomers(refresh: boolean, filtered: boolean) {
      const url = filtered ? '/api/customers-filtered' : '/api/customers';
      return this.dataService.getLookupData(url, refresh);
  }

  getInvoiceableContacts(refresh: boolean, filtered: boolean) {
      const url = filtered ? '/api/invoiceablecontacts-filtered' : '/api/invoiceablecontacts';
      return this.dataService.getLookupData(url, refresh);
  }

  getInvoiceableContact(contactId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/invoiceablecontacts/' + contactId, refresh);
  }

  getIsOrganisationContactCustomerType(organisationContactId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/isOrganisationContactCustomerType/' + organisationContactId, refresh);
  }

  getBankStatementAccounts(refresh: boolean) {
      return this.dataService.getLookupData('/api/bankstatementaccounts', refresh);
  }

  getTaxYears(refresh: boolean) {
      return this.dataService.getLookupData('/api/taxyears', refresh);
  }

  getloanAccountMembers(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/loanaccountmembers', refresh);
  }

  getBusinessLoanAccountMembers(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/businessloanaccounts', refresh);
  }

  getbusinessCashMonths(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/businesscashmonths', refresh);
  }

  getCustomerInvoicesDueByCustomer(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/customerInvoicesDueByCustomer', refresh);
  }

  getBanks(refresh: boolean) {
      return this.dataService.getLookupData('/api/banks', refresh);
  }

  getBankAccountTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/bankAccountTypes', refresh);
  }

  getContactRelationshipTypeEnums(refresh: boolean) {
      return this.dataService.getLookupData('/api/contactRelationshipTypesEnums', refresh);
  }

  getCustomersWithInvoices(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/customersWithInvoices', refresh);
  }

  getSuppliersWithInvoices(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/suppliersWithInvoices', refresh);
  }

  getCustomersWithCreditNotes(refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/customersWithCreditNotes', refresh);
  }

  getUnpaidFinalisedCustomerInvoices(customerId: string, refresh: boolean) {
      return this.dataService.getLookupData('/api/lookups/unpaidfinalisedcustomerinvoices/' + customerId, refresh);
  }

  getDebtorsCreditorsOpeningBalance(refresh: boolean) {
      return this.dataService.getLookupData('/api/debtorsCreditorsOpeningBalance', refresh);
  }

  public getCustomerInvoicesWithDetails(contactId: string) {
      const paramFilters: any = {};
      paramFilters["contactId"] = contactId;
      return this.dataService.getRecordWithParams('/api/customerInvoicesWithDetails', paramFilters);
  }

  public getCustomerCreditNotesWithDetails(contactId: string) {
      const paramFilters: any = {};
      paramFilters["contactId"] = contactId;
      return this.dataService.getRecordWithParams('/api/customerCreditNotesWithDetails', paramFilters);
  }

  getSupplierInvoicesWithDetails(contactId: string) {
      const paramFilters: any = {};
      paramFilters["contactId"] = contactId;
      return this.dataService.getRecordWithParams('/api/supplierInvoicesWithDetails', paramFilters);
  }

  getLedgerAccounts(refresh: boolean) {
      return this.dataService.getLookupData('/api/ledgeraccounts', refresh);
  }

  getBusinessCashLedgerAccounts(refresh: boolean) {
      return this.dataService.getLookupData('/api/businesscashledgeraccounts', refresh);
  }

  getVatInfo() {
      return this.dataService.getLookupData('/api/vatInfo', true);
  }

  getCountryVatRate(countryId: string) {
      const paramFilters: any = {};
      paramFilters["countryId"] = countryId;
      return this.dataService.getRecordWithParams('/api/countryVatRate', paramFilters);
  }

  getCustomLedgerAccountDetails(refresh: boolean) {
      return this.dataService.getLookupData('/api/customLedgerAccountDetails', refresh);
  }
  getImportContactsDataFieldTypes(refresh: boolean) {
      return this.dataService.getLookupData('/api/ImportContactsDataFieldTypes', refresh);
  }

  getEmploymentStatus(refresh: boolean) {
      return this.dataService.getLookupData('/api/employmentStatus', refresh);
  }
}
