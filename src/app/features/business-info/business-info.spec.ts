import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoComponent } from './business-info';

describe('BusinessInfoComponent', () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
