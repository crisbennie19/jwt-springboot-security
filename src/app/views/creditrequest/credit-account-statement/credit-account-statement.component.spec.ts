import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAccountStatementComponent } from './credit-account-statement.component';

describe('CreditRequestActionComponent', () => {
  let component: CreditAccountStatementComponent;
  let fixture: ComponentFixture<CreditAccountStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAccountStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
