import { Component } from '@angular/core';
import { LogoutComponent } from '../../core/auth/logout/logout';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {

  userMarster() {
        alert("userMarster was clicked!");
    }
    businessMaster() {
        alert("businessMaster was clicked!");
    }
    sadasyaMahiti() {
        alert("sadasyaMahiti was clicked!");
    }
    logout() {
        alert("logout was clicked!");
    }
}
