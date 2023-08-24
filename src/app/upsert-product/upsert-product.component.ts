import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'stc-upsert-product',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './upsert-product.component.html',
  styleUrls: ['./upsert-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertProductComponent implements OnInit {
  private dialogRef = inject(MatDialogRef);
  dialogData = inject(MAT_DIALOG_DATA);

  upsertProductForm = inject(FormBuilder).nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', Validators.required],
    price: ['', [Validators.required]],
    category: ['', Validators.required],
    image: ''
  });

  availableCategories =  [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  ngOnInit() {
    const {currentValue} = this.dialogData;

    if (currentValue) {
      this.upsertProductForm.patchValue(currentValue);
    }
  }

  onSave() {
    this.dialogData.onSave(this.upsertProductForm.value, () => this.dialogRef.close());
  }
}
