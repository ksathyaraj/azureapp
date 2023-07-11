import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddNewAccountModalComponent } from "../ui/elements/modal/webClient/addNewAccountModal/add-new-account-modal.component";
import { GenericDeleteConfirmationModalComponent } from "../ui/elements/modal/generic/genericDeleteConfirmationModal/generic-delete-confirmation-modal.component";
import { GenericEmailModalComponent } from "../ui/elements/modal/generic/genericEmailModal/generic-email-modal.component";
import { GenericMessageModalComponent } from "../ui/elements/modal/generic/genericMessageModal/generic-message-modal.component";
import { GenericPasswordConfirmModalComponent } from "../ui/elements/modal/generic/genericPasswordConfirmModal/generic-password-confirm-modal.component";
import { GenericQuestionModalComponent } from "../ui/elements/modal/generic/genericQuestionModal/generic-question-modal.component";
import { GenericStartingDetailsModalComponent } from "../ui/elements/modal/generic/genericStartingDetailsModal/generic-starting-details-modal.component";
import { ModalComponent } from "../ui/elements/modal/modal.component";
import { PdfReportModalComponent } from "../ui/elements/modal/generic/pdfReportModal/pdf-report-modal.component";
import { AddOwnersMoneyLoanAccountModalComponent } from "../ui/elements/modal/webClient/addOwnersMoneyLoanAccountModal/add-owners-money-loan-account-modal.component";
import { AddOwnersMoneyLoanAccountItemModalComponent } from "../ui/elements/modal/webClient/addOwnersMoneyLoanAccountItemModal/add-owners-money-loan-account-item-modal.component";
import { AddNewIntrestItemComponent } from "../ui/elements/modal/webClient/supplier-invoice/add-new-intrest-item/add-new-intrest-item.component";
import { AddDiscountItemComponent } from "../ui/elements/modal/webClient/supplier-invoice/add-discount-item/add-discount-item.component";
import { AddNewCustomerModalComponent } from "../ui/elements/modal/webClient/addNewCustomerModal/add-new-customer-modal.component";
import { AddNewContactModalComponent } from "../ui/elements/modal/webClient/addNewContactModal/add-new-contact-modal.component";
import { EmailConfirmationModalComponent } from "../ui/elements/modal/generic/email-confirmation-modal/email-confirmation-modal.component";
import { AddLoanAccountModalComponent } from "../ui/elements/modal/webClient/addLoanAccountModal/add-loan-account-modal.component";
import { AddLoanAccountItemModalComponent } from "../ui/elements/modal/webClient/addLoanAccountItemModal/add-loan-account-item-modal.component";
import { AddCreditnoteItemModalComponent } from "../ui/elements/modal/webClient/finance/creditnotes/add-creditnote-item-modal/add-creditnote-item-modal.component";
import { AddCreditnoteModalComponent } from "../ui/elements/modal/webClient/finance/creditnotes/add-creditnote-modal/add-creditnote-modal.component";
import { OpenPayslipCustomItemModalComponent } from "../ui/elements/modal/webClient/openPayslipCustomItemModal/open-payslip-custom-item-modal.component";
import { InvoiceRequiredInfoModalComponent } from "../ui/elements/modal/webClient/invoiceRequiredInfoModal/invoice-required-info-modal.component";
import { OpeningBalanceRequiredInfoModalComponent } from "../ui/elements/modal/webClient/openingBalanceRequiredInfoModal/opening-balance-required-info-modal.component";
import { CreditNoteRequiredInfoModalComponent } from "../ui/elements/modal/webClient/creditNoteRequiredInfoModal/credit-note-required-info-modal.component";
import { OpenStaffPackageDetailsCustomItemModalComponent } from "../ui/elements/modal/webClient/openStaffPackageDetailsCustomItemModal/open-staff-package-details-custom-item-modal.component";
import { CashFlowComponent } from "../ui/elements/modal/webClient/cash-flow/cash-flow.component";
import { ExtendSubscriptionModalComponent } from "../ui/elements/modal/webClient/extendSubscriptionModal/extend-subscription-modal.component";
import { ChangeSubscriptionModalComponent } from "../ui/elements/modal/webClient/changeSubscriptionModal/change-subscription-modal.component";
import { AbsaManualHandoverModalComponent } from "../ui/elements/modal/webClient/absaManualHandoverModal/absa-manual-handover-modal.component";
import { ActivateCompanyModalComponent } from "../ui/elements/modal/webClient/activateCompanyModal/activate-company-modal.component";
import { DeactivateCompanyModalComponent } from "../ui/elements/modal/webClient/deactivateCompanyModal/deactivate-company-modal.component";
import { SubscriptionHistoryModelComponent } from "../ui/elements/modal/webClient/subscriptionHistoryModel/subscription-history-model.component";
import { AddCompanyHistoryModalComponent } from "../ui/elements/modal/webClient/addCompanyHistoryModal/add-company-history-modal.component";
import { ChangeReportingcategoryModelComponent } from "../ui/elements/modal/webClient/changeReportingcategoryModel/change-reportingcategory-model.component";
import { AuditingComponent } from "../ui/elements/modal/portal/auditing/auditing.component";
import { PortalEmailModalComponent } from "../ui/elements/modal/portal/portal-email-modal/portal-email-modal.component";
import { NewLicenseesModalComponent } from "../ui/elements/modal/portal/vouchers/newLicenseesModal/new-licensees-modal.component";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private modalService: NgbModal) { } 
  
  private modals: ModalComponent[] = [];

  add(modal: ModalComponent) {
    if (!modal.id || this.modals.find((x) => x.id === modal.id)) {
      throw new Error("modal must have a unique id attribute");
    }
    this.modals.push(modal);
  }

  remove(modal: ModalComponent) {
    this.modals = this.modals.filter((x) => x !== modal);
  }

  open(id: string) {
    const modal = this.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }

  close() {
    const modal = this.modals.find((x) => x.isOpen);
    modal?.close();
  }

  save(modalData: any) {
    this.close();
  }
  
  confirmDelete(confirmationMessage: any) {
    // To Call delete service -->  this.modalService.confirmDelete(this.confirmationMessage).result.then((data));

    const modalRef = this.modalService.open(
      GenericDeleteConfirmationModalComponent
    );
    modalRef.componentInstance.confirmationMessage = confirmationMessage;
    // modalRef.result.then((result:any) => {
    //   if (result) {
    //     console.log('result from delete modal', result);
    //    return result;
    //   }
    // });
    return modalRef;
  }

  messageModal(title:any, incomingMessage:any, lang?: any) {
    const modalRef = this.modalService.open(
      GenericMessageModalComponent,
    );
   const message = {
      title: title,
      message: incomingMessage,
      lang: lang
    }
    modalRef.componentInstance.modalInstance = message;
    return modalRef;
  }
  questionModal(title:string, incomingMessage:string) {
    const modalRef = this.modalService.open(
      GenericQuestionModalComponent
    );
   const message = {
      title: title,
      message: incomingMessage
    }
    modalRef.componentInstance.modalInstance = message;
    return modalRef;
  }

  addNewAccountModal(title:string, incomingMessage:string) {
    const modalRef = this.modalService.open(
      AddNewAccountModalComponent
    );
   const message = {
      title: title,
      message: incomingMessage
    }
    modalRef.componentInstance.modalInstance = message;
    return modalRef;
  }

  confirmPasswordToProceed(title:string, incomingMessage:string) {
    const modalRef = this.modalService.open(
      GenericPasswordConfirmModalComponent
    );
   const message = {
      title: title,
      message: incomingMessage
    }
    modalRef.componentInstance.modalInstance = message;
    return modalRef;
  }

   genericStartingDetailsModal(prefix:any, startingNumber:any) {
    const modalRef = this.modalService.open(
      GenericStartingDetailsModalComponent
    );
   const message = {
      prefix: prefix,
      startingNumber: startingNumber
    }
    modalRef.componentInstance.modalInstance = message;
     return modalRef;
   }
  
  genericEmailModal(params: any) {
    const modalRef = this.modalService.open(
      GenericEmailModalComponent, { size: 'xl' }
    );
    modalRef.componentInstance.params = params;
     return modalRef;
  }

  emailConfirmationModal(params: any) {
    const modalRef = this.modalService.open(
      EmailConfirmationModalComponent, { size: params?.unSavedEmailAddress?.length > 0 ? 'xl': 'md' }
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  openPdfReportModal(reportname: any, pdfurl: any) {
    const modalRef = this.modalService.open(
        PdfReportModalComponent,{size:'lg'}
    );
    const message = {
      reportName: reportname,
      pdfUrl: pdfurl
    }
    modalRef.componentInstance.modalInstance = message;
    return modalRef;
  }

  addIntrestItem(params: any) {
    const modalRef = this.modalService.open(
      AddNewIntrestItemComponent
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  addDiscountOrSalesItem(params: any) {
     const modalRef = this.modalService.open(
      AddDiscountItemComponent
     );
     modalRef.componentInstance.params = params;
     return modalRef;
   }

   cashFlowModel(params: any) {
    const modalRef = this.modalService.open(
      CashFlowComponent,{size:'lg'}
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  addOwnersMoneyLoanAccountModal(loanAccountId: any, displayName: any, customLedgerAccountId: any) {
    const modalRef = this.modalService.open(
      AddOwnersMoneyLoanAccountModalComponent , {size: 'md' }
    );
    const params = {
      loanAccountId: loanAccountId,
      displayName:displayName,
      customLedgerAccountId: customLedgerAccountId
    }
    modalRef.componentInstance.params = params;
    return modalRef;

  }

  addOwnersMoneyLoanAccountItemModal(params: any) {
    const modalRef = this.modalService.open(
      AddOwnersMoneyLoanAccountItemModalComponent ,  {size: 'lg' }
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  addLoanAccountModal(loanAccountId: any, displayName: any, customLedgerAccountId: any) {
    const modalRef = this.modalService.open(
      AddLoanAccountModalComponent , {size: 'md'}
    );
    const params = {
      loanAccountId: loanAccountId,
      displayName: displayName,
      customLedgerAccountId: customLedgerAccountId
    }
    modalRef.componentInstance.params = params;
    return modalRef;

  }

  addLoanAccountItemModal(params: any) {
    const modalRef = this.modalService.open(
      AddLoanAccountItemModalComponent , {size: 'lg'}
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  addNewCustomerModal() {
    const modalRef = this.modalService.open(
      AddNewCustomerModalComponent,{size:'lg'}
    );
    return modalRef;
   }
   

  addNewContactModal(params: any) {
    const modalRef = this.modalService.open(
      AddNewContactModalComponent,{size:'lg'}
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  addCreditNoteItemModal(params: any) {
    const modalRef = this.modalService.open(
      AddCreditnoteItemModalComponent,{size:'lg'}
    );
    modalRef.componentInstance.params = params;
    return modalRef;
    }
  
  addNewCreditNote() {
     const modalRef = this.modalService.open(
      AddCreditnoteModalComponent,{size:'lg'}
    );
    modalRef.componentInstance.modalInstance = '';
    return modalRef;
  }
  openPayslipCustomItemModal(item?:any){
    const modalRef = this.modalService.open(
      OpenPayslipCustomItemModalComponent,
    );
    modalRef.componentInstance.item = item;
    return modalRef;
  }

  addInvoiceRequiredInfoModal(params:any) {
      const modalRef = this.modalService.open(
        InvoiceRequiredInfoModalComponent,{size:'md'}
      );
        const message= {
          modalTitle: params.modalTitle,
          contactRelationshipTypes: params.contactRelationshipTypes,
          contactRelationshipType: params.contactRelationshipType
        }
    modalRef.componentInstance.params = message;
    return modalRef;
  }

  addOpeningBalanceRequiredInfoModal(params:any) {
    const modalRef = this.modalService.open(
      OpeningBalanceRequiredInfoModalComponent,{size:'md'}
    );
      const message={
          modalTitle: params.modalTitle,
          contactRelationshipTypes: params.contactRelationshipTypes,
          contactRelationshipType: params.contactRelationshipType
      }
      modalRef.componentInstance.params = message;
      return modalRef; 
  }

  addCreditNoteRequiredInfoModal(params:any) {
    const modalRef = this.modalService.open(
      CreditNoteRequiredInfoModalComponent,{size:'md'}
    );
   const message={
            modalTitle: params.modalTitle
        };

      modalRef.componentInstance.params = message;
      return modalRef; 
  }


  openStaffPackageDetailsCustomItemModal(item?: any) {
    const modalRef = this.modalService.open(
      OpenStaffPackageDetailsCustomItemModalComponent
    );
    modalRef.componentInstance.item = item;
    return modalRef;
  }


  showExtendSubscriptionExpiry(subscriptionId:any, company:any) {
    const modalRef = this.modalService.open(
      ExtendSubscriptionModalComponent
    );
    const params = {
      subscriptionId : subscriptionId,
      company : company
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showChangeSubscriptionExpiry(subscriptionId: any, company: any) {
    const modalRef = this.modalService.open(
      ChangeSubscriptionModalComponent
    );
    const params = {
      subscriptionId : subscriptionId,
      company : company
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showManualAbsaHandover(company: any) {
    const modalRef = this.modalService.open(
      AbsaManualHandoverModalComponent
    );
    const params = {
      company : company
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showChangeReportingCategory(subscriptionId:any, company:any) {
    const modalRef = this.modalService.open(
      ChangeReportingcategoryModelComponent
    );
    const params = {
      subscriptionId : subscriptionId,
      company : company
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showActivateCompanyModal(params:any) {
    const modalRef = this.modalService.open(
      ActivateCompanyModalComponent
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showDeActivateCompanyModal(params:any) {
    const modalRef = this.modalService.open(
      DeactivateCompanyModalComponent
    );
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showSubscriptionHistory(company:any) {
    const modalRef = this.modalService.open(
      SubscriptionHistoryModelComponent,{size:'lg'}
    );
    const params = {
      companyId : company.id
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }


  showAddCompanyHistory(company:any) {
    const modalRef = this.modalService.open(
      AddCompanyHistoryModalComponent
    );
    const params = {
      company : company
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  auditing(audit:any) {
    const modalRef = this.modalService.open(
      AuditingComponent,{size:'xl'}
    );
    const params = {
      audit : audit
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }

  showPortalEmailModal(title:any){
    const modalRef = this.modalService.open(
      PortalEmailModalComponent,{size:'md'}
    );
    const params = {
      title: title
    }
    modalRef.componentInstance.params = params;
    return modalRef;
  }
  

  showAddNewLicenseesModal(){
    const modalRef = this.modalService.open(
      NewLicenseesModalComponent,{size:'lg'}
    );
    return modalRef;
    
  }
}
