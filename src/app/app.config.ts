import { ApplicationConfig, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Notifier } from './utity/operators/notifier';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatDialogModule),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AppInterceptor])
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimations(),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const dialog = inject(MatDialog);
        Notifier.getNotifications().pipe(takeUntilDestroyed()).subscribe((notification) => {
          import('./utity/components/prompt-dialog/prompt-dialog.component').then(m => {
            dialog.open(m.PromptDialog, {
              data: {
                ...notification,
              },
            });
          });
        });
      },
    }
  ],
};
