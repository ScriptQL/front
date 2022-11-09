import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceReviewersComponent } from './data-source-reviewers.component';

describe('DataSourceReviewersComponent', () => {
  let component: DataSourceReviewersComponent;
  let fixture: ComponentFixture<DataSourceReviewersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSourceReviewersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSourceReviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
