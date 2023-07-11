import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

    permissions = {
    None: 0,
    CanAccessSettingsCompanyProfile: 1,
    CanAccessSettingsSetup: 2,
    CanAccessSettingsSystemAccess: 3,
    CanAccessContactsCompany: 4,
    CanAccessContactsIndividual: 5,
    CanAccessStaffStaffDetails: 8,
    CanAccessStaffSalarySchedule: 9,
    CanAccessStaffPayslip: 10,
    CanAccessFinanceQuotes: 11,
    CanAccessFinanceInvoicing: 12,
    CanAccessFinanceBusinessCash: 13,
    CanAccessFinanceBankAccounts: 14,
    CanAccessFinanceOwnersMoney: 15,
    CanAccessFinanceBusinessLoans: 16,
    CanAccessReportsWhoOwesUs: 17,
    CanAccessReportsWhoWeOwe: 18,
    CanAccessReportsCashGauge: 19,
    CanAccessReportsWhoOwesUsCustomer: 20,
    CanAccessReportsBankStatements: 21,
    CanAccessReportsVat: 22,
    CanAccessAccountantGeneralLedger: 23,
    CanAccessAccountantIncomeStatement: 24,
    CanAccessAccountantTrailBalance: 25,
    CanAccessAccountantBalanceSheet: 26,
    CanAccessAccountantCustomLedgerAccounts: 27,
    CanAccessAccountantExportData: 28,
    CanAccessAccountantCashFlow: 29,
    CanAccessFinanceInvoiceOut: 30,
    CanAccessFinanceInvoiceIn: 31,
    CanAccessFinanceCreditNote: 32,
    CanAccessAccountantAdjustments: 33,
    CanAccessSettingsImportContactsCsv: 34,
    CanAccessAccountantAskMyAccountant: 35,
    CanAccessFinancePaymentPebble: 36,
    CanAccessSettingVatRegistration: 37,
    CanAccessSettingsImport: 38,
    CanAccessSettingsImportHistoricalBankStatement: 39,
    CanAccessSettingsImportHistoricalCustomerInvoice: 40,
    CanAccessDashboard: 41
  };
  cashFlowType = {
      MoneyIn: 1,
      MoneyOut: 2
  };

  emailTemplateTime = {
      CustomerStatementEmail: 1
  }

  dashboardButtons = {
      MenuContacts: "menu.contacts",
      MenuStaff: "menu.staff",
      MenuFinance: "menu.finance",
      MenuReports: "menu.reports",
      MenuAccountant: "menu.accountant",
      MenuDashboard: "menu.dashboard",
      SettingsCompanyProfile: "settings.companyprofile",
      SettingsSystemUserAccess: "settings.systemuseraccess",
      SettingsImportContacts: "settings.importcontacts",
      ContactsOrganisations: "contacts.organisations",
      ContactsSalesleads: "contacts.salesleads",
      StaffStaffDetails: "staff.staffdetails",
      StaffPayslips: "staff.payslips",
      StaffSalarySchedules: "staff.salaryschedules",
      FinanceQuotes: "finance.quotes",
      FinanceBusinesCash: "finance.businescash",
      FinanceOwnersMoney: "finance.ownersmoney",
      FinanceInvoicing: "finance.invoicing",
      FinanceBankAccounts: "finance.bankaccounts",
      FinanceBankAccountsImport: "finance.bankaccounts.import",
      FinanceBankAccountsAllocate: "finance.bankaccounts.allocate",
      FinanceBankAccountsBankstatements: "finance.bankaccounts.bankstatements",
      FinanceBankAccountsAutomaticBankFeed: "finance.bankaccounts.automaticbankfeed",
      FinanceBusinessLoans: "finance.businessloans",
      FinancePaymentPebble: "finance.paymentpebble",
      FinanceQuotesQuotes: "finance.quotes.quotes",
      FinanceQuotesPricelist: "finance.quotes.pricelist",
      FinanceInvoicingCustomerInvoice: "finance.invoicing.customerinvoice",
      FinanceInvoicingPricelist: "finance.invoicing.pricelist",
      FinanceInvoicingCreditNote: "finance.invoicing.creditnote",
      FinanceInvoicingSupplierInvoice: "finance.invoicing.supplierinvoice",
      ReportsWhoOwesUs: "reports.whoowesus",
      ReportsWhoWeOwe: "reports.whoweowe",
      ReportsCashflow: "reports.cashflow",
      ReportsVat: "reports.vat",
      AccountantGeneralLedger: "accountant.generalledger",
      AccountantIncomeStatement: "accountant.incomestatement",
      AccountantSetup: "accountant.setup",
      AccountantTrialBalance: "accountant.trialbalance",
      AccountantBalanceSheet: "accountant.balancesheet",
      AccountantQuery: "accountant.query",
      AccountantExportData: "accountant.exportdata",
      AccountantAdjustments: "accountant.adjustments",
      AccountantCustomLedger: "accountant.customledger",
      SettingsImportContactsImportCSVFile: "settings.importcontacts.importcsvfile",
      SettingsImportContactsImported: "settings.importcontacts.imported",
      SettingsImport: "settings.import",
      ImportContacts: "settings.import.contacts",
      ImportOrganisations: "settings.import.organisations",
      ImportOrganisationContacts: "settings.import.organisationcontacts",
      ImportBankStatement: "settings.import.bankstatement",
      ImportCustomerInvoice: "settings.import.customerinvoice",
      GenericFinanceBankAccountsImport: "finance.bankaccounts.genericimport"
  }
  //For now keep these in line with the database lookup on the [Country] table
  country = {
      SouthAfrica: 1,
      Nigeria: 131,
      Kenya: 90,
      Rwanda: 146,
      Swaziland: 167,
      Uganda: 182,
      Zambia: 192,
      Ghana: 68
  }

  businessTypeEnum = {
      closeCorpZa: 1,
      companyPtyLtdZa: 3,
      soleProprietorZa: 14,
      nonProfitZa: 15,
      soleProprietorKe: 20,
      partnershipKe: 21,
      companyPtyLtdKe: 22,
      otherKe: 23,
      soleProprietorZw: 24,
      partnershipZw: 25,
      privateBusinessCorporationZw: 26,
      privateLimitedCompanyZw: 27,
      otherZw: 28,
      soleProprietorGh: 29,
      partnershipGh: 30,
      privateLimitedCompanyGh: 31,
      OtherGh: 32,
      soleProprietorNg: 33,
      partnershipNg: 34,
      privateLimitedCompanyNg: 35,
      otherNg: 36,
      soleProprietorRw: 37,
      commercialPartnershipRw: 38,
      limitedLiabilityCompanyRw: 39,
      limitedPartnershipRw: 40,
      otherRw: 41,
      soleProprietorSz: 42,
      partnershipSz: 43,
      privateLimitedLiabilityCompanySz: 44,
      privateUnlimitedLiabilityCompanySz: 45,
      otherSz: 46,
      soleProprietor_ug: 47,
      partnership_ug: 48,
      privateLimitedLiabilityCompany_ug: 49,
      privateUnlimitedLiabilityCompany_ug: 50,
      other_ug: 51,
      soleProprietorZm: 52,
      partnershipZm: 53,
      cCorporationZm: 54,
      sCorporationZm: 55,
      limitedLiabilityCorporationZm: 56,
      limitedPartnershipZm: 57,
      otherZm: 58
  }

  priceListVatChangeOverStatusEnum =
      {
          NotSet: 0,
          IncreaseVatPortion: 1,
          IncreaseListPrice: 2,
          NotAnOption: 3,
          Manual: 4
      }

  exportTypeEnum = {
      GeneralLedgerCsv: 1,
      TrialBalanceCsv: 2,
      IncomeStatementCsv: 3,
      BalanceSheetCsv: 4
  }

}
