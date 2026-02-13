import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  GridApi
} from "ag-grid-community";
import { IUserDetails } from "../../models/user-details.model";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './ag-grid.html',
  styleUrls: ['./ag-grid.scss'],
})
export class AgGridComponent {

  gridApi!: GridApi;
  selectedRow: any | null = null;
  deleteMode: boolean = false;
  selectedData: any = null;
  paginationPageSize = 5;

  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  //@Output() addEditUserEvent = new EventEmitter<string>();

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };

  constructor(private router: Router) { }

  onSelectionChanged(event: any) {
    const selected = event.api.getSelectedRows();
    this.selectedRow = selected.length ? selected[0] : null;
    console.log('Selected rows:', selected);
  }

  editRow() {
    if (!this.selectedRow) return;
    //this.addEditUserEvent.emit(this.selectedRow.userId);
  }

  addNewUser() {
    if (this.selectedRow) this.selectedRow = null;
    //this.addEditUserEvent.emit('newuser');
  }

  onEdit(rowData: IUserDetails) {
    console.log('Editing row:', rowData);
   // this.addEditUserEvent.emit(rowData.userId);
  }

  onDelete(data: any): void {
    this.selectedData = data;   // store selected row
  //o $('#confirmDeleteModel').modal('show');
  }

  confirmDelete(): void {
    if (!this.selectedData) return;

    console.log("Deleting:", this.selectedData);

   //$('#confirmDeleteModel').modal('hide');
    this.selectedData = null;   // reset
  }

  onCancelDelete(): void {
    this.deleteMode = false;    // hide modal
    this.selectedData = null;   // resetooooooooooooo
  }
}

