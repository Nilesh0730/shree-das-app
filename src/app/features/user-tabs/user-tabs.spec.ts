import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTabsComponent } from './user-tabs';

describe('UserTabsComponent', () => {
  let component: UserTabsComponent;
  let fixture: ComponentFixture<UserTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTabsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
