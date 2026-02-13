import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    // Hard-coded login check
    if (username === 'admin' && password === 'admin123') {
      console.log('Login successful');
     // this.router.navigate(['/dashboard']); // redirect after login
       this.router.navigate(['/UserdetailsList']); // redirect after login
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
