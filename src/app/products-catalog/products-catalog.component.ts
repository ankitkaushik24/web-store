import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ProductsCatalogService } from './products-catalog.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GlobalHeaderComponent } from '../utity/components/global-header/global-header.component';
import { RxLet } from '@rx-angular/template/let';
import { RxIf } from '@rx-angular/template/if';
import { IsLoadingPipe } from '../utity/pipes/is-loading.pipe';
import { LoaderComponent } from '../utity/components/loader.component';

@Component({
  selector: 'stc-products-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    NgOptimizedImage,
    MatButtonModule,
    GlobalHeaderComponent,
    RxLet,
    RxIf,
    IsLoadingPipe,
    LoaderComponent
  ],
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsCatalogComponent {
  private productsCatalogService = inject(ProductsCatalogService);

  selectedCategory$ = this.productsCatalogService.select('selectedCategory');

  categories$ = this.productsCatalogService.select('categories');

  productsInCategory$ =
    this.productsCatalogService.select('productsInCategory');

  onCategoryChange(category: string) {
    if (category) {
      this.productsCatalogService.set({ selectedCategory: category });
    }
  }
}
