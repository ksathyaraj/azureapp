import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { SharedLibModule } from "shared-lib";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { CashFlowDashboardReportComponent } from "./pages/dashboard/cash-flow-dashboard-report/cash-flow-dashboard-report.component";
import { CashFlowExpenseDashboardReportComponent } from "./pages/dashboard/cash-flow-expense-dashboard-report/cash-flow-expense-dashboard-report.component";
import { DashboardDetailsReportComponent } from "./pages/dashboard/dashboard-details-report/dashboard-details-report.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { InvoiceOwedDashboardReportComponent } from "./pages/dashboard/invoice-owed-dashboard-report/invoice-owed-dashboard-report.component";
import { InvoiceOwingDashboardReportComponent } from "./pages/dashboard/invoice-owing-dashboard-report/invoice-owing-dashboard-report.component";
import { LoginComponent } from "./pages/login/login.component";
import { ForgotPasswordComponent } from "./pages/login/forgot-password.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpHeaderInterceptor } from "packages/shared-lib/src/lib/services/interceptors/http-header.interceptor";
import { appInit } from "packages/shared-lib/src/lib/services/interceptors/app-init";
import { CompanyProfileComponent } from "./pages/settings/company-profile/company-profile.component";
import { IntlModule } from "angular-ecmascript-intl";
import { QuoteComponent } from "./pages/finance/quotes/quotes-page/quote/quote.component";
import { NgChartsModule } from "ng2-charts";
import { SessionService } from "packages/shared-lib/src/lib/services/session.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrganisationDetailsComponent } from "./pages/contacts/organisation-details/organisation-details.component";
import { CurrencyComponent } from "./pages/settings/currency/currency.component";
import { DemoComponent } from "./pages//demo/demo.component";
import { FinanceComponent } from "./pages/finance/finance.component";
import { QuotesComponent } from "./pages/finance/quotes/quotes.component";
import { QuotesPageComponent } from "./pages/finance/quotes/quotes-page/quotes.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { ImportComponent } from "./pages/settings/import/import.component";
import { ImportContactsComponent } from "./pages/settings/import/import-contacts/import-contacts.component";
import { ImportHistoricalBankComponent } from "./pages/settings/import/import-historical-bank/import-historical-bank.component";
import { ImportHistoricalCustomerComponent } from "./pages/settings/import/import-historical-customer/import-historical-customer.component";
import { ImportAllCustomersComponent } from "./pages/settings/import/import-contacts/import-all-customers/import-all-customers.component";
import { ImportDetailContactsComponent } from "./pages/settings/import/import-contacts/import-detail-contacts/import-detail-contacts.component";

import { ToastrModule } from "ngx-toastr";
import { BankingdetailsComponent } from "./pages/settings/bankingdetails/bankingdetails.component";
import { UserDetailsComponent } from "./pages/settings/users/user-details/user-details.component";
import { StaffdetailsComponent } from "./pages/staff/staffdetails/staffdetails.component";
import { StaffComponent } from "./pages/staff/staff.component";
import { OrganisationContactComponent } from "./pages/contacts/organisation-contacts/organisation-contact/organisation-contact.component";
import { SalesLeadComponent } from "./pages/contacts/sales-leads/sales-lead/sales-lead.component";
import { TaxInformationComponent } from "./pages/tax-information/tax-information.component";
import { RegisterForVatComponent } from "./pages/tax-information/register-for-vat/register-for-vat.component";
import { DeregisterFromVatComponent } from "./pages/tax-information/deregister-from-vat/deregister-from-vat.component";
import { StaffdetailComponent } from "./pages/staff/staffdetail/staffdetail.component";
import { BankAccountsComponent } from "./pages/finance/bank-accounts/bank-accounts.component";
import { AllocateComponent } from "./pages/finance/bank-accounts/allocate/allocate.component";
import { SalesLeadsComponent } from "./pages/contacts/sales-leads/sales-leads.component";
import { UserComponent } from "./pages/settings/users/user/user.component";
import { OrganisationContactsComponent } from "./pages/contacts/organisation-contacts/organisation-contacts.component";
import { InvoicingComponent } from "./pages/finance/invoicing/invoicing.component";
import { PriceListComponent } from "./pages/finance/invoicing/price list/price-list.component";
import { AddHistoricalBankComponent } from "./pages/settings/import/import-historical-bank/add-historical-bank/add-historical-bank.component";
import { OrganisationComponent } from "./pages/contacts/organisation-details/organisation/organisation.component";
import { PrefixandstartingnumbersettingsComponent } from "./pages/settings/prefixandstartingnumbersettings/prefixandstartingnumbersettings.component";
import { SupplierInvoicesComponent } from "./pages/finance/invoicing/supplier-invoices/supplier-invoices.component";
import { SupplierInvoiceComponent } from "./pages/finance/invoicing/supplier-invoices/supplier-invoice/supplier-invoice.component";
import { PriceListItemComponent } from "./pages/finance/quotes/price list item/price-list-item.component";
import { CompanySalaryScheduleComponent } from "./pages/staff/company-salary-schedule/company-salary-schedule.component";
import { BusinessCashComponent } from "./pages/finance/business-cash/business-cash.component";
import { AddBusinessCashComponent } from "./pages/finance/business-cash/add-business-cash/add-business-cash.component";
import { SupplierInvoicesOwedComponent } from "./pages/reports/supplier-invoices-owed/supplier-invoices-owed.component";
import { BankStatementsByMonthComponent } from "./pages/finance/bank-accounts/bank-statements/bank-statements-by-month/bank-statements-by-month.component";
import { BankStatementsByUploadComponent } from "./pages/finance/bank-accounts/bank-statements/bank-statements-by-upload/bank-statements-by-upload.component";
import { OwnersmoneyComponent } from "./pages/finance/ownersmoney/ownersmoney.component";
import { PayslipsComponent } from "./pages/staff/payslips/payslips.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { IndividualSalaryScheduleComponent } from "./pages/staff/individual-salary-schedule/individual-salary-schedule.component";
import { CustomerAgeAnalysisComponent } from "./pages/reports/customer-age-analysis/customer-age-analysis.component";
import { CustomLedgerAccountsComponent } from "./pages/accountant/custom-ledger-accounts/custom-ledger-accounts.component";
import { CustomerStatementsComponent } from "./pages/reports/customer-statements/customer-statements.component";
import { UserPermissionComponent } from "./pages/settings/users/user-permission/user-permission.component";
import { CashFlowComponent } from "./pages/reports/cash-flow/cash-flow.component";
import { BankStatementAllocatedItemsComponent } from "./pages/finance/bank-accounts/bank-statements/bank-statement-allocated-items/bank-statement-allocated-items.component";
import { BusinessLoansComponent } from "./pages/finance/business-loans/business-loans.component";
import { CreditnotesComponent } from "./pages/finance/credit-note/creditnotes/creditnotes.component";

import { CustomLedgerAccountComponent } from "./pages/accountant/custom-ledger-account/custom-ledger-account.component";
import { AllocateDetailsComponent } from "./pages/finance/bank-accounts/allocate/allocate-details/allocate-details.component";

import { CustomerInvoicesComponent } from "./pages/finance/invoicing/customer-invoices/customer-invoices.component";
import { PackagedetailsComponent } from "./pages/staff/packagedetails/packagedetails.component";
import { QueryComponent } from "./pages/accountant/query/query.component";
import { CreditNoteComponent } from "./pages/finance/credit-note/credit-note/credit-note.component";
import { SupplierAgeAnalysisComponent } from "./pages/reports/supplier-age-analysis/supplier-age-analysis.component";
import { PayslipComponent } from "./pages/staff/payslips/payslip/payslip.component";
import { CustomerInvoiceComponent } from "./pages/finance/invoicing/customer-invoices/customer-invoice/customer-invoice.component";
import { FilterPipe } from "./pages/reports/cash-flow/custom-filter";
import { AdjustmentComponent } from "./pages/accountant/adjustment/adjustment/adjustment.component";
import { AdjustmentsComponent } from "./pages/accountant/adjustment/adjustments/adjustments.component";
import { VatComponent } from "./pages/reports/vat/vat.component";
import { CustomerInvoiceDueByDateComponent } from "./pages/reports/customer-invoice-due-by-date/customer-invoice-due-by-date.component";
import { BalancesheetComponent } from "./pages/accountant/balancesheet/balancesheet.component";
import { AccountantComponent } from "./pages/accountant/accountant.component";
import { ExportDataComponent } from "./pages/accountant/export-data/export-data.component";
import { SetupComponent } from "./pages/accountant/setup/setup.component";
import { TrialBalanceComponent } from "./pages/accountant/trial-balance/trial-balance.component";
import { AllTransactionsPerCustomerComponent } from "./pages/reports/all-transactions-per-customer/all-transactions-per-customer.component";
import { IncomeStatementComponent } from "./pages/accountant/income-statement/income-statement.component";
import { GeneralLedgerComponent } from "./pages/accountant/general-ledger/general-ledger.component";
import { ImportBankStatementComponent } from "./pages/finance/bank-accounts/import-bank-statement/import-bank-statement.component";
import { OrganisationContactByOrganisationComponent } from "./pages/contacts/organisation-details/organisation/organisation-contact-by-organisation/organisation-contact-by-organisation.component";
import { OrganisationCustomerInvoicesComponent } from "./pages/contacts/organisation-details/organisation/organisation-customer-invoices/organisation-customer-invoices.component";
import { OrganisationCustomerProjectsComponent } from "./pages/contacts/organisation-details/organisation/organisation-customer-projects/organisation-customer-projects.component";
import { OrganisationProjectComponent } from "./pages/contacts/organisation-details/organisation/organisation-customer-projects/organisation-project/organisation-project.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    DashboardDetailsReportComponent,
    CashFlowDashboardReportComponent,
    InvoiceOwedDashboardReportComponent,
    InvoiceOwingDashboardReportComponent,
    CashFlowExpenseDashboardReportComponent,
    ContactsComponent,
    OrganisationContactsComponent,
    OrganisationDetailsComponent,
    SettingsComponent,
    CompanyProfileComponent,
    DemoComponent,
    FinanceComponent,
    QuotesComponent,
    QuotesPageComponent,
    QuoteComponent,
    SettingsComponent,
    ImportComponent,
    ImportContactsComponent,
    ImportHistoricalBankComponent,
    ImportHistoricalCustomerComponent,
    ImportAllCustomersComponent,
    ImportDetailContactsComponent,
    BankingdetailsComponent,
    UserDetailsComponent,
    StaffdetailsComponent,
    StaffComponent,
    OrganisationContactComponent,
    SalesLeadComponent,
    TaxInformationComponent,
    RegisterForVatComponent,
    DeregisterFromVatComponent,
    StaffdetailComponent,
    BankAccountsComponent,
    AllocateComponent,
    AllocateDetailsComponent,
    SalesLeadsComponent,
    UserComponent,
    AddHistoricalBankComponent,
    OrganisationComponent,
    PrefixandstartingnumbersettingsComponent,
    InvoicingComponent,
    PriceListComponent,
    AddHistoricalBankComponent,
    OrganisationComponent,
    PriceListItemComponent,
    UserPermissionComponent,
    PrefixandstartingnumbersettingsComponent,
    SupplierInvoicesComponent,
    SupplierInvoiceComponent,
    PriceListItemComponent,
    BusinessCashComponent,
    OrganisationContactsComponent,
    CurrencyComponent,
    SupplierInvoicesOwedComponent,
    PayslipsComponent,
    ReportsComponent,
    CompanySalaryScheduleComponent,
    CurrencyComponent,
    SupplierInvoicesOwedComponent,
    AddBusinessCashComponent,
    BankStatementsByMonthComponent,
    BankStatementsByUploadComponent,
    IndividualSalaryScheduleComponent,
    CustomerAgeAnalysisComponent,
    CustomLedgerAccountsComponent,
    CustomerStatementsComponent,
    CashFlowComponent,
    CustomerAgeAnalysisComponent,
    FinanceComponent,
    OwnersmoneyComponent,
    UserPermissionComponent,
    CustomLedgerAccountsComponent,
    BankStatementAllocatedItemsComponent,
    BusinessLoansComponent,
    CustomLedgerAccountComponent,
    CreditnotesComponent,
    PackagedetailsComponent,
    CustomerInvoicesComponent,
    QueryComponent,
    CreditnotesComponent,
    CreditNoteComponent,
    SupplierAgeAnalysisComponent,
    CustomerInvoiceComponent,
    PayslipComponent,
    FilterPipe,
    AdjustmentComponent,
    AdjustmentsComponent,
    VatComponent,
    CustomerInvoiceDueByDateComponent,
    BalancesheetComponent,
    AccountantComponent,
    ExportDataComponent,
    SetupComponent,
    TrialBalanceComponent,
    AllTransactionsPerCustomerComponent,
    IncomeStatementComponent,
    GeneralLedgerComponent,
    ImportBankStatementComponent,
    OrganisationContactByOrganisationComponent,
    OrganisationCustomerInvoicesComponent,
    OrganisationCustomerProjectsComponent,
    OrganisationProjectComponent,
  ],
  imports: [
    BrowserModule,
    SharedLibModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
      positionClass: "toast-top-right",
      enableHtml: true,
    }),
    IntlModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [SessionService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
