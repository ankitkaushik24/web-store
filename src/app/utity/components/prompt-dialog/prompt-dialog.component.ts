/* eslint-disable @angular-eslint/component-class-suffix */
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type PromptType = 'success' | 'error' | 'warn' | 'confirm';

@Component({
  selector: 'ipm-prompt-dialogue',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
})
export class PromptDialog implements OnInit {
  private destroyRef = inject(DestroyRef);
  
  promptMap: Record<PromptType, { icon: string; color: string }> = {
    success: {
      icon: 'task_alt',
      color: 'green',
    },
    error: {
      icon: 'error',
      color: 'red',
    },
    warn: {
      icon: 'warning',
      color: 'orange',
    },
    confirm: {
      icon: 'indeterminate_question_box',
      color: 'blue',
    },
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: PromptType;
      message: string;
      primary: { text: string; handler?: () => void };
      secondary?: { text: string; handler?: () => void };
      duration?: number;
      secondaryMessage?: string;
      infoMessages?: string[] | null;
    },
    private matDialogRef: MatDialogRef<any>,
  ) {}

  ngOnInit(): void {
    if (this.data.duration) {
      timer(+this.data.duration)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.matDialogRef.close();
        });
    }
  }
}
