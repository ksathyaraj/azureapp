import {
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "lib-pdf-report-modal",
  templateUrl: "./pdf-report-modal.component.html",
})
export class PdfReportModalComponent {
 @Input() public modalInstance: any;
   
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal
  ) { }
  passBack() {
    this.passEntry.emit(this.modalInstance);
    this.activeModal.close(this.modalInstance);
  }

}
