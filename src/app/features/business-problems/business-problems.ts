import { Component, OnInit, Input } from '@angular/core';
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
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
     this.isEditMode = this.mode === 'edit' && !!this.userId;
    this.buildForm();

    if (this.mode === 'edit' && this.userId) {
      this.userDetailsService.getBusinessProblems(this.userId).subscribe(data => {
        const userProblem = data;

        if (userProblem) {
          this.rowData = userProblem;
          this.buildForm();   // 👈 rebuild with rowData
        }
      });
    }
  }

  private buildForm(): void {
    const group: { [key: string]: any } = {};

    this.problemFields.forEach(f => {
      const value = this.rowData?.[f.id as keyof IBusinessProblems] ?? null;
      const hasExplanation = !!value && value.trim() !== '';

      group[f.id + 'YesNo'] = [hasExplanation, Validators.required];
      group[f.id] = [value ?? ''];
    });

    this.businessForm = this.fb.group(group);
    this.setupConditionalValidation();
  }

  private setupConditionalValidation(): void {
    this.problemFields.forEach(f => {
      const yesNoControl = this.businessForm.get(f.id + 'YesNo');
      const textControl = this.businessForm.get(f.id);

      yesNoControl?.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((value: boolean) => {
          if (value === true) {
            textControl?.setValidators([Validators.required]);
          } else {
            textControl?.clearValidators();
            textControl?.setValue('', { emitEvent: false });
          }
          textControl?.updateValueAndValidity({ emitEvent: false });
        });
    });
  }

  onSubmit(): void {
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }

    // Transform back into clean JSON
    const formData: IBusinessProblems = {} as IBusinessProblems;

    this.problemFields.forEach(f => {
      const yesNo = this.businessForm.get(f.id + 'YesNo')?.value;
      const explanation = this.businessForm.get(f.id)?.value;

      (formData as any)[f.id] = yesNo ? explanation : null;
    });

    if (this.isEditMode) {
      console.log('Update API Call:', formData);
    } else {
      console.log('Create API Call:', formData);
    }
  }
}
