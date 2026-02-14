
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserDetailsService } from '../../core/services/user-details';
import { CommonModule } from '@angular/common';
import { IBusinessDetails } from '../../models/business-details.model';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './business-info.html',
  styleUrl: './business-info.scss',
})
export class BusinessInfoComponent implements OnInit {
  @Input() userId: any | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  // Example fields
  InformationTitle = '';
  InformationDescription = '';

  businessForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService) { }

  ngOnInit(): void {

    this.isEditMode = !!this.userId;

    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      currentBusiness: ['', Validators.required],
      address: ['', Validators.required],
      gst: ['', [
        Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
      ]],
      businessDuration: ['', Validators.min(0)],
      years: ['', Validators.min(0)],
      half_time: [false],
      full_time: [false],
      sub_business: [''],
      ownership: this.fb.group({
        proprietorship: [false],
        pvt_ltd: [false],
        llp: [false],
        partnership: [false]
      }),

      category: this.fb.group({
        service: [false],
        trading: [false],
        manufacture: [false],
        wholesale: [false],
        retail: [false],
        ghar: [false],
        shop: [false]
      }),

      location: this.fb.group({
        gaon: [false],
        shahar: [false],
        bazaar: [false],
        ghar: [false],
        phirta: [false],
        itar: [false]
      }),

      capitalInvestment: [Validators.required, Validators.min(0)],
      workingCapital: [Validators.required, Validators.min(0)],
      monthlyExpenses: [Validators.required, Validators.min(0)],
      rollingInvestment: [Validators.required, Validators.min(0)],
      averageProfit: [Validators.required, Validators.max(100)]
    }, { validators: this.atLeastOneCheckboxSelected(['half_time', 'full_time']) });

    if (this.mode === 'edit' && this.userId) {
      this.loadData(this.userId);
    }

  }

  loadData(userId: any) {
    this.userDetailsService.getBusinessDetails().subscribe({
      next: (data: IBusinessDetails[]) => {
        console.log('Fetched business data:', data);

        const business = data.find(x => x.id === userId);
        if (business) {
          this.businessForm.patchValue({
            businessName: business.businessName,
            currentBusiness: business.currentBusiness,
            address: business.address,
            gst: business.gst,
            businessDuration: business.businessDuration,
            years: business.years,
            half_time: business.half_time,
            full_time: business.full_time,
            sub_business: business.sub_business,
            ownership: business.ownership,
            category: business.category,
            location: business.location,
            capitalInvestment: business.capitalInvestment,
            workingCapital:  business.workingCapital,
            monthlyExpenses:  business.monthlyExpenses,
            rollingInvestment:  business.rollingInvestment,
            averageProfit:  business.averageProfit,
          });
        } else {
          console.warn(`No business found with id ${userId}`);
        }
      },
      error: (err: any) => console.error('Error loading businesses.json:', err)
    });

    console.log('Loading data for id:', userId);
  }


  atLeastOneCheckboxSelected(fields: string[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const hasOneSelected = fields.some(field => group.get(field)?.value === true);
      return hasOneSelected ? null : { timeRequired: true };
    };
  }

  onSaveBusinessInformation() {
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }

    if (this.mode === 'add') {
      console.log('Adding new business Information for user', this.userId, this.InformationTitle, this.InformationDescription);
    } else {
      console.log('Updating business Information for user', this.userId, this.InformationTitle, this.InformationDescription);
    }

    alert('Business Information saved!');
  }
}
