import { Component, Input } from "@angular/core";
import { tabData } from "../../../interfaces/webclient.interface";

@Component({
  selector: "lib-page-tab-bar",
  templateUrl: "./page-tab-bar.component.html",
  styleUrls: ["./page-tab-bar.component.scss"],
})
export class PageTabBarComponent {
  @Input() tabData: tabData[] = [];

}
