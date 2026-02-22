import { UserRegistration } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../../core/auth/logout/logout';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../../shared/ag-grid/ag-grid';
import { ColDef } from 'ag-grid-community';
import { DashboardService } from '../../core/services/dashboard';
import { forkJoin } from 'rxjs';
import { UserRegistrationComponent } from "../admin/user-registration/user-registration";
import { SidebarComponent } from "../../shared/sidebar/sidebar";

@Component({
  selector: 'app-dashboard',
  imports: [LogoutComponent, CommonModule, AgGridComponent, UserRegistrationComponent, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {

  public totalFemaleCount = 0;
  public totalMaleCount = 0;
  public ownershipData: any[] = [];
  public businessTypeData: any[] = [];
  public ageData: any[] = [];
  public difficultyData: any[] = [];
  activeTab: string = 'userMaster';
  isUserRegistration: boolean = false;

  public ownershipCols: ColDef[] = [
    { field: 'ownershipName', headerName: 'वय', flex: 1, minWidth: 200 },
    {
      field: 'female',
      headerName: 'महिला',
      flex: 1,
      cellClass: 'val-female',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link female-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    },
    {
      field: 'male',
      headerName: 'पुरुष',
      flex: 1,
      cellClass: 'val-male',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link male-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    }
  ];

  // 1. Column Definitions (Configuration)
  public businessTypeCols: ColDef[] = [
    { field: 'businessType', headerName: 'वर्गीकरण', flex: 1 },
    {
      field: 'female',
      headerName: 'महिला',
      flex: 1,
      cellClass: 'val-female',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link female-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    },
    {
      field: 'male',
      headerName: 'पुरुष',
      flex: 1,
      cellClass: 'val-male',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link male-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    }
  ];

  // Column Definitions for Age Wise
  public ageCols: ColDef[] = [
    { field: 'ageRange', headerName: 'वय', flex: 1, minWidth: 200 },
    {
      field: 'female',
      headerName: 'महिला',
      flex: 1,
      cellClass: 'val-female',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link female-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    },
    {
      field: 'male',
      headerName: 'पुरुष',
      flex: 1,
      cellClass: 'val-male',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link male-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    }
  ];

  // Column Definitions for Difficulties
  public difficultyCols: ColDef[] = [
    { field: 'difficulty', headerName: 'अडचणी', flex: 1, minWidth: 200 },
    {
      field: 'female',
      headerName: 'महिला',
      flex: 1,
      cellClass: 'val-female',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link female-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    },
    {
      field: 'male',
      headerName: 'पुरुष',
      flex: 1,
      cellClass: 'val-male',
      cellRenderer: (params: any) => {
        const val = Number(params.value) || 0;
        if (val === 0) {
          return params.value;
        }

        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link male-link';
        eSpan.style.cursor = 'pointer';
        eSpan.style.textDecoration = 'underline';
        eSpan.style.fontWeight = '700';
        eSpan.onclick = () => this.onCellClicked(params);
        return eSpan;
      }
    }
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit() {
    this.loadGridData();
  }

  loadGridData(): void {
    this.getOwnership();
    this.getBusinessType();
    this.getAge();
    this.getDifficulty();
  }

  getOwnership() {
    this.dashboardService.getOwnership().subscribe({
      next: (res) => {
        this.ownershipData = res;
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }

  getBusinessType() {
    this.dashboardService.getBusinessType().subscribe({
      next: (res) => {
        this.businessTypeData = res;
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }


  getAge() {
    this.dashboardService.getAge().subscribe({
      next: (res) => {
        this.ageData = res;
        this.calculateTotals();
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }

  getDifficulty() {
    this.dashboardService.getDifficulty().subscribe({
      next: (res) => {
        this.difficultyData = res;
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }

  calculateTotals() {
    this.totalFemaleCount = this.ageData.reduce((acc, curr) => acc + curr.female, 0);
    this.totalMaleCount = this.ageData.reduce((acc, curr) => acc + curr.male, 0);
  }

  onCellClicked(params: any) {
    const data = params.data;
    const colField = params.colDef.field;

    const filterParams = {
      id: data.id,
      categoryValue: data.ownershipName || data.businessType || data.ageRange || data.difficulty,
      categoryName: data.ownershipName ? 'ownership' :
        data.businessType ? 'businessType' :
          data.ageRange ? 'ageRange' :
            data.difficulty ? 'difficulty' : 'unknown',
      gender: colField,
      countValue: params.value
    };

    console.log('Filtering for:', filterParams);
    this.dashboardService.setFilter(filterParams);
    this.router.navigate(['/UserdetailsList']);
  }

  userMarster() {
    this.isUserRegistration = false;
    this.activeTab = 'userMaster';
  }

  businessMaster() {
    this.isUserRegistration = false;
    this.activeTab = 'businessMaster';
  }

  sadasyaMahiti() {
    this.isUserRegistration = false;
    this.activeTab = 'sadasya';
    this.router.navigate(['/UserdetailsList']);
  }

  userRegristration() {
    this.isUserRegistration = true;
    this.activeTab = 'registration';
   // this.router.navigate(['/register-user']);
  }
}
