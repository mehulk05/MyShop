import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuoteComponent } from './get-quote.component';

describe('GetQuoteComponent', () => {
  let component: GetQuoteComponent;
  let fixture: ComponentFixture<GetQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
