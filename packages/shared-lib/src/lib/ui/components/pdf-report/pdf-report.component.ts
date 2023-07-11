import { Component, ElementRef, Input, ViewChild} from "@angular/core";
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: "lib-pdf-report",
  templateUrl: "./pdf-report.component.html",
  styleUrls: ["./pdf-report.component.scss"],
})
export class PdfReportComponent {
  isLoading = true;
  constructor(public domSanitizer: DomSanitizer){}

  @Input()
  iframesrc=""
  
  sanitizedSource: SafeResourceUrl="";

  @ViewChild("iframe") iframe:ElementRef | undefined;

  ngOnInit(){
    this.sanitizedSource = this.domSanitizer.bypassSecurityTrustResourceUrl(this.iframesrc)
  }

  ngAfterViewInit(){
    if(this.iframe)
      this.iframe.nativeElement.onload=this.pdfLoaded.bind(this);
  }

  getPdfUrl(): SafeResourceUrl {
    return this.sanitizedSource;
  }
  
  pdfLoaded(){
    this.isLoading=false
  }

}
