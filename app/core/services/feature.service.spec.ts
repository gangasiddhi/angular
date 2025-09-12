import { TestBed } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureService } from './feature.service';
import { environment } from '@env/environment';


// Sample type
interface Product {
  id: string;
  name: string;
}

// Concrete implementation of the abstract service for testing
class MockProductService extends FeatureService<Product> {
  constructor() {
    super('products');
  }
}

describe('FeatureService', () => {
   let service: MockProductService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProductService]
    });

    service = TestBed.inject(MockProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET all', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product A' },
      { id: '2', name: 'Product B' }
    ];

    service.getAll().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should perform GET by ID', () => {
    const mockProduct: Product = { id: '1', name: 'Product A' };

    service.getById('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should perform POST create', () => {
    const newProduct: Product = { id: '3', name: 'Product C' };

    service.create(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  it('should perform PUT update', () => {
    const updatedProduct: Product = { id: '1', name: 'Updated Product A' };

    service.update(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });

  it('should perform DELETE by ID', () => {
    const deletedProduct: Product = { id: '1', name: 'Product A' };

    service.delete('1').subscribe((product) => {
      expect(product).toEqual(deletedProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedProduct);
  });

  it('should pass HttpParams when provided', () => {
    const params = new HttpParams().set('sort', 'desc');

    service.getAll(params).subscribe();

    const req = httpMock.expectOne((request) => request.url === `${apiUrl}/products`);
    expect(req.request.params.get('sort')).toBe('desc');
    req.flush([]);
  });
});
