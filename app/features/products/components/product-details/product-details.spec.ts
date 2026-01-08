import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { ProductDetails } from "./product-details";
import { productSelectors } from "../../store/product-selectors";

describe("ProductDetails", () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  const sampleProduct = {
    id: 1,
    title: "Test Product",
    brand: "Acme",
    price: 9.99,
    discountPercentage: 0,
    description: "A test product",
    availabilityStatus: "In stock",
    stock: 10,
    images: ["/assets/sample.png"],
    shippingInformation: "Free",
    returnPolicy: "30 days",
    reviews: [],
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideMockStore({
          selectors: [
            { selector: productSelectors.selectSelected, value: sampleProduct },
          ],
        }),
        { provide: ActivatedRoute, useValue: { params: of({ id: "1" }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
