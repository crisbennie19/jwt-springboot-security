import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditBankStatementComponent } from './credit-bank-statement.component';

describe('CreditBankStatementComponent', () => {
  let component: CreditBankStatementComponent;
  let fixture: ComponentFixture<CreditBankStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditBankStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditBankStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
