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

    const expectedRole = route.data['role'];

    if (expectedRole) {
      const userRole = this.authService.getUserRole();

      if (userRole === expectedRole) {
        return true;
      } else {
        alert(`प्रवेश नाकारला: तुम्हाला ${expectedRole} परवानग्यांची आवश्यकता आहे.`);
        return false;
      }
    }

    return true;
  }
}


