import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditToApproveComponent } from './credit-to-approve.component';

describe('CreditToApproveComponent', () => {
  let component: CreditToApproveComponent;
  let fixture: ComponentFixture<CreditToApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditToApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
