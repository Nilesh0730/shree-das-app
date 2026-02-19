import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login';
import { UserResolver } from './core/resolvers/user.resolver/user.resolver';
import { AuthGuard } from './core/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'personal',
    loadComponent: () => import('./features/personal-info/personal-info')
      .then(m => m.PersonalInfoComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'business',
    loadComponent: () => import('./features/business-info/business-info')
      .then(m => m.BusinessInfoComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'problems',
    loadComponent: () => import('./features/business-problems/business-problems')
      .then(m => m.BusinessProblemsComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'UserdetailsList',
    loadComponent: () => import('./features/user-grid/user-grid')
      .then(m => m.UserGridComponent),
    resolve: { users: UserResolver },
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard')
      .then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-user',
    loadComponent: () => import('./features/admin/user-registration/user-registration')
      .then(m => m.UserRegistrationComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'tab',
    loadComponent: () => import('./features/user-tabs/user-tabs')
      .then(m => m.UserTabsComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] }
  },
  {
    path: 'tab/:userId',
    loadComponent: () => import('./features/user-tabs/user-tabs')
      .then(m => m.UserTabsComponent),
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'DataEntry'] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
