import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductCard, ProductCardInput } from "./product-card";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { RouterLink } from "@angular/router"; // Make sure RouterLink is imported here

describe("ProductCard", () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  // Define mock data that matches the ProductCardInput interface
  const mockProductData: ProductCardInput = {
    id: 1,
    title: "Sample Laptop",
    description: "A great laptop for daily use.",
    price: 999,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: "TechBrand",
    category: "Laptops",
    thumbnail: "http://example.com/thumbnail.jpg",
    images: ["http://example.com/image1.jpg"],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the standalone component
      imports: [ProductCard, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    // Set the input property before the first change detection cycle
    // For input signals, we need to set them via TestBed's component creation
    fixture.componentRef.setInput('product', mockProductData);

    fixture.detectChanges(); // Run Angular change detection
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the correct product title", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent || "";
    expect(text).toContain(mockProductData.title);
  });

  it("should display the product price", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent || "";
    expect(text).toContain("999");
  });

  it("should bind the correct image thumbnail source", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imageElement = compiled.querySelector("img") as HTMLImageElement;
    
    expect(imageElement).toBeTruthy();
    const srcValue = imageElement?.src || "";
    expect(srcValue.length).toBeGreaterThan(0);
  });

  it("should contain a RouterLink directive", () => {
    const routerLinkDebugElement = fixture.debugElement.query(
      By.directive(RouterLink),
    );
    expect(routerLinkDebugElement).toBeTruthy();
  });
});
