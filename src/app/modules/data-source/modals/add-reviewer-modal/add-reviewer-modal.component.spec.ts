import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewerModal } from './add-reviewer-modal.component';

describe('AddReviewerModalComponent', () => {
  let component: AddReviewerModal;
  let fixture: ComponentFixture<AddReviewerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReviewerModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReviewerModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
