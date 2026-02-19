import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    const success = this.authService.login(username, password);

    if (success) {
      // Redirect based on role
      const role = this.authService.getUserRole();
      if (role === 'Admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/UserdetailsList']);
      }
    } else {
      this.errorMessage = 'अवैध वापरकर्तानाव किंवा पासवर्ड (Invalid Credentials)';
    }
  }
}
