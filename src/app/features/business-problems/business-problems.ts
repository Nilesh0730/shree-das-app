// import { Component, OnInit, Input } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { distinctUntilChanged } from 'rxjs/operators';
// import { UserDetailsService } from '../../core/services/user-details';
// import { IBusinessProblems } from '../../models/business-problems.model';

// @Component({
//   selector: 'app-business-problems',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './business-problems.html',
//   styleUrls: ['./business-problems.scss'],
// })
// export class BusinessProblemsComponent implements OnInit {

//   @Input() userId: any | null = null;
//   @Input() mode: 'add' | 'edit' = 'add';
//   rowData?: IBusinessProblems;

//   businessForm!: FormGroup;
//   isEditMode = false;

//   problemFields = [
//     { id: 'loanFinancial', label: '१. आर्थिक नियोजन / बँक कर्ज' },
//     { id: 'marketing', label: '२. जाहिरात बाबत नियोजन' },
//     { id: 'taxLicence', label: '३. शासकीय व कायदेशीर नियोजन' },
//     { id: 'skill', label: '४. कौशल्य नियोजन' },
//     { id: 'land', label: '५. जमीन व्यवस्थापन' },
//     { id: 'businessDev', label: '६. व्यवसाय विकास' },
//     { id: 'employment', label: '७. रोजगार नियोजन' },
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private userDetailsService: UserDetailsService
//   ) { }

//   ngOnInit(): void {
//     this.isEditMode = this.mode === 'edit' && !!this.userId;
//     this.buildEmptyForm();

//     if (this.isEditMode && this.userId) {
//       this.userDetailsService.getBusinessProblems(this.userId).subscribe(userData => {
//         if (userData) {
//           this.rowData = userData;
//           this.patchFormWithData();
//         }
//       });
//     }
//   }


//   // Build empty form initially
//   private buildEmptyForm(): void {
//     const group: { [key: string]: any } = {};
//     this.problemFields.forEach(f => {
//       group[f.id + 'YesNo'] = [false, Validators.required]; // default No
//       group[f.id] = [''];
//     });
//     this.businessForm = this.fb.group(group);
//     this.setupConditionalValidation();
//   }

//   // Patch form with existing rowData
//   private patchFormWithData(): void {
//     const patch: any = {};
//     this.problemFields.forEach(f => {
//       const value = this.rowData?.[f.id as keyof IBusinessProblems];

//       if (value) {
//         // If value is a string explanation
//         patch[f.id + 'YesNo'] = true;
//         patch[f.id] = value;
//       } else {
//         // If no explanation, default to No
//         patch[f.id + 'YesNo'] = false;
//         patch[f.id] = '';
//       }
//     });

//     this.businessForm.patchValue(patch);
//   }

//   // Conditional validation for textareas
//   private setupConditionalValidation(): void {
//     this.problemFields.forEach(f => {
//       const yesNoControl = this.businessForm.get(f.id + 'YesNo');
//       const textControl = this.businessForm.get(f.id);

//       yesNoControl?.valueChanges
//         .pipe(distinctUntilChanged())
//         .subscribe((value: boolean) => {
//           if (value) {
//             textControl?.setValidators([Validators.required]);
//           } else {
//             textControl?.clearValidators();
//             textControl?.setValue('', { emitEvent: false });
//           }
//           textControl?.updateValueAndValidity({ emitEvent: false });
//         });
//     });
//   }

//   onSubmit(): void {
//     if (this.businessForm.invalid) {
//       this.businessForm.markAllAsTouched();
//       return;
//     }

//     const formData: IBusinessProblems = {} as IBusinessProblems;
//     this.problemFields.forEach(f => {
//       const yesNo = this.businessForm.get(f.id + 'YesNo')?.value;
//       const explanation = this.businessForm.get(f.id)?.value;
//       (formData as any)[f.id] = yesNo ? explanation : null;
//     });

//     if (this.isEditMode) {
//       console.log('Update API Call:', formData);
//     } else {
//       console.log('Create API Call:', formData);
//     }
//   }
// }


import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserDetailsService } from '../../core/services/user-details';
import { IBusinessProblems } from '../../models/business-problems.model';

@Component({
  selector: 'app-business-problems',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './business-problems.html',
  styleUrls: ['./business-problems.scss'],
})
export class BusinessProblemsComponent implements OnInit {
  @Input() userId: any | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  rowData?: IBusinessProblems;
  businessForm!: FormGroup;
  isEditMode = false;

  problemFields = [
    { id: 'loanFinancial', label: '१. आर्थिक नियोजन / बँक कर्ज' },
    { id: 'marketing', label: '२. जाहिरात बाबत नियोजन' },
    { id: 'taxLicence', label: '३. शासकीय व कायदेशीर नियोजन' },
    { id: 'skill', label: '४. कौशल्य नियोजन' },
    { id: 'land', label: '५. जमीन व्यवस्थापन' },
    { id: 'businessDev', label: '६. व्यवसाय विकास' },
    { id: 'employment', label: '७. रोजगार नियोजन' },
  ];

  constructor(
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService,
    private cdr: ChangeDetectorRef // 1. Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.mode === 'edit' && !!this.userId;
    this.buildEmptyForm();

    if (this.isEditMode && this.userId) {
      this.userDetailsService.getBusinessProblems(this.userId).subscribe(userData => {
        if (userData) {
          this.rowData = userData;
          this.patchFormWithData();

          // 2. Explicitly tell Angular to check for changes after the async patch
          this.cdr.detectChanges();
        }
      });
    }
  }

  private buildEmptyForm(): void {
    const group: { [key: string]: any } = {};
    this.problemFields.forEach(f => {
      // Initialize with explicit values
      group[f.id + 'YesNo'] = [false, Validators.required];
      group[f.id] = [''];
    });
    this.businessForm = this.fb.group(group);
    this.setupConditionalValidation();
  }

  private patchFormWithData(): void {
    const patch: any = {};
    this.problemFields.forEach(f => {
      // Use type safety for accessing rowData keys
      const value = this.rowData ? (this.rowData as any)[f.id] : null;

      if (value) {
        patch[f.id + 'YesNo'] = true;
        patch[f.id] = value;
      } else {
        patch[f.id + 'YesNo'] = false;
        patch[f.id] = '';
      }
    });

    // Use emitEvent: false to prevent triggering valueChanges during the initial patch
    this.businessForm.patchValue(patch, { emitEvent: false });

    // Manually trigger one update for validation logic after patching
    this.problemFields.forEach(f => this.updateValidators(f.id));
  }

  private setupConditionalValidation(): void {
    this.problemFields.forEach(f => {
      this.businessForm.get(f.id + 'YesNo')?.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.updateValidators(f.id);
        });
    });
  }

  // 3. Helper method to keep logic DRY and cleaner
  private updateValidators(fieldId: string): void {
    const yesNoControl = this.businessForm.get(fieldId + 'YesNo');
    const textControl = this.businessForm.get(fieldId);

    if (yesNoControl?.value === true) {
      textControl?.setValidators([Validators.required]);
    } else {
      textControl?.clearValidators();
    }
    textControl?.updateValueAndValidity({ emitEvent: false });
  }

  // onSubmit(): void {
  //   if (this.businessForm.invalid) {
  //     this.businessForm.markAllAsTouched();
  //     return;
  //   }

  //   const formData: any = {};
  //   this.problemFields.forEach(f => {
  //     const yesNo = this.businessForm.get(f.id + 'YesNo')?.value;
  //     const explanation = this.businessForm.get(f.id)?.value;
  //     formData[f.id] = yesNo ? explanation : null;
  //   });



  //   console.log(this.isEditMode ? 'Update:' : 'Create:', formData);
  // }

  onSubmit(): void {
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }

    //this.isSubmitting = true;

    // Prepare payload by mapping form values back to model keys
    const payload: any = {};
    this.problemFields.forEach(f => {
      const isYes = this.businessForm.get(f.id + 'YesNo')?.value;
      const explanation = this.businessForm.get(f.id)?.value;
      // If 'No' is selected, send null as per your model requirements
      payload[f.id] = isYes ? explanation : null;
    });

    // Call the service method
    this.userDetailsService.updateBusinessProblems(this.userId, payload).subscribe({
      next: (response) => {
        console.log('Success:', response);
        alert(this.isEditMode ? 'Details Updated Successfully!' : 'Details Added Successfully!');
        //this.isSubmitting = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Something went wrong. Please try again.');
        //this.isSubmitting = false;
      }
    });
  }
}
