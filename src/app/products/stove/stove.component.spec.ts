import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoveComponent } from './stove.component';

describe('StoveComponent', () => {
  let component: StoveComponent;
  let fixture: ComponentFixture<StoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
