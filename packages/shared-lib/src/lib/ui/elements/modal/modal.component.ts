import { Component, ElementRef, Input, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
@Component({
  selector: "lib-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;
  @Input() modalID?: string;
  @Input() modalStyle?: string;
  @Input() modalTitle?: string;
  @Input() modalIconClass?: string;
  @Input() modalOkName?: string;
  @Input() modalOkColor?: string;
  @Input() modalCancelName?: string = "";
  @Input() modalCancelColor?: string;
  @Input() buttonOrder?: boolean = true;
   @Input() visible?: boolean = true;
  cancelName = "";
  okName = "";
  cancelColour = "";
  okColour = "";
  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.cancelName =
      this.modalCancelName !== undefined ? this.modalCancelName : "";
    this.okName = this.modalOkName !== undefined ? this.modalOkName : "";
    this.cancelColour =
      this.modalCancelColor !== undefined ? this.modalCancelColor : "";

    this.modalService.add(this);
    document.body.appendChild(this.element);
    this.element.addEventListener("click", (el: any) => {
      if (el.target.className === "modal") {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    this.modalService.remove(this);
    this.element.remove();
  }

  modalClose() {
    this.modalService.close();
    this.close();
  }

  actionFunction() {
    this.close();
    this.modalService.save(this.element);
  }
  open() {
    this.element.style.display = "block";
    document.body.classList.add("modal-open");
    this.isOpen = true;
  }

  close() {
    this.element.style.display = "none";
    document.body.classList.remove("modal-open");
    this.isOpen = false;
  }
}
