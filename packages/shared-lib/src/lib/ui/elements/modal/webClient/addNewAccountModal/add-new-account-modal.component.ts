import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "lib-add-new-account-modal",
  templateUrl: "./add-new-account-modal.component.html",
  styleUrls: ["./add-new-account-modal.component.css"],
})
export class AddNewAccountModalComponent {
   @Input() public modalInstance: any;
   
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal
  ) { }
  
  
  passBack() {
    this.passEntry.emit(this.modalInstance);
    this.activeModal.close();
  }
}
