import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  @Output() nextButton = new EventEmitter<string>();

  InformationTitle = '';
  InformationDescription = '';

  businessForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.mode === 'edit';

    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      currentBusiness: ['', Validators.required],
      address: ['', Validators.required],
      gst: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
      ]],
      businessDuration: [0, Validators.min(0)],
      partTime: [false],
      fullTime: [false],
      subBusiness: [''],
      coreStrength: [''],
      businessView: [''],

      ownership: this.fb.group({
        Proprietorship: [false],
        PvtLtd: [false],
        LLP: [false],
        Partnership: [false]
      }, { validators: this.minOneCheckboxValidator() }),

      bType: this.fb.group({
        Service: [false],
        Trading: [false],
        Manufacture: [false],
        Wholesale: [false],
        RetailGhar: [false],
        RetailShop: [false]
      }, { validators: this.minOneCheckboxValidator() }),

      location: this.fb.group({
        Gaon: [false],
        City: [false],
        Bazaar: [false],
        Home: [false],
        Phirta: [false],
        Itar: [false]
      }, { validators: this.minOneCheckboxValidator() }),

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
            coreStrength:business.coreStrength,
            businessView:business.businessView,
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

            partTime: this.normalize(business.businessCategoryId) === this.normalize(BusinessCategory.partTime),
            fullTime: this.normalize(business.businessCategoryId) === this.normalize(BusinessCategory.fullTime),

            bType: {
              Service: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Service),
              Trading: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Trading),
              Manufacture: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Manufacture),
              Wholesale: this.normalize(business.businessTypeId) === this.normalize(BusinessType.Wholesale),
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

  onCheckboxChange(groupName: string, selectedControl: string) {
    // 1. Identify the group (either the main form or a nested group)
    const group = groupName === 'root'
      ? this.businessForm
      : this.businessForm.get(groupName) as FormGroup;

    if (!group) return;

    // 2. Check if the clicked checkbox was just turned ON
    const isChecked = group.get(selectedControl)?.value;

    if (isChecked) {
      if (groupName === 'root') {
        // Logic for Time Commitment (partTime vs fullTime)
        const timeFields = ['partTime', 'fullTime'];
        timeFields.forEach(field => {
          if (field !== selectedControl) {
            group.get(field)?.setValue(false, { emitEvent: false });
          }
        });
      } else {
        // Logic for nested groups (ownership, bType, location)
        Object.keys(group.controls).forEach(controlName => {
          if (controlName !== selectedControl) {
            group.get(controlName)?.setValue(false, { emitEvent: false });
          }
        });
      }
    }

    // 3. Mark the group as touched to trigger validation messages immediately
    group.get(selectedControl)?.markAsTouched();
    if (groupName !== 'root') {
      group.markAsTouched();
    }
  }

  atLeastOneCheckboxSelected(fields: string[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const hasOneSelected = fields.some(field => group.get(field)?.value === true);
      return hasOneSelected ? null : { timeRequired: true };
    };
  }

  private minOneCheckboxValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const g = group as FormGroup;
      const anySelected = Object.keys(g.controls).some(key => g.get(key)?.value === true);
      return anySelected ? null : { requireOne: true };
    };
  }

  checkFormErrors() {
    const findInvalidControls = (formGroup: FormGroup | FormArray, parentName = '') => {
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        const name = parentName ? `${parentName} -> ${field}` : field;

        if (control?.invalid) {
          console.log('Invalid Field:', name, 'Errors:', control.errors);
        }

        // Recursive call for nested groups
        if (control instanceof FormGroup || control instanceof FormArray) {
          findInvalidControls(control, name);
        }
      });
    };

    findInvalidControls(this.businessForm);
  }

  onSaveBusinessInformation() {
    // this.checkFormErrors();
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }

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
      coreStrength:formData.coreStrength,
      businessView:formData.businessView,
      businessCapital: {
        capitalInvestment: formData.capitalInvestment,
        monthlyExpenses: formData.monthlyExpenses,
        rollingInvestment: formData.rollingInvestment,
        avgProfitPercentage: formData.averageProfit
      }
    };

    this.userDetailsService.UpdateBusinessDetails(this.userId, payload).subscribe({
      next: (res: IUserResponse) => {
        alert(`${res.message}`)
        this.nextButton.emit('next');
      },
      error: err => {
        console.error('Error updating business info:', err);
        alert('Error updating business information.');
      }
    });
  }

}
