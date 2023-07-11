import { Injectable } from '@angular/core';
import {NavigationService} from "../services/navigation.service"

@Injectable({
  providedIn: 'root'
})
export class InsufficientPermissionService {

  constructor(private navigationService:NavigationService) { }
  private screenName = '';

        tellUserTheyDontHavePermissions (screen:any) {
            this.screenName = screen;
            this.navigationService.goToInsufficientPermissions();
        }

        getScreenNameThatUserDoesntHavePermissionFor () {
            return this.screenName;
        }
}
