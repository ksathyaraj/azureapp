import { Component, Input, OnInit, Optional } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";

@Component({
  selector: "lib-email-confirmation-modal",
  templateUrl: "./email-confirmation-modal.component.html",
  styleUrls: ["./email-confirmation-modal.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class EmailConfirmationModalComponent implements OnInit {
  @Input() params: any;
  disableAddContacts = false;
  unSavedEmailAddress = [];
  individuals: any = [];
  individualContactType: any = [];
  saveSuccessMessage = "";

  constructor(
    @Optional() public ngForm: NgForm,
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private translateService: TranslateService,
    private messagingService: MessagingService,
    private notificationService: NotificationBarService
  ) {}

  ngOnInit() {
    this.unSavedEmailAddress = this.params.unSavedEmailAddress;
    this.init();
    this.getIndividualContactTypes();
    this.getTranslation();
  }

  init() {
    if (this.unSavedEmailAddress) {
      this.individuals = [];
      for (let i = 0; i < this.unSavedEmailAddress.length; i++) {
        this.individuals.push({
          ngfrm: "ngfrm" + i,
          isNewContact: false,
          organisationId: this.params.contactId,
          firstName: "",
          lastName: "",
          emailAddress: this.unSavedEmailAddress[i],
          individualContactType: "",
        });
      }
      this.disableAddContacts = true;
    }
  }

  getIndividualContactTypes() {
    this.dataService
      .getLookupData(webApi.individualContactTypes, true)
      .subscribe((data: any) => {
        this.individualContactType = data;
      });
  }

  closeData = webConstants.closeData;
  okClick = webConstants.okClick;

  selectionChanged() {
    let isAnyEmailSelectedToAdd = false;
    for (let i = 0; i < this.individuals.length; i++) {
      if (this.individuals[i].isNewContact == true) {
        isAnyEmailSelectedToAdd = true;
      }
    }
    if (isAnyEmailSelectedToAdd) {
      this.disableAddContacts = false;
    } else {
      this.disableAddContacts = true;
    }
  }

  onInputContact(contact: any) {
    if (
      contact.isNewContact == true &&
      contact.firstName == "" &&
      contact.lastName == "" &&
      contact.individualContactType == ""
    ) {
      // contact.isNewContact = false;
    } else {
      contact.isNewContact = true;
    }
    this.selectionChanged();
  }

  onBlur(contact: any) {
    if(contact.firstName == "" &&
    contact.lastName == "") contact.isNewContact = false;
    this.selectionChanged();
  } 

  passBack() {
    this.messagingService.broadcastCheckFormValidatity();
    let IsAllFormsValid = true;
    const individualsToBeSaved = [];
    for (let i = 0; i < this.individuals.length; i++)
      if (this.individuals[i].isNewContact == true) {
        individualsToBeSaved.push(this.individuals[i]);
        if (
          this.individuals[i].firstName === "" ||
          this.individuals[i].lastName === ""
        ) {
          IsAllFormsValid = false;
          break;
        }
      }
    if (individualsToBeSaved.length > 0 && IsAllFormsValid) {
      this.dataService
        .post(webApi.saveMultipleIndividual, individualsToBeSaved)
        .subscribe(() => {
          this.notificationService.success(this.saveSuccessMessage);
          this.activeModal.close(this.okClick);
        });
    }
  }

  closeModal() {
    this.activeModal.dismiss(this.closeData);
  }

  getTranslation() {
    this.translateService
      .get(
        "resources.emailconfirmationmodal-label-individualcontactssavedsuccessfully"
      )
      .subscribe((res: string) => {
        this.saveSuccessMessage = res;
      });
  }
}
