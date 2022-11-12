import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToRoleModal } from './add-user-to-role-modal.component';

describe('AddUserToRoleModal', () => {
  let component: AddUserToRoleModal;
  let fixture: ComponentFixture<AddUserToRoleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToRoleModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToRoleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
