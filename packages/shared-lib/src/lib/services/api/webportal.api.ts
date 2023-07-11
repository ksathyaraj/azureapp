import * as moment from "moment";
import { env } from "packages/shared-lib/src/environments/environment";
const baseUrl = env.adminServerBaseUrl;
const apiPrefix = '/api/';
const t = moment().millisecond();

export const webPortal = {
  /**
   * Login
   */
  token: baseUrl + apiPrefix + 'oauth/token',
  /**
   * Dashboard
   */
  getCompanies: baseUrl + apiPrefix + 'companies',

  /**
   * Search all companies
   */
  allCompaniesRoute: baseUrl + apiPrefix + 'allcompanies',
  allCompaniesCsv: baseUrl + apiPrefix + 'csv/allcompanies',
  /** 
  Dashboard
   */
  getPortalcountries: baseUrl + apiPrefix + 'portalcountries',
  getSignupDetails: baseUrl + apiPrefix + 'signupdetails',
  getPendingPaymentCount: baseUrl + apiPrefix + 'subscirption/pendingpaymentcount',
  getBulkSMSProfile: baseUrl + apiPrefix + 'bulksms/profile',


   /** 
   * Admin - Companies - New Registration
   **/
    newRegistrations : baseUrl+ apiPrefix +'newregistrations',
   /** 
   * Companies - Reseller Registration
   **/
  resellerregistrations: baseUrl + apiPrefix + 'resellerregistrations' + "?t=" + t,
  /** 
   * Companies - Free Registrations
   **/
  freeRegistrations: baseUrl + apiPrefix + 'freeregistrations' + "?t=" + t,
   /**
   * Reports - Wizard Report
   */
  wizardreport: baseUrl + apiPrefix + 'report/wizardreport'+ "?t=" + t,
  exportWizardReport : baseUrl + apiPrefix + 'csv/wizardreport',
  /**
   * Reports - Paying Vouchers
   */
  paymentVouchersReport: baseUrl + apiPrefix + 'report/paymentvouchersreport',
   /** 
   * Companies - Absa Companies
   **/
  absaCompanies: baseUrl + apiPrefix + 'newregistrations' + '?registrationSources=5,6',
  downloadAbsaCompanies: baseUrl + apiPrefix + 'csv/absanewregistrations',
   /** 
   * Companies - All Absa Companies
   **/
  refreshRegistrations: baseUrl + apiPrefix + 'csv/allabsaregistrations/requests',
  allabsaRegistrations: baseUrl + apiPrefix + 'csv/start/allabsaregistrations',

  //companies - Campaign Registrations
  getCampaignRegistrations: baseUrl + apiPrefix + 'campaignregistrations'+"?t="+t,
  /** 
   * Vouchers - Licensees 
   **/
  getLicensees: baseUrl + apiPrefix + 'licensees',
  getLicenseID: baseUrl + apiPrefix + 'licensee?id=',
  getBulkLicenses: baseUrl + apiPrefix + 'bulklicense?licenseeId=',
  getBulkLicenseDetails: baseUrl + apiPrefix + 'bulklicensedetails?invoiceNumber=',
  getLicenseeId : '&licenseeId=',
  saveVoucherPaymentType : baseUrl + apiPrefix + 'savevoucherpaymenttype',
  downloadVouchers: baseUrl + apiPrefix + 'downloadvouchers',
  saveLicenses: baseUrl + apiPrefix + 'savelicensees',
  
  //companydetails
  comapnyDetails: baseUrl + apiPrefix + '/companydetails',
  sendfreetrialendingemail: baseUrl + apiPrefix + '/sendfreetrialendingemail?id=',
  sendsubscriptionendingemail: baseUrl + apiPrefix + '/subscription/sendsubscriptionendingemail/',
  queryandupdatepesapalpaymentstatus: baseUrl + apiPrefix + '/subscription/queryandupdatepesapalpaymentstatus/',
  activate: baseUrl + apiPrefix + '/subscription/activate/',
  suspend: baseUrl + apiPrefix + '/subscription/suspend/',


  //Absa -Registration batch settings
  getAbsaRegistrationBatchSettings : baseUrl + apiPrefix + 'automatedjobstatus',
  saveAutomatedJobStatus : baseUrl + apiPrefix + 'saveautomatedjobstatus',
  subscriptionHistory: baseUrl + apiPrefix + '/subscriptionHistory',
  addcompanyhistoryrecord: baseUrl + apiPrefix + '/addcompanyhistoryrecord',
  changereportingcategory: baseUrl + apiPrefix + '/subscription/changereportingcategory',
  getsubscriptionreportingcategory: baseUrl + apiPrefix + '/getsubscriptionreportingcategory',
  absahandover: baseUrl + apiPrefix + '/absa/handover',
  subscriptionchangeexpiry: baseUrl + apiPrefix + '/subscription/changeexpiry',
  subscriptionsuspend: baseUrl + apiPrefix + '/subscription/suspend/',
  subscriptionextend: baseUrl + apiPrefix + '/subscription/extend/',
  subscriptionactivate: baseUrl + apiPrefix + '/subscription/activate/',

   /**
   * Reports - Pending Payment
   */
  pendingpaymentsreport: baseUrl + apiPrefix + 'report/pendingpaymentsreport',
   /**
   * Reports - Command Audit types
   */
  commandAuditTypes: baseUrl + apiPrefix + 'auditbytypes',

  /**
   * Absa - Recon Report
   */
   getAbsaBatchRecon: baseUrl + apiPrefix + 'absa/batchrecon',
   getAbsaBatchIndicators : baseUrl + apiPrefix + 'absa/batchindicators',



   /**
   * Reports -Inactive users
   */
   getInactiveUsersReport: baseUrl + apiPrefix + 'report/inactiveusersreport',
   getInactiveUsersReportCsv: baseUrl + apiPrefix + 'csv/inactiveusersreport',
   /**
   * Reports - No Data Captured
   */
    getNoDataCapturedReport: baseUrl + apiPrefix + 'report/nodatacapturedreport',
    getNoDataCapturedReportCsv: baseUrl + apiPrefix + 'csv/nodatacapturedreport',
    /**
     * Reports - usage reports
     */
    getUsageReport: baseUrl + apiPrefix + 'report/usagereport',
    detailedReport: baseUrl + apiPrefix + 'report/csv/detailedusagereport',
    usageReport: baseUrl + apiPrefix + 'report/csv/usagereport',
    /**
    * Auditing
    */
    getAuditing: baseUrl + apiPrefix + 'audits',
    getAudit: baseUrl + apiPrefix + 'audit',
   /**
    * Reports - EFT report
    */
   electronicfundstransferreport: baseUrl + apiPrefix + 'report/electronicfundstransferreport',
   emailelectronicfundstransferreport: baseUrl + apiPrefix + 'report/emailelectronicfundstransferreport',
    /**
     * ABSA - activation
     */
    getAbsaBatchActivation: baseUrl + apiPrefix + 'absabatchactivations',
    uploadAbsaBatch: baseUrl + apiPrefix + 'post/absabatchactivationsupload',
    postAbsaBatch: baseUrl + apiPrefix + 'promoteabsaactivationtoregistration?absaActivationsId=',
    /**
     * Reports - Logo Report
     */
    logoReport: baseUrl + apiPrefix + 'report/logoreport',
     /**
     * Reports - Active Companies
     */
    getActiveSubscriptionSummary: baseUrl + apiPrefix + 'report/activesubscriptionssummary',
    activesubscriptionsdetail: baseUrl + apiPrefix + 'report/activesubscriptionsdetail',
    exportActiveSubscription: baseUrl + apiPrefix +'csv/activesubscriptionsdetail',


    //Reports- Last Logged in Report
    getLastLoggedinReport : baseUrl + apiPrefix + 'report/lastloggedinreport',
    emailLastLoggedinReport :baseUrl + apiPrefix + 'report/emaillastloggedinreport',
    /**
     * Reports - Credit card report
     */
    getCreditCardSignUpReport: baseUrl + apiPrefix + 'report/creditcardsignupreport',
    emailCreditCardReport:baseUrl + apiPrefix + 'report/emailcreditcardsignupreport',
    /** 
    * Active Voucher
    */
    getActiveVoucherReport: baseUrl + apiPrefix + 'report/activevouchersubscriptionreport',

  /**
   * Debit Order
   */
  debitOrderReport: baseUrl + apiPrefix + 'report/debitorderreport',
  emaildebitOrderReport: baseUrl + apiPrefix + 'report/emaildebitorderreport',
};

Object.freeze(webPortal);