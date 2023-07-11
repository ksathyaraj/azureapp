import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { SharedLibModule } from "shared-lib";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NgChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { IntlModule } from "angular-ecmascript-intl";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PortalHttpHeaderInterceptor } from "packages/shared-lib/src/lib/services/portal/http-header.interceptor";
import { portalAppInit } from "packages/shared-lib/src/lib/services/interceptors/app-init";
import { PortalSessionService } from "packages/shared-lib/src/lib/services/portal/session.service";
import { LoginComponent } from "./pages/login/login.component";
import { CompaniesComponent } from "./pages/companies/companies.component";
import { ResellerRegistrationComponent } from "./pages/companies/reseller-registration/reseller-registration.component";
import { SearchAllCompaniesComponent } from "./pages/companies/search-all-companies/search-all-companies.component";
import { FreeTrialRegistrationsComponent } from "./pages/companies/free-trial-registrations/free-trial-registrations.component";
import { AbsacompaniesComponent } from "./pages/companies/absacompanies/absacompanies.component";
import { NewRegistrationComponent } from "./pages/companies/new-registration/new-registration.component";
import { WizardReportComponent } from "./pages/reports/wizard-report/wizard-report.component";
import { CampaignRegistrationsComponent } from "./pages/companies/campaign-registrations/campaign-registrations.component";
import { CompanyDetailsComponent } from "./pages/companies/company-details/company-details.component";
import { RegistrationBatchSettingsComponent } from "./pages/absa/registration-batch-settings/registration-batch-settings.component";
import { AllabsacompaniesComponent } from "./pages/companies/allabsacompanies/allabsacompanies.component";
import { LicenseesComponent } from "./pages/voucher/licensees/licensees.component";
import { PendingPaymentSubscriptionsComponent } from "./pages/reports/pending-payment-subscriptions/pending-payment-subscriptions.component";
import { CompanyTypeAuditsComponent } from "./pages/reports/company-type-audits/company-type-audits.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { BulklicensedetailsComponent } from "./pages/voucher/bulklicensedetails/bulklicensedetails.component";
import { InactiveUsersComponent } from "./pages/reports/inactive-users/inactive-users.component";
import { ElectronicFundsTransferReportComponent } from "./pages/reports/electronic-funds-transfer-report/electronic-funds-transfer-report.component";
import { VouchersComponent } from "./pages/voucher/vouchers/vouchers.component";
import { AuditingComponent } from "./pages/auditing/auditing.component";
import { NoDataCapturedComponent } from "./pages/reports/no-data-captured/no-data-captured.component";
import { PayingvouchersreportComponent } from "./pages/reports/payingvouchersreport/payingvouchersreport.component";
import { UsageReportComponent } from "./pages/reports/usage-report/usage-report.component";
import { ActivevouchersComponent } from "./pages/reports/activevouchers/activevouchers.component";
import { LogoreportComponent } from "./pages/reports/logoreport/logoreport.component";
import { ActivationComponent } from "./pages/absa/activation/activation.component";
import { ActiveSubscriptionsComponent } from "./pages/reports/active-subscriptions/active-subscriptions.component";
import { CreditCardSignupComponent } from "./pages/reports/credit-card-signup/credit-card-signup.component";
import { DebitorderreportsComponent } from "./pages/reports/debitorderreports/debitorderreports.component";
import { ReconReportComponent } from "./pages/absa/recon-report/recon-report.component";
import { LastLoggedInReportComponent } from "./pages/reports/last-logged-in-report/last-logged-in-report.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CompaniesComponent,
    ResellerRegistrationComponent,
    SearchAllCompaniesComponent,
    AbsacompaniesComponent,
    FreeTrialRegistrationsComponent,
    NewRegistrationComponent,
    WizardReportComponent,
    CampaignRegistrationsComponent,
    CompanyDetailsComponent,
    RegistrationBatchSettingsComponent,
    AllabsacompaniesComponent,
    LicenseesComponent,
    PendingPaymentSubscriptionsComponent,
    CompanyTypeAuditsComponent,
    ReportsComponent,
    BulklicensedetailsComponent,
    InactiveUsersComponent,
    ElectronicFundsTransferReportComponent,
    VouchersComponent,
    AuditingComponent,
    NoDataCapturedComponent,
    PayingvouchersreportComponent,
    UsageReportComponent,
    ActivevouchersComponent,
    LogoreportComponent,
    ActivationComponent,
    ActiveSubscriptionsComponent,
    CreditCardSignupComponent,
    DebitorderreportsComponent,
    ReconReportComponent,
    LastLoggedInReportComponent,
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
      useClass: PortalHttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: portalAppInit,
      multi: true,
      deps: [PortalSessionService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
