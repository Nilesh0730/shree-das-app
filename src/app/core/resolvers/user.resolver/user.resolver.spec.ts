import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let component: UserResolver;
  let fixture: ComponentFixture<UserResolver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserResolver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserResolver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
