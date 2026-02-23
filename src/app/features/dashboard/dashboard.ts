import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridComponent } from '../../shared/ag-grid/ag-grid';
import { ColDef } from 'ag-grid-community';
import { DashboardService } from '../../core/services/dashboard';
import { TotalStats } from '../../models/dashboard.model';
import { AgeGroupMap } from '../../models/dashboard-type.enum';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AgGridComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {

  public totalFemaleCount = 0;
  public totalMaleCount = 0;
  public ownershipData: any[] = [];
  public businessTypeData: any[] = [];
  public ageData: any[] = [];
  public ageTotalCountData: any[] = [];
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
  totalStats: TotalStats = { totalFemale: 0, totalMale: 0 };
  @ViewChild('agGridDifficulty') agGridDifficulty!: AgGridComponent;
  @ViewChild('agGridBusinessType') agGridBusinessType!: AgGridComponent;
  @ViewChild('agGridOwnership') agGridOwnership!: AgGridComponent;
  @ViewChild('agGridAge') agGridAge!: AgGridComponent;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loadGridData();
  }

  loadGridData(): void {
    this.getAge();
    this.getDifficulty();
    this.getBusinessType();
    this.getOwnership();
    this.calculateTotals();
  }

  getDifficulty() {
    this.dashboardService.getDifficulty().subscribe({
      next: (res) => {
        this.difficultyData = res;
        this.agGridDifficulty.refreshGrid(res);
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }

  getBusinessType() {
    this.dashboardService.getBusinessType().subscribe({
      next: (res) => {
        this.businessTypeData = res;
        this.agGridBusinessType.refreshGrid(res);
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }

  getOwnership() {
    this.dashboardService.getOwnership().subscribe({
      next: (res) => {
        this.ownershipData = res;
        this.agGridOwnership.refreshGrid(res);
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }

  getAge() {
    this.dashboardService.getAge().subscribe({
      next: (res) => {
        this.ageTotalCountData = res;
        this.calculateTotals();
        this.ageData = res;
        this.agGridAge.refreshGrid(res);
      },
      error: (err) => console.error('Refresh failed', err)
    });
  }


  calculateTotals() {

    if(this.ageTotalCountData)
    {
    this.totalStats.totalFemale = this.ageTotalCountData.reduce((acc, curr) => acc + curr.female, 0);
    this.totalStats.totalMale = this.ageTotalCountData.reduce((acc, curr) => acc + curr.male, 0);
    }

    this.cd.detectChanges();
  }

  onCellClicked(params: any) {
    const data = params.data;
    const colField = params.colDef.field;
    let categoryId = data.id;

    if (data.ageRange) {
      categoryId = AgeGroupMap[data.ageRange]; // 👈 Convert string to enum ID
    }

    const filterParams = {
      categoryId: categoryId,
      // categoryValue: data.ownershipName || data.businessType || data.ageRange || data.difficulty,
      categoryType: data.ownershipName ? 'OWNERSHIP' :
        data.businessType ? 'BUSINESS TYPE' :
          data.ageRange ? 'AGE RANGE' :
            data.difficulty ? 'BUSINESS PROBLEM' : 'unknown',
      gender: colField == 'male' ? 'G' : 'L',
      // countValue: params.value
    };

    console.log('Filtering for:', filterParams);
    this.dashboardService.setFilter(filterParams);
    this.router.navigate(['/UserdetailsList']);
  }

}
