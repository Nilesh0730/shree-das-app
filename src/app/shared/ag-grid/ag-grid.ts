import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  GridApi,
  GridOptions
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

  // --- Dynamic Inputs ---
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];

  // Features Control
  @Input() enablePagination: boolean = false;
  @Input() enableFilter: boolean = true;
  @Input() enableSorting: boolean = true;
  @Input() pageSize: number = 15;
  @Input() pageSizeOptions: number[] = [15, 30, 50, 100];
  @Input() isLoading: boolean = false;
  @Input() rowIdField: string = 'id';

  dynamicDefaultColDef: ColDef = {};
  // getRowId = (params: any) => params.data.userId;

  ngOnInit() {

    this.dynamicDefaultColDef = {
      filter: this.enableFilter,
      floatingFilter: this.enableFilter,
      sortable: this.enableSorting,
      resizable: true,
      flex: 1
    };
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (this.gridApi && changes['isLoading']) {
  //     if (this.isLoading) {
  //      this.gridApi.setGridOption('loading', this.isLoading);
  //     }
  //   }
  // }

  onGridReady(params: any) {
    this.gridApi = params.api;
    // if (this.isLoading) {
    //   this.gridApi.setGridOption('loading', true);
    // }
  }

  onSelectionChanged(event: any) {
    const selected = event.api.getSelectedRows();
    console.log('Selected rows:', selected);
  }

  updateRowData(updatedData: any) {
    if (!this.gridApi) return;

    const rowNode = this.gridApi.getRowNode(updatedData[0].userId);
    if (rowNode) {
      rowNode.setData(updatedData[0]);
    }
  }

  deleteRow(id: any) {
    if (!this.gridApi) return;

    this.gridApi.applyTransaction({
      remove: [{ userId: id }]
    });
  }

  getRowId = (params: any) => {
    return params.data[this.rowIdField];
  };

}
