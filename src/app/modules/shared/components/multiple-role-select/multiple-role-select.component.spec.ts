import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRoleSelectComponent } from './multiple-role-select.component';

describe('MultipleRoleSelectComponent', () => {
  let component: MultipleRoleSelectComponent;
  let fixture: ComponentFixture<MultipleRoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRoleSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
