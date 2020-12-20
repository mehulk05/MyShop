import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductComponent } from './related-product.component';

describe('RelatedProductComponent', () => {
  let component: RelatedProductComponent;
  let fixture: ComponentFixture<RelatedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
