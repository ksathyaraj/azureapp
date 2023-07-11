import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password.component';


import { authGuard } from 'packages/shared-lib/src/lib/services/route-guards/auth-guard'
import { CompanyProfileComponent } from './pages/settings/company-profile/company-profile.component';
import { OrganisationDetailsComponent } from './pages/contacts/organisation-details/organisation-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DemoComponent } from './pages/demo/demo.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { QuotesComponent } from './pages/finance/quotes/quotes.component';
import { QuotesPageComponent } from './pages/finance/quotes/quotes-page/quotes.component';
import { QuoteComponent } from './pages/finance/quotes/quotes-page/quote/quote.component';
import { ImportComponent } from './pages/settings/import/import.component';
import { ImportContactsComponent } from './pages/settings/import/import-contacts/import-contacts.component';
import { ImportHistoricalBankComponent } from './pages/settings/import/import-historical-bank/import-historical-bank.component';
import { ImportHistoricalCustomerComponent } from './pages/settings/import/import-historical-customer/import-historical-customer.component';
import { ImportAllCustomersComponent } from './pages/settings/import/import-contacts/import-all-customers/import-all-customers.component';
import { ImportDetailContactsComponent } from './pages/settings/import/import-contacts/import-detail-contacts/import-detail-contacts.component';
import { BankingdetailsComponent } from './pages/settings/bankingdetails/bankingdetails.component';
import { UserDetailsComponent } from './pages/settings/users/user-details/user-details.component';
import { StaffdetailsComponent } from './pages/staff/staffdetails/staffdetails.component';
import { StaffComponent } from './pages/staff/staff.component';
import { OrganisationContactComponent } from './pages/contacts/organisation-contacts/organisation-contact/organisation-contact.component';
import { TaxInformationComponent } from './pages/tax-information/tax-information.component';
import { DeregisterFromVatComponent } from './pages/tax-information/deregister-from-vat/deregister-from-vat.component';
import { RegisterForVatComponent } from './pages/tax-information/register-for-vat/register-for-vat.component';
import { AllocateComponent } from './pages/finance/bank-accounts/allocate/allocate.component';

import { StaffdetailComponent } from './pages/staff/staffdetail/staffdetail.component';
import { SalesLeadComponent } from './pages/contacts/sales-leads/sales-lead/sales-lead.component';
import { SalesLeadsComponent } from './pages/contacts/sales-leads/sales-leads.component';
import { UserComponent } from './pages/settings/users/user/user.component';
import { OrganisationContactsComponent } from './pages/contacts/organisation-contacts/organisation-contacts.component';
import { InvoicingComponent } from './pages/finance/invoicing/invoicing.component';
import { PriceListComponent } from './pages/finance/invoicing/price list/price-list.component';
import { AddHistoricalBankComponent } from './pages/settings/import/import-historical-bank/add-historical-bank/add-historical-bank.component';
import { OrganisationComponent } from './pages/contacts/organisation-details/organisation/organisation.component';
import { PrefixandstartingnumbersettingsComponent } from './pages/settings/prefixandstartingnumbersettings/prefixandstartingnumbersettings.component';
import { SupplierInvoicesComponent } from './pages/finance/invoicing/supplier-invoices/supplier-invoices.component';
import { SupplierInvoiceComponent } from './pages/finance/invoicing/supplier-invoices/supplier-invoice/supplier-invoice.component';
import { OwnersmoneyComponent } from './pages/finance/ownersmoney/ownersmoney.component';
import { PriceListItemComponent } from './pages/finance/quotes/price list item/price-list-item.component';
import { CompanySalaryScheduleComponent } from './pages/staff/company-salary-schedule/company-salary-schedule.component';
import { ImportBankStatementComponent } from './pages/finance/bank-accounts/import-bank-statement/import-bank-statement.component';
import { BusinessCashComponent } from './pages/finance/business-cash/business-cash.component';
import { AddBusinessCashComponent } from './pages/finance/business-cash/add-business-cash/add-business-cash.component';
import { CurrencyComponent } from './pages/settings/currency/currency.component';
import { BankAccountsComponent } from './pages/finance/bank-accounts/bank-accounts.component';
import { BankStatementsByMonthComponent } from './pages/finance/bank-accounts/bank-statements/bank-statements-by-month/bank-statements-by-month.component';
import { BankStatementsByUploadComponent } from './pages/finance/bank-accounts/bank-statements/bank-statements-by-upload/bank-statements-by-upload.component';
import { AddNewAccountModalComponent } from 'packages/shared-lib/src/lib/ui/elements/modal/webClient/addNewAccountModal/add-new-account-modal.component';
import { PayslipsComponent } from './pages/staff/payslips/payslips.component';
import { PayslipComponent } from './pages/staff/payslips/payslip/payslip.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { IndividualSalaryScheduleComponent } from './pages/staff/individual-salary-schedule/individual-salary-schedule.component';
import { CustomerAgeAnalysisComponent } from './pages/reports/customer-age-analysis/customer-age-analysis.component';
import { CustomLedgerAccountsComponent } from './pages/accountant/custom-ledger-accounts/custom-ledger-accounts.component';
import { CustomerStatementsComponent } from './pages/reports/customer-statements/customer-statements.component';
import { CashFlowComponent } from './pages/reports/cash-flow/cash-flow.component';
import { UserPermissionComponent } from './pages/settings/users/user-permission/user-permission.component';
import { BankStatementAllocatedItemsComponent } from './pages/finance/bank-accounts/bank-statements/bank-statement-allocated-items/bank-statement-allocated-items.component';
import { BusinessLoansComponent } from './pages/finance/business-loans/business-loans.component';
import { CustomLedgerAccountComponent } from './pages/accountant/custom-ledger-account/custom-ledger-account.component';
import { AllocateDetailsComponent } from './pages/finance/bank-accounts/allocate/allocate-details/allocate-details.component';
import { QueryComponent } from './pages/accountant/query/query.component';
import { CreditnotesComponent } from './pages/finance/credit-note/creditnotes/creditnotes.component';
import { CustomerInvoicesComponent } from './pages/finance/invoicing/customer-invoices/customer-invoices.component';
import { CustomerInvoiceComponent } from './pages/finance/invoicing/customer-invoices/customer-invoice/customer-invoice.component';
import { CreditNoteComponent } from './pages/finance/credit-note/credit-note/credit-note.component';
import { PackagedetailsComponent } from './pages/staff/packagedetails/packagedetails.component';
import { SupplierInvoicesOwedComponent } from './pages/reports/supplier-invoices-owed/supplier-invoices-owed.component';
import { SupplierAgeAnalysisComponent } from './pages/reports/supplier-age-analysis/supplier-age-analysis.component';
import { AdjustmentsComponent } from './pages/accountant/adjustment/adjustments/adjustments.component';
import { AdjustmentComponent } from './pages/accountant/adjustment/adjustment/adjustment.component';
import { VatComponent } from './pages/reports/vat/vat.component';
import { CustomerInvoiceDueByDateComponent } from './pages/reports/customer-invoice-due-by-date/customer-invoice-due-by-date.component';
import { AccountantComponent } from './pages/accountant/accountant.component';
import { SetupComponent } from './pages/accountant/setup/setup.component';
import { ExportDataComponent } from './pages/accountant/export-data/export-data.component';
import { BalancesheetComponent } from './pages/accountant/balancesheet/balancesheet.component';
import { TrialBalanceComponent } from './pages/accountant/trial-balance/trial-balance.component';
import { AllTransactionsPerCustomerComponent } from './pages/reports/all-transactions-per-customer/all-transactions-per-customer.component';
import { IncomeStatementComponent } from './pages/accountant/income-statement/income-statement.component';
import { GeneralLedgerComponent } from './pages/accountant/general-ledger/general-ledger.component';
import { OrganisationContactByOrganisationComponent } from './pages/contacts/organisation-details/organisation/organisation-contact-by-organisation/organisation-contact-by-organisation.component';
import { OrganisationCustomerProjectsComponent } from './pages/contacts/organisation-details/organisation/organisation-customer-projects/organisation-customer-projects.component';
import { OrganisationCustomerInvoicesComponent } from './pages/contacts/organisation-details/organisation/organisation-customer-invoices/organisation-customer-invoices.component';
import { OrganisationProjectComponent } from './pages/contacts/organisation-details/organisation/organisation-customer-projects/organisation-project/organisation-project.component';



const routes: Routes = [
 { path: 'login', component:  LoginComponent},
  { path: 'forgotpassword', component:  ForgotPasswordComponent},
  { path: 'dashboard', component:  DashboardComponent, canActivate:[authGuard]},
  { path: 'contacts', component:  ContactsComponent, canActivate:[authGuard]},
  { path: 'finance', component:  FinanceComponent, canActivate:[authGuard]},
  { path: 'finance/businessloans', component:  BusinessLoansComponent, canActivate:[authGuard]},
  { path: 'finance/ownersmoney', component:  OwnersmoneyComponent, canActivate:[authGuard]},
  { path: 'finance/quotes', component:  QuotesComponent, canActivate:[authGuard]},
  { path: 'finance/quotes/quotes', component:  QuotesPageComponent, canActivate:[authGuard]},
  { path: 'finance/quotes/quotes/:id', component:  QuoteComponent, canActivate:[authGuard]},
  { path: 'finance/quotes/pricelist', component:  PriceListComponent, canActivate:[authGuard]},
  { path: 'finance/quotes/pricelist/:id', component:  PriceListItemComponent, canActivate:[authGuard]},
  { path: 'finance/invoicing', component:  InvoicingComponent, canActivate:[authGuard]},
  { path: 'finance/bankaccounts', component:  BankAccountsComponent, canActivate:[authGuard]},
  { path: 'finance/bankaccounts/allocate', component:  AllocateComponent, canActivate:[authGuard]},
  { path: 'finance/bankaccounts/allocate/:id/:accountId', component:  AllocateDetailsComponent, canActivate:[authGuard]},
  { path: 'finance/bankaccounts', component:  BankAccountsComponent, canActivate:[authGuard]},
  { path: 'finance/bankaccounts/import', component:  ImportBankStatementComponent, canActivate:[authGuard]},
  { path: 'finance/invoicing/pricelist', component:  PriceListComponent, canActivate:[authGuard]},
  { path: "finance/invoicing/supplierinvoices", component: SupplierInvoicesComponent, canActivate: [authGuard]},
  { path: "finance/invoicing/supplierinvoices/:id", component: SupplierInvoiceComponent, canActivate: [authGuard]},
  { path: "finance/invoicing/customerinvoices", component: CustomerInvoicesComponent, canActivate: [authGuard]},
  { path: "finance/invoicing/customerinvoices/:id", component: CustomerInvoiceComponent, canActivate: [authGuard]},
  { path: 'contacts/organisations', component:  OrganisationDetailsComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:id', component:  OrganisationComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:id/contacts', component:  OrganisationContactByOrganisationComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:organisationId/contacts/:id', component:  OrganisationContactComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:id/projects', component:  OrganisationCustomerProjectsComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:contactId/projects/:id', component:  OrganisationProjectComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:id/invoices', component:  OrganisationCustomerInvoicesComponent, canActivate:[authGuard]},
  { path: 'contacts/organisationContacts', component: OrganisationContactsComponent, canActivate: [authGuard] },
  { path: 'contacts/organisationContacts/:id', component:  OrganisationContactComponent, canActivate:[authGuard]},
  { path: 'contacts/salesleads/:id', component:  SalesLeadComponent, canActivate:[authGuard]},
  { path: 'contacts/salesleads',component: SalesLeadsComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations/:id', component:  OrganisationDetailsComponent, canActivate:[authGuard]},
  { path: 'settings', component:  SettingsComponent, canActivate:[authGuard]},
  { path: 'settings/companyprofile', component:  CompanyProfileComponent, canActivate:[authGuard]},
  { path: 'settings/currency', component:  CurrencyComponent, canActivate:[authGuard]},
  { path: 'settings/import', component:  ImportComponent, canActivate:[authGuard]},
  { path: 'settings/prefixandstartingnumber', component:  PrefixandstartingnumbersettingsComponent, canActivate:[authGuard]},
  { path: 'settings/import/import', component:  ImportContactsComponent, canActivate:[authGuard]},
  { path: 'settings/import/imports/bankstatement', component:  ImportHistoricalBankComponent, canActivate:[authGuard]},
  { path: 'settings/bankingdetails/bankingdetail/:id', component:  AddHistoricalBankComponent, canActivate:[authGuard]},
  { path: 'settings/import/imports/customerinvoice', component:  ImportHistoricalCustomerComponent, canActivate:[authGuard]},
  { path: 'settings/import/import/organisations', component:  ImportAllCustomersComponent, canActivate:[authGuard]},
  { path: 'settings/import/imports/organisationcontacts', component:  ImportDetailContactsComponent, canActivate:[authGuard]},
  { path: 'contacts/organisations', component:  OrganisationDetailsComponent, canActivate:[authGuard]},
  { path: 'settings/companyprofile', component:  CompanyProfileComponent, canActivate:[authGuard]},
  { path: 'settings/users', component:  UserDetailsComponent, canActivate:[authGuard]},
  { path: 'settings/users/:id', component: UserComponent, canActivate:[authGuard]},
  { path: 'settings/users/:id/permissions', component: UserPermissionComponent, canActivate:[authGuard]},
  { path: 'settings/bankingdetails', component:  BankingdetailsComponent, canActivate:[authGuard]},
  { path: 'staff', component:  StaffComponent, canActivate:[authGuard]},
  { path: 'staff/staffdetails', component:  StaffdetailsComponent, canActivate:[authGuard]},
  { path: 'staff/staffdetails/:id/packagedetails', component: PackagedetailsComponent, canActivate:[authGuard]},
  { path: 'staff/payslips', component:  PayslipsComponent, canActivate:[authGuard]},
  { path: 'staff/payslips/:id', component:  PayslipComponent, canActivate:[authGuard]},
  { path: 'settings/taxinformation', component: TaxInformationComponent, canActivate: [authGuard] },
  { path: "settings/companyprofile/deregisterfromvat", component: DeregisterFromVatComponent, canActivate: [authGuard] },
  { path: "settings/companyprofile/registerforvat", component: RegisterForVatComponent, canActivate: [authGuard]},
  { path: "finance/bankaccounts", component: BankAccountsComponent, canActivate: [authGuard]},
  { path: "finance/bankaccounts/bankstatementsbymonth", component: BankStatementsByMonthComponent, canActivate: [authGuard]},
  { path: "finance/bankaccounts/bankstatementsbyupload", component: BankStatementsByUploadComponent, canActivate: [authGuard]},
  { path: "finance/bankaccounts/bankstatementsbymonth/:id/:year/:month", component: BankStatementAllocatedItemsComponent, canActivate: [authGuard]},
  { path: "finance/bankaccounts/bankstatementsbyupload/:id", component: BankStatementAllocatedItemsComponent, canActivate: [authGuard]},
  { path: "finance/bankaccounts/allocate/:bankStatementId/:ledgerAccountId", component: AllocateComponent, canActivate: [authGuard]},
  { path: "finance/businesscash", component: BusinessCashComponent, canActivate: [authGuard]},
  { path: "finance/businesscash/addbusinesscash", component: AddBusinessCashComponent, canActivate: [authGuard]},
  { path: 'demo', component: DemoComponent, canActivate: [authGuard] },
  {path: 'staff/staffdetails/:id', component: StaffdetailComponent, canActivate:[authGuard]},
  {path: 'staff/companysalaryschedule', component: CompanySalaryScheduleComponent, canActivate:[authGuard]},
  {path: 'dashboard/addnew', component: AddNewAccountModalComponent},
  {path: 'reports', component: ReportsComponent, canActivate:[authGuard]},
  {path: 'reports/cashflow', component: CashFlowComponent, canActivate:[authGuard]},
  {path: 'reports/vat', component: VatComponent, canActivate:[authGuard]},
  {path: 'staff/individualsalaryschedule', component: IndividualSalaryScheduleComponent, canActivate:[authGuard]},
  {path:'reports/customerageanalysis',component:CustomerAgeAnalysisComponent,canActivate:[authGuard]},
  {path: 'accountant/trialbalance', component: TrialBalanceComponent, canActivate:[authGuard]},
  {path: 'accountant/generalledger', component: GeneralLedgerComponent, canActivate:[authGuard]},
  {path: 'accountant/customledgeraccounts', component: CustomLedgerAccountsComponent, canActivate:[authGuard]},
  {path: 'reports/customerstatementbycustomer', component: CustomerStatementsComponent, canActivate:[authGuard]},
  {path: 'accountant/customledgeraccounts/add', component: CustomLedgerAccountComponent, canActivate:[authGuard]},
  { path: 'finance/invoicing/creditnotes', component: CreditnotesComponent, canActivate:[authGuard]},
  {path: 'accountant/customledgeraccounts/add', component: CustomLedgerAccountComponent, canActivate:[authGuard]},
  {path: 'accountant/query', component: QueryComponent, canActivate:[authGuard]},
  {path: 'accountant/exportdata', component: ExportDataComponent, canActivate:[authGuard]},
  {path: 'accountant/incomestatement', component: IncomeStatementComponent, canActivate:[authGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'reports/supplierinvoicesowed', component: SupplierInvoicesOwedComponent, canActivate: [authGuard] },
  { path: 'reports/supplierageanalysis', component: SupplierAgeAnalysisComponent, canActivate: [authGuard] },
  { path: 'finance/invoicing/creditnotes', component: CreditnotesComponent, canActivate:[authGuard]},
  { path: 'finance/invoicing/creditnotes/:creditNoteId/customerinvoice/:invoiceOutId', component:  CreditNoteComponent, canActivate:[authGuard]},
  {path: 'accountant/adjustments', component: AdjustmentsComponent, canActivate:[authGuard]},
  {path: 'accountant/adjustments/add', component: AdjustmentComponent, canActivate:[authGuard]},
  {path: 'accountant/balancesheet', component: BalancesheetComponent, canActivate:[authGuard]},
  {path: 'reports/customerinvoicesdue',component:CustomerInvoiceDueByDateComponent,canActivate:[authGuard]},
  {path: 'reports/customerinvoicesduebycustomer', component:AllTransactionsPerCustomerComponent, canActivate:[authGuard]},
  {path: 'accountant',component:AccountantComponent,canActivate:[authGuard]},
  {path: 'accountant/setup', component: SetupComponent, canActivate:[authGuard]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
