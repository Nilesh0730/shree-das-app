import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../../core/auth/logout/logout';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../../shared/ag-grid/ag-grid';
import { ColDef } from 'ag-grid-community';
import { DashboardService } from '../../core/services/dashboard';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutComponent, CommonModule, AgGridComponent],
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

  public ownershipCols: ColDef[] = [
    { field: 'ownershipName', headerName: 'वय', flex: 1, minWidth: 200 },
    {
      field: 'female',
      headerName: 'महिला',
      flex: 1,
      cellClass: 'val-female',
      cellRenderer: (params: any) => {
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
        const eSpan = document.createElement('span');
        eSpan.innerText = params.value;
        eSpan.className = 'grid-custom-link';
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
    this.fetchAllData();
  }

  private fetchAllData(): void {
    // Calling all individual APIs in parallel
    forkJoin({
      // totals: this.apiService.getTotalCounts(),
      ownership: this.dashboardService.getOwnershipStats(),
      business: this.dashboardService.getBusinessTypeStats(),
      age: this.dashboardService.getAgeStats(),
      difficulty: this.dashboardService.getDifficultyStats()
    }).subscribe({
      next: (res) => {
        // this.totalFemaleCount = this.businessTypeData.reduce((acc, curr) => acc + curr.female, 0);;
        // this.totalMaleCount = this.businessTypeData.reduce((acc, curr) => acc + curr.male, 0);;
        this.ownershipData = res.ownership;
        this.businessTypeData = res.business;
        this.ageData = res.age;
        this.difficultyData = res.difficulty;
        this.calculateTotals();
      },
      error: (err) => console.error('Dashboard Load Error:', err)
    });
  }

  calculateTotals() {
    // Example: summing classification data
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

  userRegristration() {
    this.router.navigate(['/register-user']);
  }


  userMarster() {
    alert("userMarster was clicked!");
  }
  businessMaster() {
    alert("businessMaster was clicked!");
  }
  sadasyaMahiti() {
    this.router.navigate(['/UserdetailsList']);
  }
  logout() {
    alert("logout was clicked!");
  }
}
