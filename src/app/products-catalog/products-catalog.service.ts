import { inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { IProduct } from '../globel.model';
import { Loaders } from '../utity/operators/loaders';

@Injectable({
  providedIn: 'root',
})
export class ProductsCatalogService extends RxState<{
  categories: string[];
  selectedCategory: string;
  productsInCategory: IProduct[];
}> {
  private http = inject(HttpClient);

  private categories$ = this.http.get<string[]>(
    'https://fakestoreapi.com/products/categories'
  );
  private productsInCategory = this.select('selectedCategory').pipe(
    switchMap((category) =>
      this.http
        .get<IProduct[]>(
          `https://fakestoreapi.com/products/category/${category}`
        )
        .pipe(Loaders.loading('categories'))
    )
  );

  constructor() {
    super();

    this.connect(this.categories$, (_, categories) => ({
      categories,
      selectedCategory: categories[0],
    }));
    this.connect('productsInCategory', this.productsInCategory);
  }
}
