import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../../shared/ag-grid/ag-grid';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserDetails } from '../../models/user-details.model';
import { UserDetailsService } from '../../core/services/user-details';
import { LogoutComponent } from '../../core/auth/logout/logout';

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [CommonModule, AgGridComponent, LogoutComponent],
  templateUrl: './user-grid.html',
  styleUrl: './user-grid.scss',
})
export class UserGridComponent implements OnInit {

  rowData: IUserDetails[] = [];
  columnDefs: ColDef[] = [
    { field: 'userId', headerName: 'यूआयडी', flex: 1, width: 200 },
    { field: 'userName', headerName: 'श्री सदस्याचे नाव', flex: 2, width: 250 },
    { field: 'mobile', headerName: 'मोबाईल नंबर', flex: 1, width: 250 },
    { field: 'userAddress', headerName: 'पत्ता', hide: true },
    { field: 'pinCode', headerName: 'पिनकोड', hide: true },
    { field: 'emailId', headerName: 'ईमेल आयडी', hide: true },
    { field: 'age', headerName: 'वय', hide: true },
    { field: 'birthDate', headerName: 'जन्मतारीख', hide: true },
    { field: 'gender', headerName: 'लिंग', hide: true },
    { field: 'aadhaar', headerName: 'आधार क्रमांक', hide: true },
    { field: 'pan', headerName: 'पॅन क्रमांक', hide: true },
    { field: 'userBaithakNo', headerName: 'बैठक क्रमांक', hide: true },
    { field: 'userBaithakName', headerName: 'बैठक नाव', hide: true },
    { field: 'userBaithakDay', headerName: 'बैठक दिवस', hide: true },
    {
      headerName: 'Action',
      filter: false,
      floatingFilter: false,
      sortable: false,
      pinned: 'right',
      cellRenderer: (params: any) => {
        const eDiv = document.createElement('div');
        eDiv.className = 'grid-action-container'; // Using a class for better control

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i> <span>Edit</span>';
        editBtn.className = 'grid-btn grid-btn-edit';
        editBtn.onclick = () => this.onEdit(params.data);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> <span>Delete</span>';
        deleteBtn.className = 'grid-btn grid-btn-delete';
        deleteBtn.onclick = () => this.onDelete(params.data);

        eDiv.appendChild(editBtn);
        eDiv.appendChild(deleteBtn);
        return eDiv;
      },
      width: 200
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userService: UserDetailsService) { }

  ngOnInit() {
    this.rowData = this.route.snapshot.data['users'] || [];
    console.log("resolved users", this.rowData);
  }

  userMarster() {
    //alert("userMarster was clicked!");
  }
  businessMaster() {
    //alert("businessMaster was clicked!");
  }

  addEditUser(event: any) {
    console.log("event", event);
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

  sadasyaMahiti() {
    //alert("sadasyaMahiti was clicked!");
  }
  onEdit(data: IUserDetails): any {
    console.log("onEdit", data);
    if (data.userId) {
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
