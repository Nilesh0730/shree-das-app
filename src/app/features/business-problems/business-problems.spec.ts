import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProblemsComponent } from './business-problems';

describe('BusinessProblemsComponent', () => {
  let component: BusinessProblemsComponent;
  let fixture: ComponentFixture<BusinessProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProblemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessProblemsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
