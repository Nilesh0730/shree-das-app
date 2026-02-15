
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDetails } from '../../models/user-details.model';
import { UserDetailsService } from '../../core/services/user-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.scss',
})
export class PersonalInfoComponent implements OnInit {
  isEditMode = false;
  personalForm!: FormGroup;
  name = '';
  email = '';

  @Input() userId: any | null = null;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() userCreated = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userDetailsService: UserDetailsService
  ) {

  }

  ngOnInit() {
    this.isEditMode = !!this.userId;

    // Initialize form
    this.personalForm = this.fb.group({
      userName: ['', Validators.required],
      baithak: ['', Validators.required],
      baithakRollNo: ['', Validators.required],
      baithakDay: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', Validators.required],
      education: ['', Validators.required],
      birthDate: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(1)]], // must be positive
      gender: ['', Validators.required],
      aadhaar: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]], // 12 digits
      pan: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]], // ABCDE1234F format
    });

    if (this.mode === 'edit' && this.userId) {
      this.loadData(this.userId);
      console.log('Edit mode for userId:', this.userId);
    } else {
      console.log('New entry mode');
    }
  }

  // Load data for edit
  loadData(userId: string) {
    this.userDetailsService.getUserDetails(this.userId).subscribe({
      next: (data: IUserDetails[]) => {
        console.log(data);   // ✅ strongly typed

        // Find the user by userId
        const user = data[0];
        if (user) {
          // ✅ Patch values into the existing FormGroup
          this.personalForm.patchValue({
            userName: user.userName,
            baithak: user.baithak,
            baithakRollNo: user.baithakRollNo,
            baithakDay: user.baithakDay,
            address: user.userAddress,
            pincode: user.pincode,
            mobile: user.mobile,
            email: user.email,
            education: user.education,
            birthDate: user.birthDate,
            age: user.age,
            gender: user.gender,
            aadhaar: user.aadhaar,
            pan: user.pan,
          });
        } else {
          console.warn(`No user found with id ${userId}`);
        }
      },
      error: (err: any) => console.error('Error loading users.json:', err)
    });

    console.log('Loading data for userId:', userId);
  }

  onSaveUser() {

    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    if (this.mode === 'add') {

      console.log('Created new user');
    } else {
      console.log('Updated user');
    }
  }

}
