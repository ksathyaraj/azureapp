import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {
  constructor(private toastrService: ToastrService,private messagingService:MessagingService) {
    this.messagingService.listenGlobalErrorEvent(this.globalErrorEvent.bind(this));
    this.messagingService.listenGlobalWarningEvent(this.globalWarningEvent.bind(this));
    // this.messagingService.listenGlobalClearErrorEvent(this.closeAll);
  }

  success(description: string, title?: string): void {
    if(!title) title = '';
    this.toastrService.success(description, title);
  }

  showInfo(description: string, title?: string): void {
    if(!title) title = '';
    this.toastrService.info(description, title);
  }

  warning(description: string, title?: string): void {
    if(!title) title = '';
    this.toastrService.warning(description, title);
  }

  error(description: string, title?: string): void {
       if(!title) title = '';
    this.toastrService.error(description, title);
  }

  closeAll() {
      // notifications.closeAllErrors();
      // notifications.closeAllWarnings();
  }

  globalErrorEvent(args:any) {
      this.error(args.errorMessage);
  }

  globalWarningEvent(args:any) {
    this.warning(args.message);
  }

}
