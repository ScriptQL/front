import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleModal } from './edit-role-modal.component';

describe('EditRoleModalComponent', () => {
  let component: EditRoleModal;
  let fixture: ComponentFixture<EditRoleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoleModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
