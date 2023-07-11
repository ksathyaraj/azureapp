import { env } from "packages/shared-lib/src/environments/environment";
import * as moment from 'moment/moment'
const baseUrl = env.serverBaseUrl;
const apiPrefix = '/api/';
const t = moment().millisecond();

export const webApi = {

  // Currency API
  currencyInformation : baseUrl + apiPrefix + "settings/currency" ,
  saveCurrencyInformation : baseUrl + apiPrefix + "settings/savecurrency",

  //Prefixandstartingnumbersettings API
  prefixInformation:baseUrl + apiPrefix + "prefixInformation", 
  postPrefixInformation:baseUrl + apiPrefix + "post/prefixInformation",
  //Login - Forgot Password
  token: baseUrl + apiPrefix + 'oauth/token',
  otp : baseUrl + apiPrefix +'company/otp',
  resetpassword : baseUrl + apiPrefix +'resetpassword',

   //Contacts data service API 
   individualContactsRoute: baseUrl + apiPrefix + 'organisationindividualcontacts',

  //Organisation Contact API
  individualContactTypes: baseUrl + apiPrefix + 'individualContactTypes',
  organisationContactCompanyNames: baseUrl + apiPrefix + 'organisationContactCompanyNames',
  organisationIndividualContact: baseUrl + apiPrefix + 'organisationIndividualContact/',
  saveIndividual: baseUrl + apiPrefix + 'organisationIndividualContact/save',
  individualsByOrganisationRoute: baseUrl + apiPrefix + 'organisationindividualcontacts/',
  saveMultipleIndividual: baseUrl + apiPrefix + 'organisationMultipleIndividualContact/save',

   //PriceList API
   pricelist: baseUrl + apiPrefix + 'pricelist',
   exportPdfPricelist: baseUrl + apiPrefix + 'pdf/pricelist',
   deletePricelist: baseUrl + apiPrefix + 'pricelistitem/:id/delete',
   exportPricelist: baseUrl + apiPrefix + 'csv/pricelist',
   comapnyProfile: baseUrl + apiPrefix + 'companyProfile',

   /** 
    * Dashboard API
    **/
   dashboarddetailsreport: baseUrl + apiPrefix + 'dashboarddetailsreport',
   cashflowexpensedashboardreport: baseUrl + apiPrefix + 'cashflowexpensedashboardreport',
   cashflowdashboardreport: baseUrl + apiPrefix + 'cashflowdashboardreport',
   invoiceowingdashboardreport: baseUrl + apiPrefix + 'invoiceowingdashboardreport',
   invoiceoweddashboardreport: baseUrl + apiPrefix + 'invoiceoweddashboardreport',
   countrydashboardsettings: baseUrl + apiPrefix + 'countrydashboardsetting/countrydashboardsettings',

   /** 
    * Organisation API
    **/
   organisationContacts: baseUrl + apiPrefix + 'organizationcontacts',
   exportOrganisation: baseUrl + apiPrefix + 'export/organisations',
   exportOrganisationContacts: baseUrl + apiPrefix + 'export/organisationcontacts',
   deleteOrganisationContact: baseUrl + apiPrefix + 'organisationContact/:id/delete',

  //  Organisation Project
  getProjects: baseUrl + apiPrefix + 'projects',
  getProject: baseUrl + apiPrefix + 'project/',
  deleteProject: baseUrl + apiPrefix + 'project/:id/delete',

  //  Organisation Project +
  organisationContactCompanyName: baseUrl + apiPrefix + 'organisationContactCompanyName/',
  saveProjectStartingDetails:  baseUrl + apiPrefix + "startingdetails/projects/save",
  saveProject:  baseUrl + apiPrefix + "project/save",

  //Organisation Invoices
  getOrganisationContactCustomerInvoices: baseUrl + apiPrefix + 'organisationContactInvoices/',

  /** 
   * BankingDetails API
   **/
   bankingDetails:baseUrl +apiPrefix + 'bankingDetails'+"?t="+t,
   deleteBankingDetail: baseUrl + apiPrefix + 'delete/bankdetail/:id',
     /** 
   * Organisation contacts API
   **/
   organisationIndividualContacts: baseUrl + apiPrefix + 'organisationindividualcontacts',
   exportOrganisationIndividualContacts: baseUrl + apiPrefix + 'export/organisationcontacts',
   deleteOrganisationIndividualContact: baseUrl + apiPrefix + 'organisationIndividualContact/:id/delete',

   /**
    * Staff Details +
    **/
   staffType: baseUrl + apiPrefix + 'staffTypes',
   payPackageType: baseUrl + apiPrefix + 'payPackageTypes',
   employmentStatus: baseUrl + apiPrefix + 'employmentStatus',
   staff: baseUrl + apiPrefix + 'staff/',
   saveStaff: baseUrl + apiPrefix + 'staff/save',

   /**
    * Staff Details
    **/
   staffdetails: baseUrl + apiPrefix + 'staffdetails',
   deleteStaffDetails: baseUrl + apiPrefix + 'staff/:id/delete',
   exportStaffDetails: baseUrl + apiPrefix + 'csv/staffdetails',

   /**
    * Package Details
    **/
   staffApi: baseUrl + apiPrefix + 'staff/',
   packageDetails: '/packagedetails',
   savePackageDetails:'/packagedetails/save',

   /**
    * * Payslips
    **/
   payslips: baseUrl + apiPrefix + 'payslips',
   deletePayslip: baseUrl + apiPrefix + 'payslip/:id/delete',
   payslipEmailDetail: baseUrl + apiPrefix + 'payslip/getPayslipEmailDetails',
   payslipsPDF:baseUrl + apiPrefix + 'pdf/payslip/',
   sendPayslipEmail:baseUrl + apiPrefix + 'payslip/sendPayslipEmail',


   /**
    * * Payslips+
    **/
   getCurrentlyEmployedStaffMembers: baseUrl + apiPrefix + 'currentlyemployedstaffmembers',
   getPaySlipData: baseUrl + apiPrefix + 'payslip/',
   staffApiData: baseUrl + apiPrefix + 'staff/',
   payslipApiData: '/newpayslip',
   
    
   /**
    
   * Business Cash -finance/businesscash API
   **/
    vatInfo: baseUrl + apiPrefix + 'vatInfo',
    businessCashMonths: baseUrl + apiPrefix + 'lookups/businesscashmonths',
    businessCashRoute: baseUrl + apiPrefix + 'businesscash/',
    PDFbusinessCash: baseUrl + apiPrefix + 'pdf/businesscash',
    deleteBusinessCash: baseUrl + apiPrefix + 'businessCash/',

   /**
   * Bank Statements By Month -finance/bank accounts
   **/
  bankStatementsByMonth: baseUrl + apiPrefix + 'bankstatementsbymonth',
  bankStatementAccounts: baseUrl + apiPrefix + 'bankstatementaccounts',
  bankStatementByMonth: baseUrl + apiPrefix + 'bankstatementbymonth',
  bankStatementByMonthPDF: baseUrl + apiPrefix + 'pdf/bankstatementbymonth',

  /**
   * Bank Statements By Upload -finance/bank accounts
   **/
  bankStatementsByUpload: baseUrl + apiPrefix + 'bankstatementsbyupload',
  bankStatementByUpload: baseUrl + apiPrefix + 'bankstatementbyupload',
  bankStatementByUploadPDF: baseUrl + apiPrefix + 'pdf/bankstatementbyupload',
   /** 
   * Sales Lead API
   **/
   contactRelationshipType: baseUrl + apiPrefix + 'contactRelationshipTypes',
   salesLead: baseUrl + apiPrefix + 'saleslead/',
   saveSalesLead: baseUrl + apiPrefix + 'saleslead/save',
   salesLeadRoute: baseUrl + apiPrefix + 'salesleads',

   /**
   * Sales Leads API
   **/
   salesLeads:baseUrl + apiPrefix + 'salesleads',
   deleteSalesLead:baseUrl + apiPrefix + 'saleslead/:id/delete',
  /**
   * Staff API
   **/
  getPDFDetail: baseUrl + apiPrefix + 'pdf/staffdetails',

  /**
  * Finance Quotes - /finance/quotes/quotes
  **/
  quotes: baseUrl + apiPrefix + 'quotes',
  quote: baseUrl + apiPrefix + 'quote',
  PDFQuote: baseUrl + apiPrefix + 'pdf/quote',
  quoteEmailDetail: baseUrl + apiPrefix + 'quotes/getQuoteEmailDetails',
  deleteQuotes: baseUrl + apiPrefix + 'quote/:id/delete',
  organisationAndIndividualContact: baseUrl + apiPrefix + 'organisationAndIndividualContact/addNew',
  saveindividual:  baseUrl + apiPrefix + 'organisationIndividualContact/save',

  //Quotes
  bankingDetailsForReference: baseUrl + apiPrefix +  "bankingDetailsForReference",
  invoiceablecontacts: baseUrl + apiPrefix +  "invoiceablecontacts",
  invoiceablecontactsFiltered: baseUrl + apiPrefix +  "invoiceablecontacts-filtered",
  quoteItemTypes:  baseUrl + apiPrefix +  "quoteItemTypes",
  quoteSave:  baseUrl + apiPrefix +  "quote/save",

  SendQuoteEmail: baseUrl + apiPrefix + 'quote/SendQuoteEmail',
  /**
   * Import Organisations - settings page
   */
  templatefilepath: baseUrl + '/Files/ImportOrganisationTemplate.csv',
  userContacts: baseUrl + apiPrefix + 'userCountry',
  lookupfilepath: '/OrganisationImportLookups.xlsx',
  importOrganisations: baseUrl + apiPrefix + 'import/organisations',
  organisationFileUpload: baseUrl + apiPrefix + 'post/organisationFileUpload',
  /**
   * Import organisation contact - settings page
   */
  contactTemplateFilePath: baseUrl + '/Files/ImportOrganisationContactTemplate.csv',
  contactLookupFilePath: baseUrl + '/Files/OrganisationContactImportLookups.xlsx',
  importOrganisationContacts: baseUrl + apiPrefix + 'import/organisationcontacts',
  organisationContactFileUpload: baseUrl + apiPrefix + 'post/organisationContactsFileUpload',
  /**
   * Import customer invoice - settings page
   */
  customeInvoiceTemplateFilePath: baseUrl + '/Files/ImportCustomerInvoiceTemplate.csv',
  customeInvoiceLookupFilePath: baseUrl + '/Files/CustomerInvoiceImportLookups.xlsx',
  customerInvoiceFileUpload: baseUrl + apiPrefix + 'post/customerInvoicesFileUpload',
  customerInvoice: baseUrl + apiPrefix + 'import/customerInvoices',
  /**
   * Import bank statement - settings page
   */
  bankStatementTemplateFilePath: baseUrl + '/Files/ImportBankStatementTemplate.csv',
  BankStatementFileUpload: baseUrl + apiPrefix + 'post/bankstatementFileUpload',
  BankStatementUpload: baseUrl + apiPrefix + 'post/BankStatementUpload',
  bankStatementSave: baseUrl + apiPrefix + 'import/bankstatement',
  getBankingDetails: baseUrl + apiPrefix + 'bankingDetailsForImport',

  
 
  //PriceList Item API 
  savePricelistItem: baseUrl + apiPrefix + 'pricelistitem/save',
  getPricelistItem: baseUrl + apiPrefix + 'pricelistitem/',

  
    /**
  * Company Profile - Settings page
  */
    getCountryName: baseUrl + apiPrefix + 'companySettings',
    getCompanyProfileImage: baseUrl + apiPrefix + 'companyProfileImage',
    getBusinessTypesForCompanySettings: baseUrl + apiPrefix + 'businessTypesForCompanySettings',
    getSupportedCountries: baseUrl + apiPrefix + 'supportedcountries',
    imageUpload: baseUrl + apiPrefix + 'post/CompanyImageUpload',
    postCompanySettings: baseUrl + apiPrefix + '/post/companySettings',

  /** 
   * System user access API
   **/
   postUsers:baseUrl + apiPrefix +'post/user',
   getUsers :baseUrl + apiPrefix + 'users',
   deleteUsers: baseUrl + apiPrefix +'delete/user/:id',
   makePrimaryUser: baseUrl + apiPrefix + 'users/:id/makeprimaryuser',
   getUserPermission : baseUrl + apiPrefix + 'permissions/',
   postUserPermission : baseUrl + apiPrefix + 'post/permissions',
   
   /**
    *  * Tax Information */
   getRecordsFilePath: baseUrl + apiPrefix + 'taxInformation',
   postTaxInformationFilePath: baseUrl + apiPrefix + 'post/taxInformation',
   changeVatStatusFilePath: baseUrl + apiPrefix + 'post/companyprofile/vatregistrationstatus',
   getVatInfoFilePath: baseUrl + apiPrefix + 'vatInfo',
    /**
    *  * Organisation-Detail + */
  contactRelationshipTypeFilePath: baseUrl + apiPrefix + 'contactRelationshipTypesEnums',
  countriesFilePath: baseUrl + apiPrefix + 'countries',
  businessTypesFilePath: baseUrl + apiPrefix + 'businessTypes',
  tradingStatusTypesFilePath: baseUrl + apiPrefix + 'tradingStatusTypes',
  organisationFilePath: baseUrl + apiPrefix + 'organisationContact/',
  isOrganisationContactCustomerTypeFilepath: baseUrl + apiPrefix + 'isOrganisationContactCustomerType/',
  provincesFilePath: baseUrl + apiPrefix + 'provinces/',
  saveOrganisationContactFilePath: baseUrl + apiPrefix + 'organizationcontact/save/',
  /**
   * Supplier invoice - finance > Invoicing
   */
  getSupplierInvoices: baseUrl + apiPrefix + 'invoicesin',
  getVatInfo: baseUrl + apiPrefix + 'vatInfo',
  deleteSupplierInvoice: baseUrl + apiPrefix + 'delete/invoicein/:id',
  getSuppliers : baseUrl + apiPrefix + 'suppliers',
  getInvoiceInItemTypes: baseUrl + apiPrefix + 'invoiceInItemTypes',
  postSupplierInvoice: baseUrl + apiPrefix + 'post/invoicein',
  getSupplierInvoiceLedgerAccounts: baseUrl + apiPrefix + 'invoicesin/ledgerAccounts/',
    /**
    *  * OwnersMoney */
  loanAccountMembers: baseUrl + apiPrefix + 'lookups/loanaccountmembers',
  vatinfo: baseUrl + apiPrefix + 'vatInfo/',
  selectedMonthChange : baseUrl + apiPrefix + 'loanaccount/details/',
  addLoanAccount : baseUrl + apiPrefix + 'post/ownersmoney/addLoanAccount',
  loanAccountDetails: baseUrl + apiPrefix + 'pdf/loanaccount/details',
  deleteLoanAccountItem : baseUrl + apiPrefix + 'delete/ownersmoney/loanaccountitem',
    /**
    *  * OwnersMoney + */
  ledgerAccounts: baseUrl + apiPrefix + 'ownersmoney/ledgeraccounts',
  loanAccountItem: baseUrl + apiPrefix + 'loanaccountitem/',
  addLoanAccountItem: baseUrl + apiPrefix + 'post/ownersmoney/loanaccountitem',
  supplierInvoices: baseUrl + apiPrefix + 'supplierinvoices/',
  suppliersFiltered: baseUrl + apiPrefix + 'suppliers-filtered',
  suppliers: baseUrl + apiPrefix + 'suppliers',

  /**
* Allocate - bankaccounts
*/
  getBankstatementsWithUnallocatedItems: baseUrl + apiPrefix + 'bankstatementswithunallocateditems',
  getBankStatementAccounts: baseUrl + apiPrefix + "bankstatementaccounts",
  deleteBankStatementAccounts: baseUrl + apiPrefix + "delete/bankStatement/",

  //Allocate + - bankaccounts
  deleteUnallocatedBankStatementItem: baseUrl + apiPrefix + "bankstatementitem/delete",
  getBankStatementWithUnallocatedItems: baseUrl + apiPrefix + "bankstatementwithunallocateditems/",
  getBankStatementLedgerAccounts: baseUrl + apiPrefix + "bankstatement/ledgeraccounts",
  getContactRelationshipTypeEnums: baseUrl + apiPrefix + "contactRelationshipTypesEnums",
  getLedgerActionTypes: baseUrl + apiPrefix + "ledgerActionTypes",
  saveBankStatement: baseUrl + apiPrefix + "bankstatement/save",
  getInvoiceOutRoute: baseUrl + apiPrefix + 'invoicesout',


  /**
    * Business Loans - finance
  */
  businessLoanAccounts: baseUrl + apiPrefix + 'lookups/businessloanaccounts',
  vatInfoData: baseUrl + apiPrefix + 'vatInfo',
  selectedMonthDetails: baseUrl + apiPrefix + 'loanaccount/details/',
  businessLoanAccountDetails: baseUrl + apiPrefix + 'pdf/businessloanaccount/details',
  deleteLoanAccount: baseUrl + apiPrefix + 'delete/loanaccountitem',
  addBusinessLoanAccount: baseUrl + apiPrefix + 'post/addLoanAccount',

  /**
    * Business Loans Plus - finance
  */
  loanLedgerAccounts: baseUrl + apiPrefix + 'loanaccounts/ledgeraccounts',
  loanAccountItems : baseUrl + apiPrefix + 'loanaccountitem/',
  saveloanAccountItem: baseUrl + apiPrefix + 'post/loanaccountitem',
  
   /**
    *  * Generic email Modal */    
   sendCustomerStatementEmailFilePath : baseUrl + apiPrefix + 'reports/sendcustomerstatement',
   /**
    * Add bank details - settings page
    */
   getBanks: baseUrl + apiPrefix + 'banks',
   getBankAccountTypes: baseUrl + apiPrefix + 'bankAccountTypes',
   getBankingDetail: baseUrl + apiPrefix + 'bankingDetails/',
   postBankingDetail: baseUrl + apiPrefix + 'post/bankingDetail',

    /**
    *  * Credit Note Modal */
   creditNoteInvoice : baseUrl + apiPrefix + 'creditnotableinvoices',
   
    //Supplier Invoice
  supplierInvoicesOwed: baseUrl + apiPrefix + 'supplierInvoicesOwed',
  exportSupplierInvoiceOwedPdf: baseUrl + apiPrefix + 'pdf/supplierInvoicesOwed',
  exportSupplierInvoiceOwedCsv: baseUrl + apiPrefix + 'csv/supplierInvoicesOwed',
  supplierAgeAnalysis: baseUrl + apiPrefix + 'supplierAgeAnalysis',
  exportSupplierAgeAnalysisCsv: baseUrl + apiPrefix + 'csv/supplierAgeAnalysis',
  exportSupplierAgeAnalysispdf: baseUrl + apiPrefix + 'pdf/supplierAgeAnalysis',
  allSuppliers: baseUrl + apiPrefix + 'suppliers',
  filteredSuppliers : baseUrl + apiPrefix + 'suppliers-filtered',

  //Accountant - Trial Balance
  exportTrialBalanceCsv: baseUrl + apiPrefix + 'getExportData',
  exportTrialBalancePdf: baseUrl + apiPrefix + 'pdf/trialbalance',
  

  //Accountant - General Ledger
  getGeneralLedgerAccounts: baseUrl + apiPrefix + 'generalledger/ledgeraccounts',
  getGeneralLedgerRequests: baseUrl + apiPrefix + 'pdf/generalledger/requests',
  requestGeneralLedgerPdf: baseUrl + apiPrefix + 'pdf/start/generalledger',
  exportGeneralLedgerCsv: baseUrl + apiPrefix + 'csv/generalledger',
  getGeneralLedgerPdf: baseUrl + apiPrefix + 'pdf/generalledger',
  
   //Accountant - Customer Ledger
  customledgeraccounts: baseUrl + apiPrefix + 'customledgeraccounts',
  customledgerAccountDetails : baseUrl + apiPrefix + 'customLedgerAccountDetails',
  saveCustomerledgerAccount: baseUrl + apiPrefix + 'customLedgerAccounts/save', 
   
  /**
    *  * Finance - Credit notes */
  creditnotes: baseUrl + apiPrefix + 'creditnotes',
  
   /* Common
   */

   /**
    * company salary schedule
    */
   exportCsv : baseUrl + apiPrefix + 'csv/companysalaryschedule',
   exportPdf : baseUrl + apiPrefix + 'pdf/companysalaryschedule',

   /** 
   * creditNoteRequiredInfo Modal
   **/
  customerCreditNotesWithDetails: baseUrl + apiPrefix + 'customerCreditNotesWithDetails',
  customersWithCreditNotes: baseUrl + apiPrefix + 'lookups/customersWithCreditNotes',

   /** 
   * invoiceRequiredInfo Modal
   **/
   customerInvoicesWithDetails: baseUrl + apiPrefix + 'customerInvoicesWithDetails',
   supplierInvoicesWithDetails: baseUrl + apiPrefix + 'supplierInvoicesWithDetails',
   customersWithInvoices: baseUrl + apiPrefix + 'lookups/customersWithInvoices',
   suppliersWithInvoices: baseUrl + apiPrefix + 'lookups/suppliersWithInvoices',

   /** 
   * openingBalanceRequiredInfo Modal
   **/
   debtorsCreditorsOpeningBalance: baseUrl + apiPrefix + 'debtorsCreditorsOpeningBalance',

  /**
    * individual salary schedule
    */
   getStaffMembers :baseUrl + apiPrefix + 'staffmembers',
   getTaxYears : baseUrl + apiPrefix + 'taxyears',
   exportIndividualSalaryCsv :baseUrl + apiPrefix + 'csv/individualsalaryschedule',
   exportIndividualSalaryPdf : baseUrl + apiPrefix + 'pdf/individualsalaryschedule',

    /**
    * Add Business Cash
    */
    currentlyemployedstaffmembers: baseUrl + apiPrefix + 'currentlyemployedstaffmembers',
    businesscashledgeraccounts: baseUrl + apiPrefix + 'businesscashledgeraccounts',
    businessCashItemTypes: baseUrl + apiPrefix + 'businessCashItemTypes',
    getBusinessCashRoute: baseUrl + apiPrefix + 'businesscash/',
    saveBusinessCash: baseUrl + apiPrefix + 'businessCash/save',

   /**
    * customer age analysis
    */
     getCustomerData :  baseUrl + apiPrefix + 'customerAgeAnalysis',
     exportAgeAnalysisCsv : baseUrl + apiPrefix + 'csv/customerAgeAnalysis',
     exportAgeAnalysisPdf: baseUrl + apiPrefix + 'pdf/customerAgeAnalysis',

    /**
    * customer statement
    */
     getInvoiceableContacts : baseUrl + apiPrefix + 'invoiceablecontacts',
     getCustomerBankingDetails : baseUrl + apiPrefix + 'bankingDetails',
     getCustomerStatementByCustomerPdf : baseUrl + apiPrefix + 'pdf/customerStatementByCustomer',
     getCustomerStatementDetailsForEmail : baseUrl + apiPrefix + 'reports/getcustomerstatementemaildetails',
  /**
   * Cash flow - Reports page
   */ 
  exportCashFlow: baseUrl + apiPrefix + 'csv/cashFlow',
  pdfCashFlow: baseUrl + apiPrefix + 'pdf/cashFlow',
  getCashFlow: baseUrl + apiPrefix + 'cashflow',
  cashGaugeItemTypes: baseUrl + apiPrefix + 'cashGaugeItemTypes',
  saveCashflow: baseUrl + apiPrefix + 'cashFlow/save',
  cashflowledgerentries: baseUrl + apiPrefix + 'cashflowledgerentries',
   /**
    * Vat - Reports page
    */
   pdfVat: baseUrl + apiPrefix + 'pdf/vat',
   exportVat: baseUrl + apiPrefix + 'csv/vat',
   getVat: baseUrl + apiPrefix + 'reports/vat',
   /**
    * Query -- Accountant
    */
   queryAccountant : baseUrl + apiPrefix  +'queries',
   pdfQuery : baseUrl + apiPrefix + 'pdf/queries',
     /**
    * Credit Note
    */
   companyProfile: baseUrl + apiPrefix + 'companyProfile',
   invoiceOutItemTypes: baseUrl + apiPrefix + 'invoiceOutItemTypes',
   creditNoteItemTypes: baseUrl + apiPrefix + 'creditNoteItemTypes',
   addcreditNote: baseUrl + apiPrefix + 'creditnote/',
   getcreditNote: baseUrl + apiPrefix + 'creditnotes',
   creditNote: baseUrl + apiPrefix + 'creditnote',
  saveCreditNoteStartingDetails: baseUrl + apiPrefix + 'startingdetails/creditnotes/save',
  pdfCreditNote: baseUrl + apiPrefix + 'pdf/creditnote',
  saveCreditNote: baseUrl + apiPrefix + 'creditnote/save',
  invoicesoutRoute: baseUrl + apiPrefix + 'invoicesout',
       /**
    * Adjustment -- Accountant
    */
   adjustments: baseUrl + apiPrefix + 'adjustments',
   PDFAdjustments: baseUrl + apiPrefix + 'pdf/adjustments',
  adjustmentLedgerAccounts : baseUrl + apiPrefix +'adjustmentLedgerAccounts',
  customersFiltered: baseUrl + apiPrefix + 'customers-filtered',
  customers: baseUrl + apiPrefix + 'customers',
  saveAdjustment : baseUrl + apiPrefix + 'adjustment/save', 


   /**
    * Reports - Customer invoice due by date
    */
    getCustomerInvoicesDueData : baseUrl + apiPrefix + 'customerInvoicesDue',
    exportCustomerInvoicesDueCsv : baseUrl + apiPrefix + 'csv/customerInvoicesDue',
    pdfCustomerInvoicesDue : baseUrl + apiPrefix + 'pdf/customerInvoicesDue',

     /**
    * Accountant - export data
    */
    exportTypes: baseUrl + apiPrefix + 'exportTypes',
    exportTypesEnum: baseUrl + apiPrefix + 'exportTypesEnum',
    getExportData: baseUrl + apiPrefix + 'getExportData',

     /**
    * Accountant - income Statement
    */
   incomeStatement: baseUrl + apiPrefix + 'pdf/incomestatement',

   deletePostfix: 'delete',
   convertPostfix: 'convert',
   files: baseUrl + '/Files/en_',
   x_api_key: 'x_apim_key=' + env.x_apim_key,

   // Video Base URL
   supportVideoUrl: env.supportVideoBaseUrl + "enZA/",

   // lookup Data
  companyProfileImage: baseUrl + apiPrefix + "companyProfileImage",

    /**
   * Customer invoice - finance > Invoicing
   */
  getCustomerInvoices: baseUrl + apiPrefix + 'invoicesout',
  getCustomerInvoice: baseUrl + apiPrefix + 'invoiceout',
  deleteCustomerInvoice: baseUrl + apiPrefix + 'invoiceout/:id/delete',
  finaliseCustomerInvoice: baseUrl + apiPrefix + 'invoiceout/:id/finalise',
  PDFCustomerInvoice: baseUrl + apiPrefix + 'pdf/invoiceout',
  customerInvoiceEmailDetail: baseUrl + apiPrefix + 'invoicesout/getInvoiceEmailDetails',
  saveCustomerInvoice:  baseUrl + apiPrefix +  'invoiceout/save',

   /** 
   * BalanceSheet - Accountant
   **/
  balanceSheetPdf: baseUrl + apiPrefix + 'pdf/balancesheet',
  balanceSheetExport: baseUrl + apiPrefix + 'getExportData',

  
  /** 
   * Companies - Reseller Registration
   **/
  resellerregistrations : baseUrl+ apiPrefix +'resellerregistrations',

   /**
    * Reports - Customer invoice due by customer data
    */
    getCustomerInvoicesDueByCustomerData  : baseUrl + apiPrefix + 'customerInvoicesDueByCustomerData',
    exportCustomerInvoicesDueByCustomerCsv : baseUrl + apiPrefix + 'csv/customerInvoicesDueByCustomer',
    pdfCustomerInvoicesDueByCustomer : baseUrl + apiPrefix + 'pdf/customerInvoicesDueByCustomer',
     
    /**
   * Accountant - Set Up
   */
  setUpRecords: baseUrl + apiPrefix + 'takeOnBalances',
  saveSetUpBalances: baseUrl + apiPrefix + 'takeOnBalances/save'


};

Object.freeze(webApi);
