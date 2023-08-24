import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { take, toArray } from 'rxjs';
import createSpy = jasmine.createSpy;

import { ProductsDashboardService } from './products-dashboard.service';
import { IProduct } from '../globel.model';

const commonUrl = 'https://fakestoreapi.com/products';

const createMockProduct = (withData?: Partial<IProduct>): IProduct => ({
  id: Math.ceil(Math.random() * 10),
  title: 'Title X',
  description: 'Random Description',
  price: +(Math.random() * 200).toFixed(2),
  category: 'electronics',
  image: '',
  ...withData,
});

describe('ProductsDashboardService', () => {
  let service: ProductsDashboardService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsDashboardService],
    });
    service = TestBed.inject(ProductsDashboardService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should retrieve existing products', (done) => {
    service.select('products').subscribe((products) => {
      expect(products).toEqual([]);
      done();
    });

    const req = httpTestController.expectOne(commonUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should delete a product', (done) => {
    const productToBeDeleted = createMockProduct();

    const responses: IProduct[] = [createMockProduct(), productToBeDeleted];

    service
      .select('products')
      .pipe(take(2), toArray())
      .subscribe({
        next: (collection) => {
          expect(collection).toEqual([responses, [responses[0]]]);
          done();
        },
        error: done.fail,
      });

    const getReq = httpTestController.expectOne(commonUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(responses);

    service.deleteProduct$$.next(productToBeDeleted.id);

    const deleteReq = httpTestController.expectOne(`${commonUrl}/${productToBeDeleted.id}`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(productToBeDeleted);

  });

  it('should add a product', (done) => {
    const productToBeAdded = createMockProduct();
    const preAddResponses = [createMockProduct()];
    const postAddResponses = [productToBeAdded, ...preAddResponses];

    const postRequestSpy = createSpy('postRequest', () => {});

    service
      .select('products')
      .pipe(take(2), toArray())
      .subscribe({
        next: (collection) => {
          expect(collection).toEqual([preAddResponses, postAddResponses]);
          expect(postRequestSpy).toHaveBeenCalled();
          done();
        },
        error: done.fail,
      });

    const getReq = httpTestController.expectOne(commonUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(preAddResponses);

    service.addProduct$$.next({
      payload: productToBeAdded,
      postRequest: postRequestSpy,
    });

    const addReq = httpTestController.expectOne(commonUrl);
    expect(addReq.request.method).toBe('POST');
    addReq.flush(productToBeAdded);

  });

  it('should update a product', (done) => {
    const productToUpdate = createMockProduct();
    const responses: IProduct[] = [
      productToUpdate,
      createMockProduct(),
    ];
    const updatedProduct = {
      ...productToUpdate,
      description: 'product desc',
    };

    service
      .select('products')
      .pipe(take(2), toArray())
      .subscribe({
        next: (collection) => {
          expect(collection).toEqual([responses, [updatedProduct, responses[1]]]);
          done();
        },
        error: done.fail,
      });

    const getReq = httpTestController.expectOne(commonUrl);
    expect(getReq.request.method).toBe('GET');
    getReq.flush(responses);

    service.updateProduct$$.next({payload: updatedProduct, postRequest: () => null});

    const updateReq = httpTestController.expectOne(
      (req) =>
        req.url === `${commonUrl}/${updatedProduct.id}` && req.method === 'PUT'
    );
    updateReq.flush(updatedProduct);

  });
});
