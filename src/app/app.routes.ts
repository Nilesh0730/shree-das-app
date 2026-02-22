import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login';
import { UserResolver } from './core/resolvers/user.resolver/user.resolver';
import { AuthGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'personal',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] },
    loadComponent: () => import('./features/personal-info/personal-info')
      .then(m => m.PersonalInfoComponent)
  },
  {
    path: 'business',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] },
    loadComponent: () => import('./features/business-info/business-info')
      .then(m => m.BusinessInfoComponent)
  },
  {
    path: 'problems',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] },
    loadComponent: () => import('./features/business-problems/business-problems')
      .then(m => m.BusinessProblemsComponent)
  },
  {
    path: 'UserdetailsList',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] },
    loadComponent: () => import('./features/user-grid/user-grid')
      .then(m => m.UserGridComponent),
    resolve: { users: UserResolver }
  },
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    loadComponent: () => import('./features/dashboard/dashboard')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-user',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    loadComponent: () => import('./features/admin/user-registration/user-registration')
      .then(m => m.UserRegistrationComponent)
  },
  {
    path: 'tab',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] },
    loadComponent: () => import('./features/user-tabs/user-tabs')
      .then(m => m.UserTabsComponent)
  },
  {
    path: 'tab/:userId',
    // canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] },
    loadComponent: () => import('./features/user-tabs/user-tabs')
      .then(m => m.UserTabsComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
