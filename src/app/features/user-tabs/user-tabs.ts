import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class UserTabsComponent implements OnInit {

  userId: any = null;
  @Input() mode: 'add' | 'edit' = 'add';
  selectedTabIndex: number = 0;

  // Define tab list so prev/next knows the length
  tabs = ['Personal Info', 'Business Info', 'Business Problems'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.userId) {
      this.mode = 'edit';
    }
    console.log('Fetched userId:', this.userId);
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }


  handleUserCreated(event: { userId: any, mode: string }) {
    console.log(`User was ${event.mode}ed with ID: ${event.userId}`);
    this.userId = event.userId;
    this.mode = this.mode == 'add' ? 'add' : 'edit';
    this.nextTab();
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

  handelNextWhensave($event: any) {
    this.nextTab();
  }
}
