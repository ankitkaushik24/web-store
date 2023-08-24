import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  PAGE_SIZE,
  ProductsDashboardService,
} from './products-dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IProduct } from '../globel.model';
import { GlobalHeaderComponent } from '../utity/components/global-header/global-header.component';

@Component({
  selector: 'stc-products-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    GlobalHeaderComponent
  ],
  providers: [ProductsDashboardService],
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsDashboardComponent {
  private dashboardService = inject(ProductsDashboardService);
  private dialog = inject(MatDialog);

  pageSize = PAGE_SIZE;
  data$ = this.dashboardService.visibleProducts$;
  totalCount$ = this.dashboardService.totalCount$;

  displayedColumns = ['title', 'price', 'category', 'description'];
  displayedColumnsWithActions = [...this.displayedColumns, 'actions'];

  onPageChange(pageIndex: number): void {
    this.dashboardService.set({ pageIndex });
  }

  onProductEdit(product: IProduct): void {
    import('../upsert-product/upsert-product.component').then((m) => {
      this.dialog.open(m.UpsertProductComponent, {
        data: {
          action: 'edit',
          currentValue: product,
          onSave: (payload: IProduct, postRequest: () => void) =>
            this.dashboardService.updateProduct$$.next({
              payload: {...product, ...payload},
              postRequest,
            }),
        },
      });
    });
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure?')) {
      this.dashboardService.deleteProduct$$.next(productId);
    }
  }
}
