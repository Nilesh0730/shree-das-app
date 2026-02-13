// import { Component, EventEmitter, Input, Output } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { Router } from "@angular/router";
// import { AgGridAngular } from "ag-grid-angular";
// import {
//   AllCommunityModule,
//   ColDef,
//   ModuleRegistry,
//   RowSelectionOptions,
//   GridApi
// } from "ag-grid-community";
// import { IuserDetails } from "../common/interface/user-details.model";

// ModuleRegistry.registerModules([AllCommunityModule]);

// @Component({
//   selector: 'app-grid',
//   standalone: true,
//   imports: [CommonModule, AgGridAngular],
//   templateUrl: './grid.html',
//   styleUrls: ['./grid.scss'],
// })
// export class Grid {

//   gridApi!: GridApi;
//   selectedRow: any | null = null;
//   @Input() rowData: IuserDetails[] = [];
//   @Output() addEditUserEvent = new EventEmitter<string>();

//   columnDefs = [
//     {
//       headerName: '',
//       checkboxSelection: true, // ✅ checkbox in each row
//       headerCheckboxSelection: true, // ✅ "select all" checkbox in header
//       width: 50
//     },
//     {
//       headerName: 'Action',
//       cellRenderer: (params: any) => {
//         const eDiv = document.createElement('div');
//         eDiv.classList.add('action-cell');

//         // Three-dot button
//         const menuBtn = document.createElement('button');
//         menuBtn.innerHTML = '⋯';
//         menuBtn.classList.add('btn-menu');

//         // Dropdown menu
//         const menuDiv = document.createElement('div');
//         menuDiv.classList.add('action-menu');
//         menuDiv.style.display = 'none';

//         const editOption = document.createElement('div');
//         editOption.innerText = 'Edit';
//         editOption.classList.add('menu-item');
//         editOption.addEventListener('click', () => this.onEdit(params.data));

//         const deleteOption = document.createElement('div');
//         deleteOption.innerText = 'Delete';
//         deleteOption.classList.add('menu-item');
//         deleteOption.addEventListener('click', () => this.onDelete(params.data));

//         menuDiv.appendChild(editOption);
//         menuDiv.appendChild(deleteOption);

//         // Toggle menu visibility
//         menuBtn.addEventListener('click', () => {
//           menuDiv.style.display = menuDiv.style.display === 'none' ? 'block' : 'none';
//         });

//         eDiv.appendChild(menuBtn);
//         eDiv.appendChild(menuDiv);

//         return eDiv;
//       },
//       width: 120
//     },
//     { field: 'userName', headerName: 'श्री सदस्याचे नाव' },
//     { field: 'mobile', headerName: 'मोबाईल नंबर' },
//     { field: 'userAddress', headerName: 'पत्ता' },
//     { field: 'pinCode', headerName: 'पिनकोड' },
//     { field: 'emailId', headerName: 'ईमेल आयडी' },
//     { field: 'age', headerName: 'वय' },
//     { field: 'birthDate', headerName: 'जन्मतारीख' },
//     { field: 'gender', headerName: 'लिंग' },
//     { field: 'aadhar', headerName: 'आधार क्रमांक' },
//     { field: 'pan', headerName: 'पॅन क्रमांक' },
//     { field: 'userBaithakNo', headerName: 'बैठक क्रमांक' },
//     { field: 'userBaithakName', headerName: 'बैठक नाव' },
//     { field: 'userBaithakDay', headerName: 'बैठक दिवस' }
//   ];

//   defaultColDef: ColDef = {
//     filter: true,
//     floatingFilter: true,
//     sortable: true,
//     resizable: true,
//   };

//   rowSelection: RowSelectionOptions = {
//     mode: "singleRow", // 🔥 SINGLE ROW ONLY
//   };

//   paginationPageSize = 10;

//   constructor(private router: Router) { }

//   onSelectionChanged(event: any) {
//     const selected = event.api.getSelectedRows();
//     this.selectedRow = selected.length ? selected[0] : null;
//   }

//   editRow() {
//     if (!this.selectedRow) return;
//     this.addEditUserEvent.emit(this.selectedRow.id);
//   }

//   addNewUser() {
//     if (this.selectedRow) this.selectedRow = null;
//     this.addEditUserEvent.emit('newuser');
//   }

//   onEdit(rowData: any) {
//     console.log('Editing row:', rowData);
//     // Navigate to edit form or patch values into your form
//   }

//   onDelete(rowData: any) {
//     console.log('Deleting row:', rowData);
//     // Call your service to delete record
//     // this.userService.deleteBusinessProblem(rowData.id).subscribe({
//     //   next: () => {
//     //     console.log('✅ Deleted successfully');
//     //     // Refresh grid data
//     //   },
//     //   error: err => console.error('❌ Delete failed:', err)
//     // });
//   }

// }

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
  GridApi
} from "ag-grid-community";
import { IUserDetails } from "../../models/user-details.model";

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './grid.html',
  styleUrls: ['./grid.scss'],
})
export class Grid {

  gridApi!: GridApi;
  selectedRow: any | null = null;
  deleteMode: boolean = false;
  selectedData: any = null;

  @Input() rowData: IUserDetails[] = [];
  @Output() addEditUserEvent = new EventEmitter<string>();

  columnDefs: ColDef[] = [
    { field: 'userName', headerName: 'श्री सदस्याचे नाव' },
    { field: 'mobile', headerName: 'मोबाईल नंबर' },
    { field: 'userAddress', headerName: 'पत्ता' },
    { field: 'pinCode', headerName: 'पिनकोड' },
    { field: 'emailId', headerName: 'ईमेल आयडी' },
    { field: 'age', headerName: 'वय' },
    { field: 'birthDate', headerName: 'जन्मतारीख' },
    { field: 'gender', headerName: 'लिंग' },
    { field: 'aadhar', headerName: 'आधार क्रमांक' },
    { field: 'pan', headerName: 'पॅन क्रमांक' },
    { field: 'userBaithakNo', headerName: 'बैठक क्रमांक' },
    { field: 'userBaithakName', headerName: 'बैठक नाव' },
    { field: 'userBaithakDay', headerName: 'बैठक दिवस' },
    {
      headerName: 'Action',
      filter: false,
      floatingFilter: false,
      sortable: false,
      cellRenderer: (params: any) => {
        const eDiv = document.createElement('div');
        eDiv.classList.add('action-cell');

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn-edit');
        editBtn.addEventListener('click', () => this.onEdit(params.data));
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('btn-delete');
        deleteBtn.addEventListener('click', () => this.onDelete(params.data));

        eDiv.appendChild(editBtn);
        eDiv.appendChild(deleteBtn);

        return eDiv;
      },
      width: 150
    },
  ];

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };

  // rowSelection: RowSelectionOptions = {
  //   mode: "multiRow" // ✅ allow multiple row selection with checkboxes
  // };

  paginationPageSize = 5;

  constructor(private router: Router) { }

  onSelectionChanged(event: any) {
    const selected = event.api.getSelectedRows();
    this.selectedRow = selected.length ? selected[0] : null;
    console.log('Selected rows:', selected);
  }

  editRow() {
    if (!this.selectedRow) return;
    this.addEditUserEvent.emit(this.selectedRow.userId);
  }

  addNewUser() {
    if (this.selectedRow) this.selectedRow = null;
    this.addEditUserEvent.emit('newuser');
  }

  onEdit(rowData: IUserDetails) {
    console.log('Editing row:', rowData);
    this.addEditUserEvent.emit(rowData.userId);
  }

  // onDelete(data: any): any {
  //   throw new Error("Method not implemented.");
  // }

  // confirmDelete() {
  //   console.log('Deleting row:');
  // }

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

