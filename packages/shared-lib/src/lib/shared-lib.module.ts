import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./ui/components/header/header.component";
import { NavigationBarComponent } from "./ui/components/navigation-bar/navigation-bar.component";
import { DatePickerComponent } from "./ui/elements/date-picker/date-picker.component";
import { NavButtonGridComponent } from "./ui/elements/nav-button-grid/nav-button-grid.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpTranslationApi } from "./services/interceptors/http-translator-api";
import { TitleBarComponent } from "./ui/components/title-bar/title-bar.component";
import { LinkComponent } from "./ui/elements/link/link.component";
import { TableComponent } from "./ui/elements/table/table.component";
import { TextInputComponent } from "./ui/elements/text-input/text-input.component";
import { TextAreaComponent } from "./ui/elements/textarea/textarea.component";
import { ButtonComponent } from "./ui/elements/button/button.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchBoxComponent } from "./ui/elements/search-box/search-box.component";
import { AlphabetFilterComponent } from "./ui/elements/alphabet-filter/alphabet-filter.component";
import { ButtonBarComponent } from "./ui/components/button-bar/button-bar.component";
import { PageTabBarComponent } from "./ui/components/page-tab-bar/page-tab-bar.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "./ui/components/footer/footer.component";
import { FormPanelComponent } from "./ui/elements/form-panel/form-panel.component";
import { ModalComponent } from "./ui/elements/modal/modal.component";
import { TitleComponent } from "./ui/elements/title/title.component";
import { ImportsComponent } from "./ui/components/imports/imports.component";
import { FileInputComponent } from "./ui/elements/file-input/file-input.component";
import { CheckboxInputComponent } from "./ui/elements/checkbox-input/checkbox-input.component";
import { SelectInputComponent } from "./ui/elements/select-input/select-input.component";
import { StaticTextComponent } from "./ui/elements/static-text/static-text.component";
import { ValidationMessageComponent } from "./ui/elements/validation-message/validation-message.component";
import { GenericDeleteConfirmationModalComponent } from "./ui/elements/modal/generic/genericDeleteConfirmationModal/generic-delete-confirmation-modal.component";
import { GenericMessageModalComponent } from "./ui/elements/modal/generic/genericMessageModal/generic-message-modal.component";
import { GenericQuestionModalComponent } from "./ui/elements/modal/generic/genericQuestionModal/generic-question-modal.component";
import { AddNewAccountModalComponent } from "./ui/elements/modal/webClient/addNewAccountModal/add-new-account-modal.component";
import { GenericPasswordConfirmModalComponent } from "./ui/elements/modal/generic/genericPasswordConfirmModal/generic-password-confirm-modal.component";
import { GenericStartingDetailsModalComponent } from "./ui/elements/modal/generic/genericStartingDetailsModal/generic-starting-details-modal.component";
import { GenericEmailModalComponent } from "./ui/elements/modal/generic/genericEmailModal/generic-email-modal.component";
import { PdfReportModalComponent } from "./ui/elements/modal/generic/pdfReportModal/pdf-report-modal.component";
import { AddNewIntrestItemComponent } from "./ui/elements/modal/webClient/supplier-invoice/add-new-intrest-item/add-new-intrest-item.component";
import { AddDiscountItemComponent } from "./ui/elements/modal/webClient/supplier-invoice/add-discount-item/add-discount-item.component";
import { PdfReportComponent } from "./ui/components/pdf-report/pdf-report.component";
import { AddCreditnoteItemModalComponent } from "./ui/elements/modal/webClient/finance/creditnotes/add-creditnote-item-modal/add-creditnote-item-modal.component";
import { AddCreditnoteModalComponent } from "./ui/elements/modal/webClient/finance/creditnotes/add-creditnote-modal/add-creditnote-modal.component";
import { EditableTableComponent } from "./ui/components/editable-table/editable-table.component";
import { SortableModule } from "ngx-bootstrap/sortable";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AddNewCustomerModalComponent } from "./ui/elements/modal/webClient/addNewCustomerModal/add-new-customer-modal.component";
import { AddNewContactModalComponent } from "./ui/elements/modal/webClient/addNewContactModal/add-new-contact-modal.component";

import { AddOwnersMoneyLoanAccountModalComponent } from "./ui/elements/modal/webClient/addOwnersMoneyLoanAccountModal/add-owners-money-loan-account-modal.component";
import { AddOwnersMoneyLoanAccountItemModalComponent } from "./ui/elements/modal/webClient/addOwnersMoneyLoanAccountItemModal/add-owners-money-loan-account-item-modal.component";
import { EmailConfirmationModalComponent } from "./ui/elements/modal/generic/email-confirmation-modal/email-confirmation-modal.component";
import { AddLoanAccountModalComponent } from "./ui/elements/modal/webClient/addLoanAccountModal/add-loan-account-modal.component";
import { AddLoanAccountItemModalComponent } from "./ui/elements/modal/webClient/addLoanAccountItemModal/add-loan-account-item-modal.component";
import { InvoiceRequiredInfoModalComponent } from "./ui/elements/modal/webClient/invoiceRequiredInfoModal/invoice-required-info-modal.component";
import { OpeningBalanceRequiredInfoModalComponent } from "./ui/elements/modal/webClient/openingBalanceRequiredInfoModal/opening-balance-required-info-modal.component";
import { CreditNoteRequiredInfoModalComponent } from "./ui/elements/modal/webClient/creditNoteRequiredInfoModal/credit-note-required-info-modal.component";
import { OpenStaffPackageDetailsCustomItemModalComponent } from "./ui/elements/modal/webClient/openStaffPackageDetailsCustomItemModal/open-staff-package-details-custom-item-modal.component";
import { CashFlowComponent } from "./ui/elements/modal/webClient/cash-flow/cash-flow.component";
import { OpenPayslipCustomItemModalComponent } from "./ui/elements/modal/webClient/openPayslipCustomItemModal/open-payslip-custom-item-modal.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { AbsaManualHandoverModalComponent } from "./ui/elements/modal/webClient/absaManualHandoverModal/absa-manual-handover-modal.component";
import { ActivateCompanyModalComponent } from "./ui/elements/modal/webClient/activateCompanyModal/activate-company-modal.component";
import { AddCompanyHistoryModalComponent } from "./ui/elements/modal/webClient/addCompanyHistoryModal/add-company-history-modal.component";
import { ChangeReportingcategoryModelComponent } from "./ui/elements/modal/webClient/changeReportingcategoryModel/change-reportingcategory-model.component";
import { ChangeSubscriptionModalComponent } from "./ui/elements/modal/webClient/changeSubscriptionModal/change-subscription-modal.component";
import { ExtendSubscriptionModalComponent } from "./ui/elements/modal/webClient/extendSubscriptionModal/extend-subscription-modal.component";
import { SubscriptionHistoryModelComponent } from "./ui/elements/modal/webClient/subscriptionHistoryModel/subscription-history-model.component";
import { DeactivateCompanyModalComponent } from "./ui/elements/modal/webClient/deactivateCompanyModal/deactivate-company-modal.component";
import { AuditingComponent } from "./ui/elements/modal/portal/auditing/auditing.component";
import { PortalEmailModalComponent } from "./ui/elements/modal/portal/portal-email-modal/portal-email-modal.component";
import { NewLicenseesModalComponent } from "./ui/elements/modal/portal/vouchers/newLicenseesModal/new-licensees-modal.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: HttpTranslationApi,
        // useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    RouterModule.forRoot([]),
    NgbModule,
    TypeaheadModule.forRoot(),
    NgSelectModule,
    SortableModule,
    DragDropModule,
  ],
  exports: [
    DatePickerComponent,
    NavigationBarComponent,
    HeaderComponent,
    NavButtonGridComponent,
    TranslateModule,
    TitleBarComponent,
    LinkComponent,
    TableComponent,
    TextAreaComponent,
    TextInputComponent,
    ButtonComponent,
    ButtonBarComponent,
    PageTabBarComponent,
    SearchBoxComponent,
    FooterComponent,
    FormPanelComponent,
    ModalComponent,
    TitleComponent,
    ImportsComponent,
    FileInputComponent,
    StaticTextComponent,
    ValidationMessageComponent,
    SelectInputComponent,
    GenericDeleteConfirmationModalComponent,
    GenericMessageModalComponent,
    GenericQuestionModalComponent,
    AddNewAccountModalComponent,
    GenericPasswordConfirmModalComponent,
    GenericStartingDetailsModalComponent,
    GenericEmailModalComponent,
    PdfReportModalComponent,
    InvoiceRequiredInfoModalComponent,
    OpeningBalanceRequiredInfoModalComponent,
    CreditNoteRequiredInfoModalComponent,
    CheckboxInputComponent,
    AddCreditnoteItemModalComponent,
    AddCreditnoteModalComponent,
    PdfReportComponent,
    EditableTableComponent,
    AddNewCustomerModalComponent,
    AddNewContactModalComponent,
    AddOwnersMoneyLoanAccountModalComponent,
    AddOwnersMoneyLoanAccountItemModalComponent,
    AddLoanAccountModalComponent,
    AddLoanAccountItemModalComponent,
    OpenStaffPackageDetailsCustomItemModalComponent,
    OpenPayslipCustomItemModalComponent,
  ],
  declarations: [
    DatePickerComponent,
    NavigationBarComponent,
    HeaderComponent,
    NavButtonGridComponent,
    TitleBarComponent,
    LinkComponent,
    TableComponent,
    TextAreaComponent,
    TextInputComponent,
    ButtonComponent,
    SearchBoxComponent,
    AlphabetFilterComponent,
    ButtonBarComponent,
    PageTabBarComponent,
    FooterComponent,
    FormPanelComponent,
    ModalComponent,
    TitleComponent,
    ImportsComponent,
    FileInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    StaticTextComponent,
    ValidationMessageComponent,
    GenericDeleteConfirmationModalComponent,
    GenericMessageModalComponent,
    GenericQuestionModalComponent,
    AddNewAccountModalComponent,
    GenericPasswordConfirmModalComponent,
    GenericStartingDetailsModalComponent,
    GenericEmailModalComponent,
    PdfReportModalComponent,
    InvoiceRequiredInfoModalComponent,
    OpeningBalanceRequiredInfoModalComponent,
    CreditNoteRequiredInfoModalComponent,
    AddNewIntrestItemComponent,
    AddDiscountItemComponent,
    AddCreditnoteItemModalComponent,
    AddCreditnoteModalComponent,
    PdfReportComponent,
    EditableTableComponent,
    AddNewCustomerModalComponent,
    AddNewContactModalComponent,
    AddOwnersMoneyLoanAccountModalComponent,
    AddOwnersMoneyLoanAccountItemModalComponent,
    EmailConfirmationModalComponent,
    AddLoanAccountModalComponent,
    AddLoanAccountItemModalComponent,
    OpenStaffPackageDetailsCustomItemModalComponent,
    CashFlowComponent,
    OpenPayslipCustomItemModalComponent,
    AbsaManualHandoverModalComponent,
    ActivateCompanyModalComponent,
    AddCompanyHistoryModalComponent,
    ChangeReportingcategoryModelComponent,
    ChangeSubscriptionModalComponent,
    ExtendSubscriptionModalComponent,
    SubscriptionHistoryModelComponent,
    DeactivateCompanyModalComponent,
    AuditingComponent,
    PortalEmailModalComponent,
    NewLicenseesModalComponent,
  ],
})
export class SharedLibModule {}
