import { Component } from "@angular/core";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { MessagingService } from "packages/shared-lib/src/lib/services/messaging.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { NotificationBarService } from "packages/shared-lib/src/lib/services/notification-bar.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "admin-registration-batch-settings",
  templateUrl: "./registration-batch-settings.component.html",
  styleUrls: ["./registration-batch-settings.component.scss"],
})
export class RegistrationBatchSettingsComponent {

  constructor(private messagingService : MessagingService,
    private modalService :ModalService,
    private notificationBarService : NotificationBarService,
    private dataService : DataService,
    private translateService : TranslateService)
    {}
  settings:any="";
  ngOnInit(){
    this.getData(true);
  }

  getData(refresh:any) {
    this.dataService.getRecord(webPortal.getAbsaRegistrationBatchSettings).subscribe((result:any) =>{
        this.settings = result[0];
    });
  }
  save (frm:any) {   
    const message = 'You have entered ' + this.settings.batchSize + ', is this correct?';
    this.messagingService.broadcastCheckFormValidatity();
    const batchValue = Number(frm.value.batchsize);
    if ((!frm.invalid) && batchValue<=500) {
        this.modalService.questionModal('Set Automated Job Batch?', message).result.then( () => {
            const entity:any = {
                JobId: this.settings.jobId,
                JobStatus: this.settings.jobStatus,
                BatchSize: this.settings.batchSize,
            };
            this.dataService.post(webPortal.saveAutomatedJobStatus,entity).subscribe( () => {
                this.notificationBarService.success('Saved changes to Automated Job successfully');
                this.getData(true);
            });
        });
    }
  }
  
}
