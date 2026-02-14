import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from '../../core/auth/logout/logout';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router
  ) {
  }
  userMarster() {
    alert("userMarster was clicked!");
  }
  businessMaster() {
    alert("businessMaster was clicked!");
  }
  sadasyaMahiti() {
    this.router.navigate(['/UserdetailsList']);
  }
  logout() {
    alert("logout was clicked!");
  }
}
