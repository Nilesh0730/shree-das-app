import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGridComponent } from './user-grid';

describe('UserGrid', () => {
  let component: UserGridComponent;
  let fixture: ComponentFixture<UserGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
