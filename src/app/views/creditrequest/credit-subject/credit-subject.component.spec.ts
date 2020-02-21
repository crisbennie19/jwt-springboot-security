import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSubjectComponent } from './credit-subject.component';

describe('CreditSubjectComponent', () => {
  let component: CreditSubjectComponent;
  let fixture: ComponentFixture<CreditSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
