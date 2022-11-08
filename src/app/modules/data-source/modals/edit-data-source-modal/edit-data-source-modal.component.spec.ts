import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataSourceModal } from './edit-data-source-modal.component';

describe('EditDataSourceModalComponent', () => {
  let component: EditDataSourceModal;
  let fixture: ComponentFixture<EditDataSourceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataSourceModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataSourceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
