import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MopComponent } from './mop.component';

describe('MopComponent', () => {
  let component: MopComponent;
  let fixture: ComponentFixture<MopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
