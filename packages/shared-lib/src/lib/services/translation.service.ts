import { Injectable } from "@angular/core";
import { EnumsService } from "./enums.services";
import { SessionService } from "packages/shared-lib/src/lib/services/session.service";
@Injectable({
  providedIn: "root",
})
export class TranslationService {
  constructor(
    private enumService: EnumsService,
    private sessionService: SessionService
  ) {}
  getTaxInfoResourceKey(): any {
    let resourceKey;
    const countryId = Number(this.sessionService.countryid);
    switch (countryId) {
      case this.enumService.country.SouthAfrica:
        resourceKey = "resources.companyprofile-controller-taxinfo";
        break;
      case this.enumService.country.Nigeria:
        resourceKey = "resources.companyprofile-controller-taxinfo-ng";
        break;
      case this.enumService.country.Kenya:
        resourceKey = "resources.companyprofile-controller-taxinfo-ke";
        break;
      case this.enumService.country.Rwanda:
        resourceKey = "resources.companyprofile-controller-taxinfo-rw";
        break;
      case this.enumService.country.Swaziland:
        resourceKey = "resources.companyprofile-controller-taxinfo-sz";
        break;
      case this.enumService.country.Zambia:
        resourceKey = "resources.companyprofile-controller-taxinfo-zm";
        break;
      case this.enumService.country.Ghana:
        resourceKey = "resources.companyprofile-controller-taxinfo-gh";
        break;
      case this.enumService.country.Uganda:
        resourceKey = "resources.companyprofile-controller-taxinfo-ug";
        break;
      default:
        resourceKey = "resources.companyprofile-controller-taxinfo";
    }

    return resourceKey;
  }
}
