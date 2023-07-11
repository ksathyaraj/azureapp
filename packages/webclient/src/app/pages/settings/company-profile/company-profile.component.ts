import { Component } from "@angular/core";
import { tabData } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { MessagingService } from 'packages/shared-lib/src/lib/services/messaging.service';
import { ModalService } from 'packages/shared-lib/src/lib/services/modal.service';
import { DataService } from 'packages/shared-lib/src/lib/services/data.service';
import { DateService } from 'packages/shared-lib/src/lib/services/date.service';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service';
import { TranslateService } from "@ngx-translate/core";
import { EnumsService } from 'packages/shared-lib/src/lib/services/enums.services';
import { webApi } from "packages/shared-lib/src/lib/services/api/webclient.api";
import { HttpEventType } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { map } from "rxjs";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { webConstants } from "packages/shared-lib/src/lib/constants/web.constants";
import { LookupDataService } from "packages/shared-lib/src/lib/services/lookup-data.service";

@Component({
  selector: "web-company-profile",
  templateUrl: "./company-profile.component.html",
  styleUrls: ["./company-profile.component.css"],
})
export class CompanyProfileComponent {

  constructor(
    private messagingService: MessagingService,
    private enumsService: EnumsService,
    private dataService: DataService,
    private dateService: DateService,
    private notificationBarService: NotificationBarService,
    private translateService: TranslateService,
    private modalService: ModalService,
    private lookupDataService : LookupDataService

  ) { }


  countries: any = {};
  companySettings: any = {};
  companyProfileImage: any = {};
  businessTypes: any = {};
  selectedBusinessType: string = '';
  countryName: String = '';
  countryDisabled: boolean = false;
  showProgressbar: boolean = true;
  saveSuccessMessage = '';
  modelHeading: String = '';
  companyProfileInfo: String = '';
  ckNumber: String = '';
  directorsNames: String = '';
  directorsTrusteesNames: String = '';
  membersNames: String = '';
  registrationNumber: String = '';
  companySettingsCopy: any = '';
  uploaderFileName: string = '';
  uploaderImage: any = '';
  progress = 0;
  importFailedMessage: string = '';
  imageSrc: string = '';
  companyTypeDisplayModel = {
    isVisable: false,
    ownerTextLabel: '',
    ckTextLabel: '',
    isRequired: false
  };
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  browse = false;


  //input tab data
  tabData: tabData[] = [
    { routerLink: '/settings/companyprofile', header: 'resources.settings-companyprofile-panelheading-companyprofile', isActive: true },

    { routerLink: '/settings/taxinformation', header: 'resources.settings-companyprofile-tabheading-taxinformation' },

    { routerLink: '/settings/prefixandstartingnumber', header: 'resources.settings-companyprofile-tabheading-prefixandstartingnumbersettings' },

    { routerLink: '/settings/bankingdetails', header: 'resources.settings-companyprofile-tabheading-bankingdetails-panelheading-bankingdetails' },

    { routerLink: '/settings/currency', header: 'resources.settings-companyprofile-tabheading-currency' },

    { routerLink: '/settings/partnerapps', header: 'Partner Apps' }
  ]

  supportVideoBaseUrl = webConstants.companyProfileHelpUrl;

  ngOnInit() {

    this.activate();
    this.getData(false, false);
    this.countryName = this.getSelectedCountryName();
    this.countryDisabled = true;
    this.companyTypeChange();
  }

  private async getData(refresh: boolean, hideOverlay: boolean) {
    await Promise.all([
      this.dataService
        .getRecord(webApi.getCountryName)
        .subscribe((result) => {
          this.companySettings = result;
          this.selectedBusinessType = this.companySettings.organisationTypeId;
          this.companyTypeChange();
        }),
      this.lookupDataService.getCompanyProfileImage(true,false).subscribe((result) => {
          this.companyProfileImage = result;
        }),
      this.dataService
        .getRecord(webApi.getBusinessTypesForCompanySettings + '/' + this.companySettings.countryId)
        .subscribe((result: any) => {
          this.businessTypes = result;
        }),
      await this.dataService
        .getRecord(webApi.getSupportedCountries)
        .subscribe((result) => {
          this.countries = result;
        }),
    ])
  }

  

  onFileSelected(event: any) {

    const fileUploadApi = webApi.imageUpload !== undefined ? webApi.imageUpload : '';
    const file = event?.target?.files[0];
    this.showProgressbar = true;
    this.uploaderFileName = file.name;
    if (file && file.size < 4194304) {
      const formData = new FormData();
      formData.append("file", file);
      this.dataService.getFileUploaderInstance(fileUploadApi, formData)
        .pipe(
          map((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.progress = Math.round((100 / event.total) * event.loaded);
              this.lookupDataService.getCompanyProfileImage(true,false).subscribe((data:any)=>{
                            this.companyProfileImage=data;
                            this.progress = 0;
                            this.messagingService.broadcastCompanyProfileSaved(this.companyProfileImage);
              })
            }
          }),

          catchError((err: any) => {
            this.progress = 0;
            this.notificationBarService.warning(this.importFailedMessage, '');
            return throwError(err.message);
          }) 
           ) .toPromise();
    } else {
        this.notificationBarService.warning("The file being uploaded can't be more than 4MB");
        return;
    }

  }

  initTranslation() {
    this.translateService.get('resources.common-messages-savesuccessmessage').subscribe((msg: any) => {
      this.saveSuccessMessage = msg;
      this.companyTypeChange();
    });

    this.translateService.get('resources.companyprofile-controller-title-companyprofile').subscribe((msg: any) => {
      this.modelHeading = msg;
      this.companyTypeChange();
    });
    this.translateService.get('resources.companyprofile-controller-companyprofileinfo').subscribe((msg: any) => {
      this.companyProfileInfo = msg;
      this.companyTypeChange();
    });

    this.translateService.get('resources.companyprofilewizard-companytypechange-label-cknumber').subscribe((msg: any) => {
      this.ckNumber = msg;
      this.companyTypeChange();
    });

    this.translateService.get('resources.companyprofilewizard-companytypechange-label-directorsnames').subscribe((msg: any) => {
      this.directorsNames = msg;
      this.companyTypeChange();
    });

    this.translateService.get('resources.companyprofilewizard-companytypechange-label-directorstrusteesnames').subscribe((msg: any) => {
      this.directorsTrusteesNames = msg;
      this.companyTypeChange();
    });

    this.translateService.get('resources.companyprofilewizard-companytypechange-label-membersnames').subscribe((msg: any) => {
      this.membersNames = msg;
      this.companyTypeChange();
    });

    this.translateService.get('resources.companyprofilewizard-companytypechange-label-registrationnumber').subscribe((msg: any) => {
      this.registrationNumber = msg;
      this.companyTypeChange();
    });
  }


  getSelectedCountryName() {
    let selectedCountryName = '';
    if (this.countries.length > 0) {
      this.countries.forEach((country: any) => {
        if (country.key === this.companySettings.countryId) {
          selectedCountryName = country.value
        }
      })
    }
    return selectedCountryName;

  }

  async setCompanyTypeDisplay(isVisable: any, isRequired: boolean, ownerText?: any, ckText?: any) {
    this.companyTypeDisplayModel.isVisable = isVisable;
    this.companyTypeDisplayModel.ownerTextLabel = ownerText;
    this.companyTypeDisplayModel.ckTextLabel = ckText;
    this.companyTypeDisplayModel.isRequired = isRequired;
  }

  async companyTypeChange() {
    switch (Number(this.selectedBusinessType)) {
      case this.enumsService.businessTypeEnum.soleProprietorZa:
        this.setCompanyTypeDisplay(false, false,);
        break;
      case this.enumsService.businessTypeEnum.closeCorpZa:
        this.setCompanyTypeDisplay(true, true, this.membersNames, this.ckNumber);
        break;
      case this.enumsService.businessTypeEnum.companyPtyLtdZa:
        this.setCompanyTypeDisplay(true, true, this.directorsNames, this.registrationNumber);
        break;
      case this.enumsService.businessTypeEnum.nonProfitZa:
        this.setCompanyTypeDisplay(true, true, this.directorsTrusteesNames, this.registrationNumber);
        break;
      default:
        this.setCompanyTypeDisplay(true, true, this.directorsNames, this.registrationNumber);
    }

  }

  save(frmcompanyprofile: any) {
    this.messagingService.broadcastCheckFormValidatity();
    if (!frmcompanyprofile.invalid) {
      this.companySettingsCopy = JSON.parse(JSON.stringify(this.companySettings))
      this.companySettingsCopy.organisationType = this.companySettingsCopy.organisationType.value;
      this.companySettingsCopy.registeredDate = this.dateService.getFormattedDateForWebApi(this.companySettingsCopy.registeredDate);

      this.dataService.post(webApi.postCompanySettings, this.companySettingsCopy)
        .subscribe(() => {
          this.messagingService.broadcastCompanyProfileSaved();
          this.notificationBarService.success(this.saveSuccessMessage);
        })
    }
  }

  showInfo() {
    this.modalService.messageModal(this.modelHeading, this.companyProfileInfo)
  }

  activate() {
    this.initTranslation();
  }

}