import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserDetailsService } from '../../core/services/user-details';
import { CommonModule } from '@angular/common';
import { IBusinessDetails, BusinessType, Ownership, BusinessCategory, BusinessPlace } from '../../models/business-details.model';


@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './business-info.html',
  styleUrls: ['./business-info.scss'],
})
export class BusinessInfoComponent implements OnInit {
  @Input() userId: any | null = null;
  @Input() mode: 'add' | 'edit' = 'add';

  InformationTitle = '';
  InformationDescription = '';

  businessForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.mode === 'edit' && !!this.userId;

    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      currentBusiness: ['', Validators.required],
      address: ['', Validators.required],
      gst: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
      ]],
      businessDuration: [0, Validators.min(0)],
      years: [0, Validators.min(0)],
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

      capitalInvestment: [0, [Validators.required, Validators.min(0)]],
      workingCapital: [0, [Validators.required, Validators.min(0)]],
      monthlyExpenses: [0, [Validators.required, Validators.min(0)]],
      rollingInvestment: [0, [Validators.required, Validators.min(0)]],
      averageProfit: [0, [Validators.required, Validators.max(100)]]
    }, { validators: this.atLeastOneCheckboxSelected(['half_time', 'full_time']) });

    if (this.isEditMode) {
      this.loadData(this.userId);
    }
  }

  private normalize(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '');
  }

  loadData(userId: any) {
    this.userDetailsService.getBusinessDetails().subscribe({
      next: (data: IBusinessDetails[]) => {
        const business = data[0];
        if (business) {
          // Map enums safely
          const ownership = Object.values(Ownership).find((e :any) => this.normalize(e) === this.normalize(business.ownership));
          const category = Object.values(BusinessCategory).find((e :any)=> this.normalize(e) === this.normalize(business.businessCategory));
          const place = Object.values(BusinessPlace).find((e :any)=> this.normalize(e) === this.normalize(business.businessPlace));
          const type = Object.values(BusinessType).find((e :any) => this.normalize(e) === this.normalize(business.businessTypeName));

          this.businessForm.patchValue({
            businessName: business.businessName,
            currentBusiness: business.currentBusiness,
            address: business.businessAddress,
            gst: business.businessGstNo,
            businessDuration: business.businessDuration,
            sub_business: business.subBusiness,
            capitalInvestment: business.businessCapital.capitalInvestment,
            workingCapital: business.businessCapital.rollingInvestment, // adjust if separate
            monthlyExpenses: business.businessCapital.monthlyExpenses,
            rollingInvestment: business.businessCapital.rollingInvestment,
            averageProfit: business.businessCapital.avgProfitPercentage,

            ownership: {
              proprietorship: ownership === Ownership.Proprietorship,
              pvt_ltd: ownership === Ownership.PvtLtd,
              llp: ownership === Ownership.LLP,
              partnership: ownership === Ownership.Partnership
            },
            category: {
              half_time: category === BusinessCategory.HalfTime,
              full_time: category === BusinessCategory.FullTime,
              service: type === BusinessType.Service,
              trading: type === BusinessType.Trading,
              manufacture: type === BusinessType.Manufacture,
              wholesale: type === BusinessType.Wholesale,
              retail: type === BusinessType.RetailGhar || type === BusinessType.RetailShop,
              ghar: type === BusinessType.RetailGhar,
              shop: type === BusinessType.RetailShop
            },
            location: {
              gaon: place === BusinessPlace.Gaon,
              shahar: place === BusinessPlace.Shahar,
              bazaar: place === BusinessPlace.Bazaar,
              ghar: place === BusinessPlace.Ghar,
              phirta: place === BusinessPlace.Phirta,
              itar: place === BusinessPlace.Itar
            }
          });
        } else {
          console.warn(`No business found with id ${userId}`);
        }
      },
      error: (err: any) => console.error('Error loading businesses.json:', err)
    });
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

    const formData = this.businessForm.value;
    if (this.isEditMode) {
      console.log('Updating business Information:', formData);
    } else {
      console.log('Adding new business Information:', formData);
    }
    alert('Business Information saved!');
  }
}
