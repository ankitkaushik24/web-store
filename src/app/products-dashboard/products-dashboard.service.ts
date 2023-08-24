import { inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { HttpClient } from '@angular/common/http';
import {
  combineLatest,
  map,
  merge,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { IProduct } from '../globel.model';
import { Notifier } from '../utity/operators/notifier';
import { Loaders } from '../utity/operators/loaders';

export const PAGE_SIZE = 10;

@Injectable()
export class ProductsDashboardService extends RxState<{
  products: IProduct[];
  pageIndex: number;
}> {
  private http = inject(HttpClient);

  private products$ = this.fetchProducts();

  visibleProducts$ = this.select(
    ['products', 'pageIndex'],
    ({ products, pageIndex }) =>
      products.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
  );

  totalCount$ = this.select('products', (products) => products?.length ?? 0);

  // actions
  addProduct$$ = new Subject<{ payload: IProduct; postRequest: () => void }>();
  updateProduct$$ = new Subject<{
    payload: IProduct;
    postRequest: () => void;
  }>();
  deleteProduct$$ = new Subject<number>();

  // events
  private productAdded$ = this.addProduct$$.pipe(
    switchMap(({ payload, postRequest }) =>
      this.createProduct(payload).pipe(tap(() => postRequest()))
    )
  );

  private productDeleted$ = this.deleteProduct$$.pipe(
    switchMap((id) => this.deleteProduct(id))
  );

  private productUpdated$ = this.updateProduct$$.pipe(
    switchMap(({ payload, postRequest }) =>
      this.updateProduct(payload.id, payload).pipe(tap(() => postRequest()))
    )
  );

  constructor() {
    super();

    this.set({ pageIndex: 0 });

    this.connect(this.products$, (_, products) => ({
      products,
      totalCount: products.length,
    }));

    this.connect(this.productUpdated$, (oldState, value) => {
      return {
        products: oldState.products.map((product) => {
          if (product.id === value.id) {
            return value;
          }
          return product;
        }),
      };
    });

    this.connect(this.productDeleted$, (oldState, value) => {
      return {
        products: oldState.products.filter(
          (product) => product.id !== value.id
        ),
      };
    });

    this.connect(this.productAdded$, (oldState, value) => {
      return { products: [value, ...oldState.products] };
    });
  }

  // API calls
  private fetchProducts() {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products').pipe(Loaders.loading('main'));
  }

  private createProduct(payload: IProduct) {
    return this.http.post<IProduct>(
      'https://fakestoreapi.com/products',
      payload
    );
  }

  private updateProduct(productId: number, updatedProduct: IProduct) {
    return this.http.put<IProduct>(
      `https://fakestoreapi.com/products/${productId}`,
      updatedProduct
    ).pipe(Notifier.notify('success', {message: 'Product updated successfully!'}));
  }

  private deleteProduct(_id: number) {
    return this.http.delete<IProduct>(
      `https://fakestoreapi.com/products/${_id}`
    ).pipe(Notifier.notify('success', {message: 'Product deleted successfully!'}));
  }
}
