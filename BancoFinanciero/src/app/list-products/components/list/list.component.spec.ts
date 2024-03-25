import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ProductService } from 'src/app/services/product.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [ProductService]
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ListComponent', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
