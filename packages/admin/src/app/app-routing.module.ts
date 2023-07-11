import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { portalAuthGuard } from 'packages/shared-lib/src/lib/services/route-guards/auth-guard'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { ResellerRegistrationComponent } from './pages/companies/reseller-registration/reseller-registration.component';
import { SearchAllCompaniesComponent } from './pages/companies/search-all-companies/search-all-companies.component';
import { FreeTrialRegistrationsComponent } from './pages/companies/free-trial-registrations/free-trial-registrations.component';
import { NewRegistrationComponent } from './pages/companies/new-registration/new-registration.component';
import { WizardReportComponent } from './pages/reports/wizard-report/wizard-report.component';
import { AbsacompaniesComponent } from './pages/companies/absacompanies/absacompanies.component';
import { CampaignRegistrationsComponent } from './pages/companies/campaign-registrations/campaign-registrations.component';
import { CompanyDetailsComponent } from './pages/companies/company-details/company-details.component';
import { RegistrationBatchSettingsComponent } from './pages/absa/registration-batch-settings/registration-batch-settings.component';
import { AllabsacompaniesComponent } from './pages/companies/allabsacompanies/allabsacompanies.component';
import { LicenseesComponent } from './pages/voucher/licensees/licensees.component';
import { PendingPaymentSubscriptionsComponent } from './pages/reports/pending-payment-subscriptions/pending-payment-subscriptions.component';
import { CompanyTypeAuditsComponent } from './pages/reports/company-type-audits/company-type-audits.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReconReportComponent } from './pages/absa/recon-report/recon-report.component';
import { BulklicensedetailsComponent } from './pages/voucher/bulklicensedetails/bulklicensedetails.component';
import { InactiveUsersComponent } from './pages/reports/inactive-users/inactive-users.component';
import { VouchersComponent } from './pages/voucher/vouchers/vouchers.component';
import { AuditingComponent } from './pages/auditing/auditing.component';
import { ElectronicFundsTransferReportComponent } from './pages/reports/electronic-funds-transfer-report/electronic-funds-transfer-report.component';
import { NoDataCapturedComponent } from './pages/reports/no-data-captured/no-data-captured.component';
import { UsageReportComponent } from './pages/reports/usage-report/usage-report.component';
import { LogoreportComponent } from './pages/reports/logoreport/logoreport.component';
import { ActivationComponent } from './pages/absa/activation/activation.component';
import { PayingvouchersreportComponent } from './pages/reports/payingvouchersreport/payingvouchersreport.component';
import { ActiveSubscriptionsComponent } from './pages/reports/active-subscriptions/active-subscriptions.component';
import { CreditCardSignupComponent } from './pages/reports/credit-card-signup/credit-card-signup.component';
import { LastLoggedInReportComponent } from './pages/reports/last-logged-in-report/last-logged-in-report.component';
import { ActivevouchersComponent } from './pages/reports/activevouchers/activevouchers.component';
import { DebitorderreportsComponent } from './pages/reports/debitorderreports/debitorderreports.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'dashboard', component:  DashboardComponent, canActivate:[portalAuthGuard]},
  { path: 'companies', component: CompaniesComponent, canActivate: [portalAuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [portalAuthGuard] },
  { path: 'companies/resellerregistrations',component: ResellerRegistrationComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/campaignregistrations',component: CampaignRegistrationsComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/newregistrations',component: NewRegistrationComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/resellerregistrations', component: ResellerRegistrationComponent, canActivate: [portalAuthGuard] },
  { path: 'companies/resellerregistrations', component: ResellerRegistrationComponent, canActivate: [portalAuthGuard] },
  { path: 'auditing',component: AuditingComponent, canActivate:[portalAuthGuard]},
  { path: 'absabatchactivations',component: ActivationComponent, canActivate:[portalAuthGuard]},
  { path: 'reports/inactiveusersreport',component: InactiveUsersComponent, canActivate:[portalAuthGuard]},
  { path: 'reports/nodatacapturedreport',component: NoDataCapturedComponent, canActivate:[portalAuthGuard]},
  { path: 'reports/usagereport',component: UsageReportComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/absaregistrations', component: AbsacompaniesComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/allabsaregistrations', component: AllabsacompaniesComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/freeregistrations',component: FreeTrialRegistrationsComponent, canActivate:[portalAuthGuard]},
  { path: 'licensees',component: LicenseesComponent, canActivate:[portalAuthGuard]},
  { path: 'licensees/:id',component: BulklicensedetailsComponent, canActivate:[portalAuthGuard]},
  { path: 'licensees/:id/:invoiceNumber',component: VouchersComponent, canActivate:[portalAuthGuard]},
  { path:'companies/searchallcompanies',component: SearchAllCompaniesComponent, canActivate:[portalAuthGuard]},
  { path: 'companies/:id',component: CompanyDetailsComponent, canActivate:[portalAuthGuard]},
  { path:'reports/commandtypeaudits',component: CompanyTypeAuditsComponent, canActivate:[portalAuthGuard]},
  { path:'reports/pendingpaymentssubscriptions',component: PendingPaymentSubscriptionsComponent, canActivate:[portalAuthGuard]},
  { path:'absaregistrationbatchsettings',component: RegistrationBatchSettingsComponent, canActivate:[portalAuthGuard]},
  { path:'absabatchreconreport',component: ReconReportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/wizardreport',component: WizardReportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/electronicfundstransfer',component: ElectronicFundsTransferReportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/wizardreport',component: WizardReportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/commandtypeaudits',component: CompanyTypeAuditsComponent, canActivate:[portalAuthGuard]},
  { path:'reports/wizardreport',component: WizardReportComponent, canActivate:[portalAuthGuard]},
  { path: 'reports/activevouchersubscriptions', component: ActivevouchersComponent, canActivate:[portalAuthGuard]},
  { path:'reports/payingvouchersreport',component: PayingvouchersreportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/logoreport',component: LogoreportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/creditcardsignup',component: CreditCardSignupComponent, canActivate:[portalAuthGuard]},
  { path: 'reports/debitorderreport', component: DebitorderreportsComponent, canActivate:[portalAuthGuard]},
  { path:'reports/lastloggedinreport',component: LastLoggedInReportComponent, canActivate:[portalAuthGuard]},
  { path:'reports/activesubscriptions',component: ActiveSubscriptionsComponent, canActivate:[portalAuthGuard]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }