import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Column, ColumnType, api, searchUIOptions, resourceMessages } from "packages/shared-lib/src/lib/interfaces/webclient.interface";
import { webPortal } from "packages/shared-lib/src/lib/services/api/webportal.api";
import { DataService } from "packages/shared-lib/src/lib/services/data.service";
import { ModalService } from "packages/shared-lib/src/lib/services/modal.service";
import { TableComponent } from "packages/shared-lib/src/lib/ui/elements/table/table.component";

@Component({
  selector: "admin-licensees",
  templateUrl: "./licensees.component.html",
})
export class LicenseesComponent implements OnInit {
  @ViewChild(TableComponent) child: TableComponent | undefined;

  constructor(private router: Router, private dataService: DataService, private modalService: ModalService) { }
  exportButton = false;
  refreshButton = true;
  pdfButton = false;
  addNewButton = true;
  title = 'Licensees';
  updateURL = '/licensees/';

  licenseesColumns: Column[] = [
    { columnDef: 'name', header: 'Licensees Name', columnType: ColumnType.link, },
    { columnDef: 'numberOfVouchers', header: 'Number of Licenses' },
    { columnDef: 'contactTelephone', header: 'Telephone' },
    { columnDef: 'contactName', header: 'Name' },
    { columnDef: 'contactEmail', header: 'Email' },
  ];

  ngOnInit() {
    const flag = '' // implementing OnInit requires ngOnInit to be implemented.
  }

  api: api = {
    get: webPortal.getLicensees,
  };

  searchUIOptions: searchUIOptions = {
    searchInput: true,
  }

  resourceMessages: resourceMessages = {
    tableSearchPlaceHolder: "search company, country, email, type, frequency, reseller and campaign..."
  };

  addNewLicensees() {
    this.modalService.showAddNewLicenseesModal().result.then(() => {
      this.child?.getData(true);
    });
  }

  handleUpdateButtonClick(param: any) {
    this.router.navigateByUrl(this.updateURL + param.id);
  }
}