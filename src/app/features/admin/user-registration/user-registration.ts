import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistration } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../../../core/services/user-details';

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss',
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  roles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'DataEntry', label: 'Data Entry User' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private userDetailsService :UserDetailsService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['DataEntry', Validators.required], // Default role
      isActive: [true]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData: UserRegistration = this.registrationForm.value;
      console.log('Registering User:', userData);

      // Here you would call your AuthService/ApiService to save the user
      // this.apiService.register(userData).subscribe(...)

      alert('Registration Successful for ' + userData.role);
      this.router.navigate(['/login']);
    }
  }

  onSaveUser() {
    if (this.registrationForm.valid) {
      const userData: UserRegistration = this.registrationForm.value;

      this.userDetailsService.registerUser(userData).subscribe({
        next: (res) => {
         alert(res.message);
          this.registrationForm.reset();
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    }
  }
}
