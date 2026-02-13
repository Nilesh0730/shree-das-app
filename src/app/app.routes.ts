import { Routes } from '@angular/router';
import { PersonalInfoComponent } from './features/personal-info/personal-info';
import { BusinessInfoComponent } from './features/business-info/business-info';
import { BusinessProblemsComponent } from './features/business-problems/business-problems';
import { LoginComponent } from './features/login/login';
import { UserGridComponent } from './features/user-grid/user-grid';
import { UserTabsComponent } from './features/user-tabs/user-tabs';

export const routes: Routes = [
  { path: 'personal', component: PersonalInfoComponent },
  { path: 'business', component: BusinessInfoComponent },
  { path: 'problems', component: BusinessProblemsComponent },
  { path: 'UserdetailsList', component: UserGridComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tab', component: UserTabsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
