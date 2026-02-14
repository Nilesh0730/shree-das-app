import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  GridApi
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './ag-grid.html',
  styleUrls: ['./ag-grid.scss'],
})
export class AgGridComponent implements OnInit {

  gridApi!: GridApi;
  selectedRow: any | null = null;
  deleteMode: boolean = false;
  selectedData: any = null;
  paginationPageSize = 15;
  //paginationPageSizeSelector: number[] = [];

  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("rowData", this.rowData);
     console.log("columnDefs", this.columnDefs);
    // after loading rowData
    // this.setDynamicPageSizes();
  }

  // setDynamicPageSizes() {
  //   const totalRows = this.rowData.length;

  //   const baseSizes = [15, 25, 50, 100];

  //   // only include sizes less than or equal to total rows
  //   this.paginationPageSizeSelector = baseSizes.filter(size => size < totalRows);

  //   // always include total rows option
  //   this.paginationPageSizeSelector.push(totalRows);

  //   // if default page size bigger than total rows
  //   if (this.paginationPageSize > totalRows) {
  //     this.paginationPageSize = totalRows;
  //   }
  // }

  onSelectionChanged(event: any) {
    const selected = event.api.getSelectedRows();
    this.selectedRow = selected.length ? selected[0] : null;
    console.log('Selected rows:', selected);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

}

