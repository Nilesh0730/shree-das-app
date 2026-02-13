import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../../shared/ag-grid/ag-grid';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserDetails } from '../../models/user-details.model';
import { UserDetailsService } from '../../core/services/user-details';
//import { Grid } from '../../shared/grid/grid';

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [CommonModule, AgGridComponent],
  templateUrl: './user-grid.html',
  styleUrl: './user-grid.scss',
})
export class UserGridComponent {

  rowData: IUserDetails[] = [];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private userService: UserDetailsService) { }

  columnDefs: ColDef[] = [
    { field: 'userName', headerName: 'श्री सदस्याचे नाव' },
    { field: 'mobile', headerName: 'मोबाईल नंबर' },
    { field: 'userAddress', headerName: 'पत्ता', hide: true },
    { field: 'pinCode', headerName: 'पिनकोड', hide: true },
    { field: 'emailId', headerName: 'ईमेल आयडी', hide: true },
    { field: 'age', headerName: 'वय', hide: true },
    { field: 'birthDate', headerName: 'जन्मतारीख', hide: true },
    { field: 'gender', headerName: 'लिंग', hide: true },
    { field: 'aadhar', headerName: 'आधार क्रमांक', hide: true },
    { field: 'pan', headerName: 'पॅन क्रमांक', hide: true },
    { field: 'userBaithakNo', headerName: 'बैठक क्रमांक', hide: true },
    { field: 'userBaithakName', headerName: 'बैठक नाव', hide: true },
    { field: 'userBaithakDay', headerName: 'बैठक दिवस', hide: true },
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

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data: IUserDetails[]) => {
        console.log(data);
        this.rowData = data;
      },
      error: (err: any) => console.error('Error loading users.json:', err)
    });
  }

  addEditUser(event: any) {
    if (event == 'newuser') {
      this.router.navigate(['/tab']);
    }
    else {
      var userId = event;
      this.router.navigate(['/tab', userId]);
    }
  }

  addNewUser() {
    this.router.navigate(['/tab']);
  }

  onEdit(data: IUserDetails): any {
    console.log("onEdit", data);
    if (!data.userId) {
      this.router.navigate(['/tab', data.userId]);
    }
    else {
      this.router.navigate(['/tab']);
    }
  }

  onDelete(data: IUserDetails): any {
    console.log("onDelete", data);
  }
}
