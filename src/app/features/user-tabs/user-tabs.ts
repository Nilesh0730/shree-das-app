import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PersonalInfoComponent } from '../personal-info/personal-info';
import { BusinessInfoComponent } from '../business-info/business-info';
import { BusinessProblemsComponent } from '../business-problems/business-problems';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.html',
  styleUrls: ['./user-tabs.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    BusinessInfoComponent,
    BusinessProblemsComponent
  ],
})
export class UserTabsComponent {
  @Input() userId: number | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  selectedTabIndex: number = 0;

  // Define tab list so prev/next knows the length
  tabs = ['Personal Info', 'Business Info', 'Business Problems'];

  constructor(private router: Router) {}

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  handleUserCreated(newUserId: number) {
    this.userId = newUserId;
    this.mode = 'edit';
  }

  prevTab() {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  nextTab() {
    if (this.selectedTabIndex < this.tabs.length - 1) {
      this.selectedTabIndex++;
    }
  }

  goBack() {
    // Redirect to dashboard (or any route you want)
    this.router.navigate(['/UserdetailsList']);
  }
}
