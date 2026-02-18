import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserDetailsService } from '../../core/services/user-details';
import { CommonModule } from '@angular/common';
import { IBusinessDetails, BusinessType, Ownership, BusinessCategory, BusinessPlace } from '../../models/business-details.model';
import { BusinessCategoryNames, BusinessPlaceNames, BusinessTypeNames, OwnershipNames } from '../../models/business-type.enum';

interface IUserResponse {
  message: string;
  success: boolean;
}

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
      businessDuration: [0, [Validators.required, Validators.min(0)]],

      // CHANGED: Moved into a nested group
      timeCommitment: this.fb.group({
        partTime: [false],
        fullTime: [false]
      }, { validators: this.minOneCheckboxValidator() }),

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
      averageProfit: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    if (this.isEditMode && this.userId) {
      this.loadData(this.userId);
    }
  }

  private normalize(value: unknown): string {
    return (value ?? '').toString().toLowerCase().replace(/\s+/g, '');
  }

  onCheckboxChange(groupName: string, selectedControl: string) {
    const group = this.businessForm.get(groupName) as FormGroup;
    if (!group) return;

    const control = group.get(selectedControl);

    // 1. Mandatory Selection Logic
    // If the user tries to uncheck the box (value becomes false),
    // we force it back to true so one is ALWAYS selected.
    if (control?.value === false) {
      control.setValue(true, { emitEvent: false });
      return;
    }

    // 2. Mutual Exclusion Logic (Radio Button Behavior)
    Object.keys(group.controls).forEach(name => {
      if (name !== selectedControl) {
        // Set others to false
        group.get(name)?.setValue(false, { emitEvent: false });
        // Mark others as untouched so they don't show individual errors
        group.get(name)?.markAsUntouched();
      }
    });

    // 3. Validation Refresh Logic
    // We MUST call updateValueAndValidity on the GROUP first,
    // then the ROOT form so the 'invalid' status bubbles up.
    group.updateValueAndValidity({ emitEvent: true });
    this.businessForm.updateValueAndValidity({ emitEvent: true });

    // 4. Interaction State
    group.markAsTouched();
  }
  // private minOneCheckboxValidator(): ValidatorFn {
  //   return (group: AbstractControl): ValidationErrors | null => {
  //     const g = group as FormGroup;
  //     const anySelected = Object.keys(g.controls).some(key => g.get(key)?.value === true);
  //     return anySelected ? null : { requireOne: true };
  //   };
  // }

  private minOneCheckboxValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const g = group as FormGroup;
      // Check if at least one control is true
      const anySelected = Object.keys(g.controls).some(key => g.get(key)?.value === true);

      // IMPORTANT:
      // If valid, return null.
      // If invalid, return an error object.
      return anySelected ? null : { requireOne: true };
    };
  }

  loadData(userId: any) {
    this.userDetailsService.getBusinessDetails(userId).subscribe({
      next: (business: IBusinessDetails) => {
        if (business) {
          this.businessForm.patchValue({
            businessName: business.businessName,
            currentBusiness: business.currentBusiness,
            address: business.businessAddress,
            gst: business.businessGstNo,
            businessDuration: business.businessDuration,
            subBusiness: business.subBusiness,
            coreStrength: business.coreStrength,
            businessView: business.businessView,
            capitalInvestment: business.businessCapital.capitalInvestment,
            workingCapital: business.businessCapital.rollingInvestment,
            monthlyExpenses: business.businessCapital.monthlyExpenses,
            rollingInvestment: business.businessCapital.rollingInvestment,
            averageProfit: business.businessCapital.avgProfitPercentage,

            // Mapping for the new Group
            timeCommitment: {
              partTime: this.normalize(business.businessCategoryId) === this.normalize(BusinessCategory.partTime),
              fullTime: this.normalize(business.businessCategoryId) === this.normalize(BusinessCategory.fullTime),
            },

            ownership: {
              Proprietorship: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.Proprietorship),
              PvtLtd: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.PvtLtd),
              LLP: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.LLP),
              Partnership: this.normalize(business.businessOwnershipId) === this.normalize(Ownership.Partnership)
            },

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
        }
      }
    });
  }

  onSaveBusinessInformation() {
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }

    const formData = this.businessForm.getRawValue();

    // Helper to find selected key in a group
    const getSelectedKey = (groupObj: any) => Object.keys(groupObj).find(key => groupObj[key] === true);

    // 1. Time
    const selectedTimeKey = getSelectedKey(formData.timeCommitment);
    const businessCategoryId = selectedTimeKey ? (BusinessCategory as any)[selectedTimeKey] : null;

    // 2. Type
    const selectedTypeKey = getSelectedKey(formData.bType);
    const businessTypeId = selectedTypeKey ? (BusinessType as any)[selectedTypeKey] : null;

    // 3. Ownership
    const selectedOwnershipKey = getSelectedKey(formData.ownership);
    const businessOwnershipId = selectedOwnershipKey ? (Ownership as any)[selectedOwnershipKey] : null;

    // 4. Place
    const selectedPlaceKey = getSelectedKey(formData.location);
    const businessPlaceId = selectedPlaceKey ? (BusinessPlace as any)[selectedPlaceKey] : null;

    const payload = {
      currentBusiness: formData.currentBusiness,
      businessName: formData.businessName,
      businessAddress: formData.address,
      businessGstNo: formData.gst || null,
      businessDuration: formData.businessDuration,
      businessTypeId: businessTypeId,
      businessTypeName: businessTypeId !== null ? BusinessTypeNames[businessTypeId as BusinessType] : null,
      businessOwnershipId: businessOwnershipId,
      ownership: businessOwnershipId !== null ? OwnershipNames[businessOwnershipId as Ownership] : null,
      businessCategoryId: businessCategoryId,
      businessCategory: businessCategoryId ? BusinessCategoryNames[businessCategoryId as BusinessCategory] : null,
      businessPlaceId: businessPlaceId,
      businessPlace: businessPlaceId !== null ? BusinessPlaceNames[businessPlaceId as BusinessPlace] : null,
      subBusiness: formData.subBusiness,
      coreStrength: formData.coreStrength,
      businessView: formData.businessView,
      businessCapital: {
        capitalInvestment: formData.capitalInvestment,
        monthlyExpenses: formData.monthlyExpenses,
        rollingInvestment: formData.rollingInvestment,
        avgProfitPercentage: formData.averageProfit
      }
    };

    this.userDetailsService.UpdateBusinessDetails(this.userId, payload).subscribe({
      next: (res: IUserResponse) => {
        alert(`${res.message}`);
        this.nextButton.emit('next');
      },
      error: () => alert('Error updating business information.')
    });
  }
}
