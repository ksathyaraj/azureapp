import { Component } from '@angular/core';
import { searchUIOptions } from 'packages/shared-lib/src/lib/interfaces/webclient.interface';
import { NotificationBarService } from 'packages/shared-lib/src/lib/services/notification-bar.service';

@Component({
  selector: 'web-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  constructor( private notificationService: NotificationBarService) {

  }

  searchUIOptions: searchUIOptions = {
    searchInput: true,
    alphabetFilter: true
  };
  dummyData = '';

  notification(type: string) {
    if(type === 'success'){
    this.notificationService.success('This is a example of success notification.');
    } else if(type === 'showInfo') {
      this.notificationService.showInfo('This is a example of info notification.');
    } else if(type === 'warning') {
      this.notificationService.warning('This is a example of warning notification.');
    } else if(type === 'error') {
      this.notificationService.error('This is a example of error notification.');
    }
  }

  save(form: any) {
    console.info("form ", form);
  }
}
