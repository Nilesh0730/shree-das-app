import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 1. First, check if the user is even logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Check if the route requires a specific role (Admin)
    // We get this from the data property in the routing file
    const expectedRole = route.data['role'];

    if (expectedRole === 'Admin') {
      if (this.authService.getUserRole() === 'Admin') {
        return true;
      } else {
        alert('Access Denied: Admin privileges required.');
        // If not admin, stay on current page or go to dashboard
        return false;
      }
    }

    // 3. If no specific role is required, just being logged in is enough
    return true;
  }
}
