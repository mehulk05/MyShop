import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuinessComponent } from './buiness.component';

describe('BuinessComponent', () => {
  let component: BuinessComponent;
  let fixture: ComponentFixture<BuinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
