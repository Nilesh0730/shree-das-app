import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserDetailsService } from '../../core/services/user-details';
import { CommonModule } from '@angular/common';
import { IBusinessDetails, BusinessType, Ownership, BusinessCategory, BusinessPlace } from '../../models/business-details.model';
import { BusinessCategoryNames, BusinessPlaceNames, BusinessTypeNames, OwnershipNames } from '../../models/business-type.enum';


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
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.mode === 'edit' && !!this.userId;

    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      currentBusiness: ['', Validators.required],
      address: ['', Validators.required],
      gst: ['', [
        Validators.required
        //Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
      ]],
      businessDuration: [0, Validators.min(0)],
      //years: [0, Validators.min(0)],
      partTime: [false],
      fullTime: [false],
      subBusiness: [''],

      ownership: this.fb.group({
        Proprietorship: [false],
        PvtLtd: [false],
        LLP: [false],
        Partnership: [false]
      }),

      bType: this.fb.group({
        Service: [false],
        Trading: [false],
        Manufacture: [false],
        Wholesale: [false],
        //retail: [false],
        RetailGhar: [false],
        RetailShop: [false]
      }),

      location: this.fb.group({
        Gaon: [false],
        City: [false],
        Bazaar: [false],
        Home: [false],
        Phirta: [false],
        Itar: [false]
      }),

      capitalInvestment: [0, [Validators.required, Validators.min(0)]],
      workingCapital: [0, [Validators.required, Validators.min(0)]],
      monthlyExpenses: [0, [Validators.required, Validators.min(0)]],
      rollingInvestment: [0, [Validators.required, Validators.min(0)]],
      averageProfit: [0, [Validators.required, Validators.max(100)]]
    }, { validators: this.atLeastOneCheckboxSelected(['partime', 'fullTime']) });

    if (this.isEditMode) {
      this.loadData(this.userId);
    }
  }

  private normalize(value: unknown): string {
    return (value ?? '').toString().toLowerCase().replace(/\s+/g, '');
  }


  loadData(userId: any) {
    this.userDetailsService.getBusinessDetails(this.userId).subscribe({
      next: (data: IBusinessDetails) => {
        const business = data;
        if (business) {
          // Map enums safely
          const ownership = Object.values(Ownership).find((e: any) => this.normalize(e) === this.normalize(business.ownership));
          const category = Object.values(BusinessCategory).find((e: any) => this.normalize(e) === this.normalize(business.businessCategory));
          const place = Object.values(BusinessPlace).find((e: any) => this.normalize(e) === this.normalize(business.businessPlace));
          const bType = Object.values(BusinessType).find((e: any) => this.normalize(e) === this.normalize(business.businessTypeName));

          this.businessForm.patchValue({
            businessName: business.businessName,
            currentBusiness: business.currentBusiness,
            address: business.businessAddress,
            gst: business.businessGstNo,
            businessDuration: business.businessDuration,
            subBusiness: business.subBusiness,
            capitalInvestment: business.businessCapital.capitalInvestment,
            workingCapital: business.businessCapital.rollingInvestment,
            monthlyExpenses: business.businessCapital.monthlyExpenses,
            rollingInvestment: business.businessCapital.rollingInvestment,
            averageProfit: business.businessCapital.avgProfitPercentage,

            ownership: {
              Proprietorship: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.Proprietorship),
              PvtLtd: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.PvtLtd),
              LLP: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.LLP),
              Partnership: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.Partnership)
            },

            // category: {
            partTime: this.normalize(business.businessCategoryId) === this.normalize(BusinessCategory.partTime),
            fullTime: this.normalize(business.businessCategoryId) === this.normalize(BusinessCategory.fullTime),
            // },


            bType: {
              Service: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Service),
              Trading: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Trading),
              Manufacture: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Manufacture),
              Wholesale: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Wholesale),
              //retail: this.normalize(business.businessTypeId) === this.normalize(BusinessType.RetailGhar) ||
              //   this.normalize(business.businessTypeId) === this.normalize(BusinessType.RetailShop),
              RetailGhar: this.normalize(business.businessTypeId) === this.normalize(BusinessType.RetailGhar),
              RetailShop: this.normalize(business.businessTypeId) === this.normalize(BusinessType.RetailShop)
            },

            location: {
              Gaon: this.normalize(business.businessPlaceId) === this.normalize(BusinessPlace.Gaon),
              City: this.normalize(business.businessPlaceId) === this.normalize(BusinessPlace.City),
              Bazaar: this.normalize(business.businessPlaceId) === this.normalize(BusinessPlace.Bazaar),
              Home: this.normalize(business.businessPlaceId) === this.normalize(BusinessPlace.Home),
              Phirta: this.normalize(business.businessPlaceId) === this.normalize(BusinessPlace.Phirta),
              Itar: this.normalize(business.businessPlaceId) === this.normalize(BusinessPlace.Itar)
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
    // if (this.businessForm.invalid) {
    //   this.businessForm.markAllAsTouched();
    //   return;
    // }

    const formData = this.businessForm.value;
    let businessCategoryId: number | null = null;
    if (formData.partTime) {
      businessCategoryId = BusinessCategory.partTime;
    } else if (formData.fullTime) {
      businessCategoryId = BusinessCategory.fullTime;
    }

    const bType = formData.bType || {};

    // Find the first business type that is true
    const selectedBusinessTypeKey = Object.keys(bType).find(key => bType[key] === true);

    const businessTypeId = selectedBusinessTypeKey
      ? BusinessType[selectedBusinessTypeKey as keyof typeof BusinessType]
      : null;

    const businessTypeName = businessTypeId !== null
      ? BusinessTypeNames[businessTypeId as keyof typeof BusinessTypeNames]
      : null;

    const ownershipFormGroup = formData.ownership || {};

    // Find which ownership checkbox is checked
    const selectedOwnershipKey = Object.keys(ownershipFormGroup).find(key => ownershipFormGroup[key] === true);

    // Map form control key to Ownership enum
    const businessOwnershipId = selectedOwnershipKey
      ? Ownership[selectedOwnershipKey as keyof typeof Ownership]
      : null;

    // Map enum id to ownership name string
    const ownership = businessOwnershipId !== null
      ? OwnershipNames[businessOwnershipId]
      : null;

    const locationFormGroup = formData.location || {};

    // Find first selected location checkbox
    const selectedLocationKey = Object.keys(locationFormGroup).find(key => locationFormGroup[key] === true);

    // Map checkbox key to BusinessPlace enum
    const businessPlaceId = selectedLocationKey
      ? BusinessPlace[selectedLocationKey as keyof typeof BusinessPlace]
      : null;

    // Get display name
    const businessPlace = businessPlaceId !== null
      ? BusinessPlaceNames[businessPlaceId]
      : null;
    // Map enum IDs to display names
    const payload = {
      currentBusiness: formData.currentBusiness,
      businessName: formData.businessName,
      businessAddress: formData.address,
      businessGstNo: formData.gst || null,
      businessDuration: formData.businessDuration,
      businessTypeId: businessTypeId,
      businessTypeName: businessTypeName,
      businessOwnershipId: businessOwnershipId,
      ownership: ownership,             // map numeric ID to display
      businessCategoryId: businessCategoryId,
      businessCategory: businessCategoryId ? BusinessCategoryNames[businessCategoryId as BusinessCategory] : null,
      businessPlaceId: businessPlaceId,
      businessPlace: businessPlace,
      subBusiness: formData.subBusiness,
      businessCapital: {
        capitalInvestment: formData.capitalInvestment,
        monthlyExpenses: formData.monthlyExpenses,
        rollingInvestment: formData.rollingInvestment,
        avgProfitPercentage: formData.averageProfit
      }
    };

    if (this.isEditMode) {
      this.userDetailsService.UpdateBusinessDetails(this.userId, payload).subscribe({
        next: res => {
          alert('Business Information updated successfully!');
          console.log('Updated payload:', payload);
        },
        error: err => {
          console.error('Error updating business info:', err);
          alert('Error updating business information.');
        }
      });
    } else {
      this.userDetailsService.addBusinessDetails(payload).subscribe({
        next: res => {
          alert('Business Information added successfully!');
          console.log('Added payload:', payload);
        },
        error: err => {
          console.error('Error adding business info:', err);
          alert('Error adding business information.');
        }
      });
    }
  }

}
