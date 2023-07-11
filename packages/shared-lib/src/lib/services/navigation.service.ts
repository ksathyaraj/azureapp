import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { SessionService } from './session.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router,private sessionService: SessionService, private location: Location) { }

  private companyProfileWizardState = 'companyprofilewizard';
  private mtnUpgradeState = 'mtnupgrade';

  goToDashboard() { this.router.navigate(['dashboard']); }

  goToOnboarding() { this.router.navigate(['onboarding']); }

  goToLogin() { this.router.navigate(['login']); }

  goToInsufficientPermissions() { this.router.navigate(['navigationbar.insufficientpermissions']); }

  goToPricelist() { this.router.navigate(['/finance/invoicing/pricelist']); }

  goToContactsDashboard() { this.router.navigate(['navigationbar.contacts']); }

  goToOrganisationContacts() { this.router.navigate(['/contacts/organisations']); }

  goToIndividualContacts() { this.router.navigate(['navigationbar.contacts.organisationindividualcontacts']); }

  goToIndividualContactsByOrganisation(orgId: string) { this.router.navigate(['/contacts/organisations/' + orgId +'/contacts']); }

  goToParentState() { this.location.back(); }

  goToCompanyProfileWizard() { this.router.navigate([this.companyProfileWizardState]); }

  goToQuotes() { this.router.navigate(['navigationbar.finance.quotes.quotes']); }

  goToCustomerInvoices() { this.router.navigate(['/finance/invoicing/customerinvoices']); }

  goToSupplierInvoices() { this.router.navigate(['/finance/invoicing/supplierinvoices']); }

  goToCreditNotes() { this.router.navigate(['/finance/invoicing/creditnotes']); }

  goToBusinessCash() { this.router.navigate(['/finance/businesscash']); }

  goToBankStatementAllocations(bankStatementId: string, ledgerAccountId: string) { this.router.navigate(['/finance/bankaccounts/allocate/' + bankStatementId + '/' + ledgerAccountId]); }

  goToBankStatementAllocation() { this.router.navigate(['/finance/bankaccounts/allocate']); }

  goToBankStatementDashboard() { this.router.navigate(['navigationbar.finance.bankaccounts']); }

  isOnLoginScreen() { return (this.router.url == 'login' || this.router.url == 'forgotpassword' || this.router.url == 'resetpassword') || (this.router.url == 'completeregistration' || this.router.url == 'completeregistrationprepop'); }

  goToForgotPassword() { this.router.navigate(['forgotpassword']); }

  goToCompanyProfile() { this.router.navigate(['navigationbar.settings.companyprofile']) }

  goToCompanyProfileTaxInformation() { this.router.navigate(['/settings/taxinformation']) }

  goToRegisterForVat() { this.router.navigate(['/settings/companyprofile/registerforvat']) }

  goToDeregisterFromVat() { this.router.navigate(['/settings/companyprofile/deregisterfromvat']) }

  goToAddNewBankAccount() { this.router.navigateByUrl('/settings/bankingdetails/bankingdetail/0'); }

  goToAddUser() { this.router.navigate(['/settings/users/0']); }

  goToCashFlow() { this.router.navigate(['/reports/cashflow']); }

  goToMtnUpgrade() { this.router.navigate([this.mtnUpgradeState]); }

  goToCompany(companyId:string) { this.router.navigate(['/companies/company-'+ companyId]); }
  goToUrl(url: string) {
      console.log('navigation.goToUrl - url: ', url);
      if (url.startsWith('http')) {
          window.location.href = url;
      } else {
        this.router.navigate([url]);
      }
  }

  redirectDependingOnCompanyProfile(companyProfile: any, forceRedirectToDashboard: boolean) {
      if (companyProfile && this.sessionService.companyname && companyProfile.sanitizedName.toLowerCase() == this.sessionService.companyname.toLowerCase()) {
          if (companyProfile.isWizardVisible === true) {
              console.log('navigation.redirectDependingOnCompanyProfile: companyProfile.isWizardVisible == true, executing: goToCompanyProfileWizard()');
              this.goToCompanyProfileWizard();
          } else if (companyProfile.isMtnUpgradePending === true) {
              console.log('navigation.redirectDependingOnCompanyProfile: companyProfile.isMtnUpgradePending == true, executing: goToMtnUpgrade()');
              this.goToMtnUpgrade();
          } else if (forceRedirectToDashboard === true) {
              console.log('navigation.redirectDependingOnCompanyProfile: executing: goToDashboard()');
              this.goToDashboard();
          }
      } else {
          console.log('navigation.redirectDependingOnCompanyProfile: companyProfile.sanitizedName.toLowerCase() and Session.companyname.toLowerCase() ARE NOT EQUAL OR NULL - not redirecting anywhere...');
      }
  }
}
