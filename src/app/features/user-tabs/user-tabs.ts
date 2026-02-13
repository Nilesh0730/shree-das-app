import { Component, Input } from '@angular/core';
import { PersonalInfoComponent } from '../personal-info/personal-info';
import { BusinessInfoComponent } from '../business-info/business-info';
import { BusinessProblemsComponent } from '../business-problems/business-problems';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.html',
  styleUrls: ['./user-tabs.scss'],
  standalone: true,
  imports: [PersonalInfoComponent,BusinessInfoComponent,BusinessProblemsComponent,CommonModule],
})
export class UserTabsComponent {
  @Input() userId: number | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  selectedTabIndex: number = 0;

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  handleUserCreated(newUserId: number) {
    this.userId = newUserId;
    this.mode = 'edit';
  }
}

