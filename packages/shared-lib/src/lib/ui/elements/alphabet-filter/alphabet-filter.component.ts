import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "lib-alphabet-filter",
  templateUrl: "./alphabet-filter.component.html",
  styleUrls: ["./alphabet-filter.component.scss"],
})
export class AlphabetFilterComponent {
  @Output() letterToSearch: EventEmitter<string> = new EventEmitter(); 

  str = "abcdefghijklmnopqrstuvwxyz";
  alphabet = this.str.toUpperCase().split("");
  activeLetter = '';
  activateLetter = (letter:string) => {
    this.activeLetter = letter;
    this.letterToSearch.emit(this.activeLetter);
  };
  
}
