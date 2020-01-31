import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRequestActionComponent } from './credit-request-action.component';

describe('CreditRequestActionComponent', () => {
  let component: CreditRequestActionComponent;
  let fixture: ComponentFixture<CreditRequestActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditRequestActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditRequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
