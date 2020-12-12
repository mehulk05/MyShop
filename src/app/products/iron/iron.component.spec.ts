import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IronComponent } from './iron.component';

describe('IronComponent', () => {
  let component: IronComponent;
  let fixture: ComponentFixture<IronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
