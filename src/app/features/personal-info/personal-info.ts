import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../../core/services/user-details';
import { IUserDetails } from '../../models/user-details.model';
import { IBaithakDay } from '../../models/baithak-day.model';
import { IBaithakLocation } from '../../models/baithak-location.model';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss'],
})
export class PersonalInfoComponent implements OnInit {

  @Input() userId: string | null = null;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() userCreated = new EventEmitter<string>();

  personalForm!: FormGroup;
  isEditMode = false;

  genders = [
    { value: 'g', label: 'पुरुष' },
    { value: 'l', label: 'महिला' }
  ];

  baithakList: IBaithakLocation[] = [];
  baithakDays: IBaithakDay[] = [];

  constructor(private fb: FormBuilder, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    this.isEditMode = this.mode === 'edit' && !!this.userId;

    this.initForm();

    this.handleGenderChange();
    this.handleBaithakChange();

    this.personalForm.get('birthDate')?.valueChanges.subscribe(() => {
      this.calculateAge();
    });

    if (this.isEditMode && this.userId) {
      this.loadData(this.userId);
    }
  }

  initForm() {

    this.personalForm = this.fb.group({
      userName: ['', Validators.required],
      gender: ['', Validators.required],
      userBaithakLocationId: ['', Validators.required], // use for baithak dropdown
      userBaithakDayId: ['', Validators.required],      // use for baithak day dropdown
      userBaithakNo: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userAddress: ['', Validators.required],
      pinCode: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(1)]],
      aadhaar: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      pan: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]]
    });

  }

  handleGenderChange() {
    this.personalForm.get('gender')?.valueChanges.subscribe(gender => {
      this.baithakList = [];
      this.baithakDays = [];
      this.personalForm.patchValue({
        userBaithakLocationId: '',
        userBaithakDayId: ''
      }, { emitEvent: false });

      if (gender) {
        this.userDetailsService.getBaithakByGender(gender).subscribe(data => {
          this.baithakList = data;
        });
      }
    });
  }

  handleBaithakChange() {
    this.personalForm.get('userBaithakLocationId')?.valueChanges.subscribe(locationId => {
      const gender = this.personalForm.get('gender')?.value;
      this.baithakDays = [];
      this.personalForm.patchValue({ userBaithakDayId: '' }, { emitEvent: false });

      if (locationId && gender) {
        this.userDetailsService.getBaithakDay(locationId, gender).subscribe(data => {
          this.baithakDays = data;
        });
      }
    });
  }

  calculateAge() {
    const birthDate = this.personalForm.get('birthDate')?.value;
    if (!birthDate) {
      this.personalForm.get('age')?.setValue(0);
      return;
    }
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    if (age < 0) age = 0;
    this.personalForm.get('age')?.setValue(age);
  }

  onSaveUser() {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }


    const selectedBaithak = this.baithakList.find(
      b => b.baithakLocationId === this.personalForm.get('userBaithakLocationId')?.value
    );

    const selectedBaithakDay = this.baithakDays.find(
      d => d.dayId === this.personalForm.get('userBaithakDayId')?.value
    );

    const payload: IUserDetails = {
      ...this.personalForm.value,
      userId: this.userId || undefined,
      userBaithakLocationId: selectedBaithak?.baithakLocationId || null,
      userBaithakName: selectedBaithak?.baithakName || '',
      userBaithakDayId: selectedBaithakDay?.dayId || null,
      userBaithakDay: selectedBaithakDay?.dayName || '',
      userBaithakTimeId: selectedBaithakDay?.timeSlotId || null,
      userBaithakTime: selectedBaithakDay?.timeSlotDescription || ''
    };

    this.userDetailsService.insertUpdateUser(payload).subscribe({
      next: res => {
        alert(`${this.mode === 'add' ? 'Created' : 'Updated'} successfully!`);
        this.userCreated.emit(payload.userId || '');
      },
      error: err => {
        console.error('Error saving user:', err);
        alert('Error saving user!');
      }
    });
  }


  loadData(userId: string) {
    this.userDetailsService.getUserDetails(userId).subscribe({
      next: (data: IUserDetails) => {
        const user = data;
        if (user) {
          // patch form values
          this.personalForm.patchValue({
            userName: user.userName,
            userBaithakName: user.userBaithakName,
            userBaithakLocationId: user.userBaithakLocationId,
            userBaithakNo: user.userBaithakNo,
            userBaithakDayId: user.userBaithakDayId,
            userBaithakDay: user.userBaithakDay,
            userAddress: user.userAddress,
            pinCode: user.pinCode,
            mobile: user.mobile,
            emailId: user.emailId,
            // education: user.education,
            birthDate: user.birthDate,
            age: user.age,
            gender: user.gender === "Ladies" ? "l" : "g",
            aadhaar: user.aadhaar,
            pan: user.pan,
          });

          if (user.gender) {
            const gender = user.gender === "Ladies" ? "l" : "g";

            this.userDetailsService.getBaithakByGender(gender).subscribe(blist => {
              this.baithakList = blist;

              // patch the user's baithak location after list is loaded
              this.personalForm.patchValue({
                userBaithakLocationId: user.userBaithakLocationId
              });

              // load baithak days
              this.userDetailsService.getBaithakDay(user.userBaithakLocationId, gender)
                .subscribe(dlist => {
                  this.baithakDays = dlist;

                  // patch the user's baithak day after day list is loaded
                  this.personalForm.patchValue({
                    userBaithakDayId: user.userBaithakDayId
                  });
                });
            });
          }

        } else {
          console.warn(`No user found with id ${this.userId}`);
        }
      },
      error: err => console.error('Error loading user details:', err)
    });
  }

}
