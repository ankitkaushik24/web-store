import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProductsDashboardComponent from './products-dashboard.component';

describe('ProductsDashboardComponent', () => {
  let component: ProductsDashboardComponent;
  let fixture: ComponentFixture<ProductsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductsDashboardComponent]
    });
    fixture = TestBed.createComponent(ProductsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
