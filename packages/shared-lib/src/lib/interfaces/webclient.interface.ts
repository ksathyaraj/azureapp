export interface OrganisationDetails {
  companyName: string,
  website: string,
  telephone: string
}

export interface SalesDetails {
  name: string,
  email: string,
  alternateContact: string,
  cellphone: string
}

export interface Column {
  columnDef: string;
  header: string;
  url?: string;
  columnDefTitle?: string;
  columnDef2?: string;
  columnType?: ColumnType;
  columnPDF?: ColumnType;
  columnInvoice?: ColumnType;
  columnEmail?: ColumnType;
  columnCheckbox?: ColumnType;
  columnInvoiceFinalised?: ColumnType;
  columnDownload?: ColumnType;
  columnModal?: ColumnType;
  updatePayment?: ColumnType;
  activePendingPayment?: ColumnType;
  suspendPendingPayment?: ColumnType;
  optionalDeleteOnColumn?: string;
  optionalCheckboxCondition?: any;
  optionalDeleteDisabled?: any;
  optionalDeleteHidden?: any;
  checkboxClassField?: any;   // checkboxClassField: (dataValue: any) => { return dataValue['website']? 'fa fa-check-square-o' : 'fa fa-square-o'}
  optionalEmailCondition?: any;
  optionalPDFCondition?: any;
  checkboxTitle?: string;
  optionalCheckboxHiddenCondition? :any;
  columnOptionalCondition?: any;
  ngClassCondition?: any;
  showDecimalFilter?: boolean;
  showDateFilter?: boolean,
  showDateTimeFilter?: boolean,
  hideSorting?: boolean,
  checkboxModelValue?: any;
  transparentBtn?: boolean;
  pullRight?: boolean;
  defaultFilter?: boolean;
  colWidth?: string;
  multipleInputSearchField?: string;
}

export interface api {
  get?: string;
  deleteForHttpPostMethod?: string;
  deleteForHttpDeleteMethod?: string;
  export?: string;
  getWithDateRange?: string,
  getWithSingleDate?: string,
  invoice?: string,
  pdf?: string,
  email?: string
  post?: string,
  getFileUploader?: string,
  checkboxUpdateApi?: string,
  exportParams?:any,
  pdfParams?:any
  dateRangeFilter?:any,
  singleDateFilter?:any,
  dropDownFilter?:any,
  getWithMultiSelectFilter?:any
  datesWithoutFormat?:boolean
}

export interface tabData {
  routerLink: string;
  header: string,
  isActive?: boolean,
  smDisabled?: boolean
}

export interface dataOperation {
  sortOrder: boolean;
  sortPredicate: string,
  paging: {
    pageSize: number,
    currentPage: number,
    maxPagesToShow: number
  },
}

export interface searchUIOptions {
  dateRange?: boolean,
  searchInput?: boolean,
  alphabetFilter?: boolean,
  dropdown?: boolean,
  singleDateFilter?: boolean,
  multiSelectFilter?: boolean
}

export interface buttonParameters {
  event: any,
  id: number,
  data?: any
}

export interface authTokenParam {
  authtoken: string | unknown,
  api_auth_key: string,
  x_apim_key: string
}

export interface navButtonGrid {
  text: string,
  subText?: string,
  sref: string,
  conditionalRender?: boolean,
  buttonSupportName?: string
}

export interface historicalBankSelectOptions {
  dateFormats: any,
  bankAccounts?: any,
  prefferedBankAccount?: any
}

export interface helpPanelData {
  header: string,
  data: string
}

export interface resourceMessages {
  noTableDataMessage?: string,
  deleteSuccessMessage?: string,
  confirmDeleteMessage?: string,
  checkboxUpdateSuccessMessage?: string,
  PDFModalHeading?: string,
  questionModalTitle?: string,
  questionModalMessage?: string,
  tableSearchPlaceHolder?: string,
  messageModalTitle?: string,
  messageModalMessage?: string,
  emailModelHeading?: string,
  finalise?: string,
  denyDeleteFinalised?: string,
  alreadyFinalised?: string,
  pdf?: string,
  pdfToBeFinalised?:string,
  email?: string,
  canOnlyEmailFinalisedInvoice?: string,
  deleteItem?: string,
}

export interface dropDownFilter { 
  smOptions: any,
  smRequired: boolean,
  smLabel: string,
  smOptionDisplayField: string,
  smOptionValueField: string,
  smPlaceholder: string,
  smLabelClass: string,
  selectedSearchFilterDropdown:any,
  getDataByValue?: string
  smImageDisplayField?: string
}

export interface bankingDetail {
  isPreferredBank: boolean,
  hasTransactions: boolean,
  bankId: string,
  accountName: string,
  accountNo: string,
  bankAccountTypeId: string,
  branch: string,
  branchCode: string,
  swiftCode: string
}


/**
 * Enums
 * In enum new values should be add after last value
 */
export enum ColumnType {
  link,
  deleteButton,
  pdf,
  email,
  invoice,
  checkbox,
  invoiceFinalised,
  defaultCheckbox,
  image,
  download,
  modal,
  promote,
  pendingPaymentSubscription,
  updatePayment,
  activePendingPayment,
  suspendPendingPayment
}

export enum ButtonType {
  Add,
  Refresh,
  Export,
  PDF,
  RequestGL,
  Download,
  Email,
  UsageReport,
  DetailedReport
}

export interface contactInterface{
  id: number,
  organisationId: any,
  title?: string|undefined,
  firstName:string,
  lastName: string,
  position: string,
  department: string,
  emailAddress: string,
  telephoneNumber: string,
  cellphone: string,
  individualContactType: string,
  organisationContactCode: string,
  fullName: string 
}
export interface salesLeadInterface{
  alternateContactNumber: string;
  cellphone: string;
  company: string;
  companyId: string;
  contactRelationshipType: any;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  notes: string;
  position: string;
  title: string;
  workContactNumber: string;
}

export interface staffDetailsInterface{
  firstName: string,
  lastName: string,
  knownAs: string,
  idNumber: string,
  emailAddress:string,
  telephone: string,
  cellphone: string,
  employmentStartDate: any,
  employmentStatus: any,
  numberOfDependants: any,
  taxNumber: string,
  occupation: string,
  homeAddress: string,
  postalAddress: string,
  annualLeaveDays: any,
  terminationDate: any,
  employeeNumber: any,
  payPackageType: any,
  staffType: any,
  notes: string,
  nextOfKinFullName: string,
  nextOfKinRelationship: string,
  nextOfKinTelephone: string,
  nextOfKinCellphone: string,
}

export interface supplierInvoiceIntrest {
  selectedLedgerAccount: string,
  description: string,
  inclusiveAmount: string,
  vatAmount?: string | number | undefined,
  exclusiveAmount?: string | number | undefined
}

export interface supplierInvoiceDetails {
  supplierInvoiceId: number,
  contactId: string,
  supplierInvoiceNumber: string,
  sourceDocumentReference: string,
  total: number,
  createdDate: any,
  payByDate: any,
  subTotal: number,
  totalDiscount: number,
  totalVat: number,
  comments: string,
  invoiceInItems: invoiceInItems[]
}

export interface ownersMoneyLoanAccountItem {
  selectedLedgerAccount: any,
  createdDate: any,
  selectedSupplier: any ,
  selectedInvoice: any,
  
  description: string,
  reference: string,
  inclusiveAmmount: string,
  exclusiveAmount?: string | number | undefined,
  vatAmount?: string | number |undefined,
}

export interface invoiceInItems {
  category: string,
  description: string,
  amount: number,
  vat: number,
  total: number,
  invoiceInItemType: number,
  isDeleted: boolean
}

export interface BusinessLoanAccountItem {
  selectedLedgerAccount: any,
  createdDate: any,  
  description: string,
  reference: string,
  inclusiveAmmount: string,
  exclusiveAmount: string | number | undefined,
  vatAmount: string | number |undefined,
}

export enum settingPages {
  HistoricalBank,
  HistoricalCustomer
}
export interface OrganisationInterface{
  id: number,
  organisationId: any,
  companyName: string,
  organisationCode:string,
  tradingAs: string,
  telephone: string,
  contactRelationshipType: string,
  fax: string,
  website: string,
  postalIsSameAsPhysicalAddress: boolean,
  physicalAddress: {
    addressLine1?: string,
    addressLine2?: string,
    town?: string,
    code?: string,
    countryId?: string,
    provinceId?: string
  },
  postalAddress: any
  // postalAddress: {
  //   addressLine1: string,
  //   addressLine2: string,
  //   town: string,
  //   code: string,
  //   countryId: string,
  //   provinceId: string
  // },
  vatNumber: string,
  companyRegistrationNumber: string,
  businessType: string,
  tradingStatusId: string,
  supplierNumber: string,
  notes: string
}

export interface CreditNoteAdd  {
    id: number,
    formattedInvoiceNumber: string
    dateFinalised: string,
    customerName: string
    reportingIsPaid: boolean,
    reportingNotPaid: boolean,
    reportingTotal: number,
    reportingTotalOutstanding: number,
    reportingTotalPaid :number
  }

export interface CreditItem {
  showVat: any,
  vatRate: any,
  isVatRegistered: boolean,
  itemTypeDescription: any,
  itemType: any,
  creditNoteItemType: any,
  invoiceOutItem: any,
  creditNoteItem: any,
  invoiceOutItemTypes : any
  }
export interface InvoiceOutItemTypes {
  discountItem: number,
  interestItem: number,
  salesItem : number
}
export interface CreditNoteItemTypes {
  creditNoteInvoiceOutItem: number,
  discountItem: number,
}

export interface CreditNote {
  bankingDetailsId: number,
  comments: string,
  contactId: number,
  creditNoteItems: any,
  creditNoteNumber: number,
  dateIssued: any,
  formattedCreditNoteNumber?: any,
  Id: number,
  individualContactId: number,
  invoiceOutId: number,
  invoiceOutItems: any,
  orderNumber: string,
  projectId: any,
  subTotal: number,
  supplierNumber: any,
  total: number,
  totalAmount: number,
  totalDiscount: number,
  totalVat: number,
  vatNumber : any
  
}

export interface Adjustment  {
  reportingDate: any,
  debitLedgerAccount ?: any,
  creditLedgerAccount?: any,
  amount?: number | undefined,
  reference?:any
  }

  export interface DateFilter{
    smLabel:any,
    smPlaceholder?:any,
    smLabelclass?:any
  }

  export interface NavButtonSetting {
    id?: number,
    isSupported?: boolean
  }