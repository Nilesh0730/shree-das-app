import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logout.html',
  styleUrls: ['./logout.scss']
})
export class LogoutComponent {
  logoutForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.logoutForm = this.fb.group({});
  }

  onLogout(): void {
    // Clear tokens / session
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
