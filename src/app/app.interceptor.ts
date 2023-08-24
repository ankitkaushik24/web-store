import {
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';

import { Notifier } from './utity/operators/notifier';

export const AppInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => next(request).pipe(Notifier.notify('error'));
