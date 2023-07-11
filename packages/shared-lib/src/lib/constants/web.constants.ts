import { env } from "packages/shared-lib/src/environments/environment";
const supportVideoUrl = env.supportVideoBaseUrl;
export const webConstants = {

  // Prefixandstartingnumber settings page
  prefixSettingsVideoURL: supportVideoUrl + 'enZA/videos/addcompanyprofile',

  // allocate page
  alloacteVideoURL: supportVideoUrl + 'enZA/videos/allocate',

  // pricelist page
  pricelistVideoURL: supportVideoUrl + 'enZA/videos/pricelist',

   /**
   * settings/bankingdetails page
   */
  exportDataVideoURL: supportVideoUrl + 'enZA/videos/exportdata',

    /**
   * settings/bankingdetails page
   */
  bankingDetailsVideoURL: supportVideoUrl + 'enZA/videos/addcompanyprofile',
  deleteConfirmationMessage: 'Are you sure you want to delete',
  deletedSuccessMessage: 'Deleted successfully',
  /**
   * Contacts page
   */
  organisationDetailsHelpURL: supportVideoUrl + 'enZA/videos/contacts',
  projectHelpURL: supportVideoUrl + 'enZA/videos/addproject',

  /**
   * finance/Business Cash page
   */
  businessCashHelpVideoURL: env.supportVideoBaseUrl + 'enZA/videos/businesscash',

  /**
 * Sales Leads page
 */
  supportVideoUrl: supportVideoUrl + 'enZA/videos/salesleads',

  /**
 * Staff Details page
 */
  staffDetailsHelpURL: supportVideoUrl + 'enZA/videos/addstaff',
  /**
   * * Payslips page
 */
  searchPayslipURL: supportVideoUrl + 'enZA/videos/searchpayslip',
  /**
   *  * Payslips + page
 */
  addPayslipVideoUrl: supportVideoUrl + 'enZA/videos/addpayslip',
  /**
   * Supplier invoice - finance page
   */
  supplierInvoiceHelpURL: supportVideoUrl + 'videos/invoicein',

  
  /**
 * Company Profile -Settings page
 */
   companyProfileHelpUrl: supportVideoUrl + 'enZA/videos/addcompanyprofile',

  /**
   * Cash flow page - reports page 
   */ 
  cashFlowHelpUrl : supportVideoUrl + 'enZA/videos/cashflowreport',
   /**
    * Staff Details page
    */
  ownersMoneyURL: supportVideoUrl + 'enZA/videos/ownersmoney',

  /**
 * Package Details - Staff
 */
  packageDetailsURL: supportVideoUrl + 'enZA/videos/staffpackagedetails',

  /**
   * Settings page
   */
  /**
  * System User acces page - User Details 
   */
   userDetailHelpUrl:supportVideoUrl+ 'videos/systemuserdetails',
   userPermissionHelpUrl : supportVideoUrl + 'videos/systemuseraccess',
   /**
    * Quotes page - finance
    */
   quotesHelpURL: supportVideoUrl + 'enZA/videos/addquote',
   /**
    * Business Loans page - finance
    */
   businessLoansURL: supportVideoUrl + 'enZA/videos/businessloans',

    /**
    * Supplier Invoice 
    */
  supplierInvoiceOwedHelpURL: supportVideoUrl + 'enZA/videos/whoweowereport',
  supplierAgeAnalysisHelpURL: supportVideoUrl + 'enZA/videos/supplierageanalysisreport',

   /**
  * Salary schedule - 
   */
    companySalaryScheduleHelpUrl:supportVideoUrl+ 'videos/companysalaryschedule',
  individualSalaryScheduleHelpUrl: supportVideoUrl + 'videos/individualsalaryschedule',

   /**
  * Accountant - general ledger
   */
   generalLedgerHelpURL: supportVideoUrl + 'enZA/videos/generalledger',

   /**
  * Accountant - Trial balance
   */
  trialBalanceHelpURL: supportVideoUrl + 'enZA/videos/trialbalance',

  /**
  * Accountant - custom ledger
   */
  customLedgerAccountHelpUrl: supportVideoUrl+ 'enZA/videos/customledgeraccounts',


     /**
  * customer age analysis - 
   */
    customerAgeAnalysisHelpUrl : supportVideoUrl + 'videos/customerageanalysisreport',
   /**
  * Accountant - query 
   */
  queryHelpUrl : supportVideoUrl + 'videos/askmyaccountant',
  /**
   * Vat - reports page
   */
  reportHelpUrl: supportVideoUrl + 'videos/vatreport',
    /**
  * bank-statements view by month - 
   */
    bankStatementsViewByMonthHelpUrl: supportVideoUrl + 'videos/savedbankstatements',

   /**
  * Reports - Customer invoices due by date
   */
    customerInvoiceHelpUrl :supportVideoUrl +'videos/whoowesusreport',
  /**
  * Finance - Credit Note
   */
  creditNoteHelpUrl: supportVideoUrl + 'enZA/videos/creditnote',
    /**
  * Reports - Supplier Invoice Owed
   */
  supplierInvoiceOwedHelpUrl : supportVideoUrl + 'enZA/videos/whoweowereport',
  /**
 * Accountant- Adjustments
 */
  adjustmentHelpUrl: supportVideoUrl + 'enZA/videos/adjustments',
    /**
 * Accountant- Set Up
 */
  setUpHelpURL : supportVideoUrl + 'enZA/videos/setup',


   /**
  * Accountant - Balance Sheet
   */
   balanceSheetURL: supportVideoUrl + 'enZA/videos/balancesheet',

    /**
  * Accountant - Balance Sheet
   */
  incomeStatementURL: supportVideoUrl + 'enZA/videos/incomestatement',


  dateFormats: [
    { dateFormat: 'dd/MM/yyyy' },
    { dateFormat: 'dd-MM-yyyy' },
    { dateFormat: 'd/M/yyyy' },
    { dateFormat: 'd-M-yyyy' },
    { dateFormat: 'd-MMM-yy' },
    { dateFormat: 'M/d/yyyy' },
    { dateFormat: 'M-d-yyyy' },
    { dateFormat: 'MM/dd/yyyy' },
    { dateFormat: 'MM-dd-yyyy' },
    { dateFormat: 'yyyy/MM/dd' },
    { dateFormat: 'yyyy-MM-dd' }
  ],
  
    /**
   * Generic Starting Details Modal
   */
  startingNumber: 'Starting Number',
  startingDetail: 'Starting Details',
  prefix: 'Prefix',
  phrase1: 'Before you proceed you need to first confirm the document prefix and the starting number you wish to use for your documents. You can either accept the defaults below or enter your own values.',
  phrase2: 'Please make sure your starting number is correct, you wont be able to change once you click Continue.',
  /**
  * Generic Email Modal
  */
  emailName: 'Email',
  sendName: 'Send',
  cancelName: 'Cancel',
  phrase: 'View the document below to ensure this is correct',
  /**
 * Generic Modal
 */
  closeData: 'Close Data',
  okClick: 'OK-Click',
  /**
   * common
   */
  exportText: 'Export',
  recordDeleteSuccessMessage: 'Record deleted successfully.',
  checkboxUpdateSuccessMessage: 'Record updated successfully.',
    /**
   * common
   */
  datePlaceHolderMessage: 'DD/MM/YYYY e.g. 25/01/2016',
  /* Supplier invoice - finance page
  */
  customerInvoiceHelpURL: supportVideoUrl + 'videos/invoiceout',

  /* Page Names
  */
  payslipPage: 'payslip',

  requestGL: 'Request GL',

  /* Customer invoices - finance page
  */
  isPaidTitle: 'This tick box is automatically populated when you allocate payment to this invoice in the finance dashboard.',
  paidInfo: 'Invoice Paid Info',
};

Object.freeze(webConstants);