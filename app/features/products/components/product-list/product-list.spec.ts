import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { ProductList } from "./product-list";
import { productSelectors } from "../../store/product-selectors";

describe("ProductList", () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList, RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: productSelectors.selectEntities,
              value: { products: [] },
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
