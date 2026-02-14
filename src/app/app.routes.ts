// import { DashboardComponent } from './features/dashboard/dashboard';
// import { Routes } from '@angular/router';
// import { PersonalInfoComponent } from './features/personal-info/personal-info';
// import { BusinessInfoComponent } from './features/business-info/business-info';
// import { BusinessProblemsComponent } from './features/business-problems/business-problems';
// import { LoginComponent } from './features/login/login';
// import { UserGridComponent } from './features/user-grid/user-grid';
// import { UserTabsComponent } from './features/user-tabs/user-tabs';
// import { UserResolver } from './core/resolvers/user.resolver/user.resolver';

// export const routes: Routes = [
//   { path: 'personal', component: PersonalInfoComponent },
//   { path: 'business', component: BusinessInfoComponent },
//   { path: 'problems', component: BusinessProblemsComponent },
//   { path: 'UserdetailsList', component: UserGridComponent, resolve: { users: UserResolver } },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'tab', component: UserTabsComponent },
//   { path: 'tab/:userId', component: UserTabsComponent },
//   { path: '', redirectTo: 'login', pathMatch: 'full' }
// ];

import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { PersonalInfoComponent } from './features/personal-info/personal-info';
import { BusinessInfoComponent } from './features/business-info/business-info';
import { BusinessProblemsComponent } from './features/business-problems/business-problems';
import { LoginComponent } from './core/auth/login/login';
import { UserGridComponent } from './features/user-grid/user-grid';
import { UserTabsComponent } from './features/user-tabs/user-tabs';
import { UserResolver } from './core/resolvers/user.resolver/user.resolver';
import { AuthGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  { path: 'personal', component: PersonalInfoComponent, canActivate: [AuthGuard] },
  { path: 'business', component: BusinessInfoComponent, canActivate: [AuthGuard] },
  { path: 'problems', component: BusinessProblemsComponent, canActivate: [AuthGuard] },
  { path: 'UserdetailsList', component: UserGridComponent, resolve: { users: UserResolver }, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'tab', component: UserTabsComponent, canActivate: [AuthGuard] },
  { path: 'tab/:userId', component: UserTabsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
