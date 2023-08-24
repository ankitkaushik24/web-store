import { Observable, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export type NotificationType = 'success' | 'error';

export interface INotification {
  type: NotificationType;
  heading: string;
  message: string;
  primary?: { text: string; handler?: () => void };
  secondary?: { text: string; handler?: () => void };
  duration?: number;
  showInSnackBar?: boolean;
}

export class Notifier {
  static notification$ = new Subject<INotification>();

  static getNotifications(): Observable<any> {
    return this.notification$.asObservable();
  }

  /**
   * @param showNotification
   * true, to display notification for success and errored scenario
   * false, to disable any notification
   * success, to display notification only on success scenario
   * error, to display notification only on errored scenario
   * @param extras
   * this is responsible to override any notification value
   * this could be a simple map or
   * method returning that map
   * @returns lettable RxJs operator
   * that could be piped in any finite Observable stream
   * to popout notifications dynamically
   */
  static notify<T>(
      showNotification: boolean | NotificationType | ((res: any) => boolean),
      extras?:
        | Record<NotificationType, Partial<INotification>>
        | Partial<INotification>
        | ((response: any) => Partial<INotification>)
    ) {
    return (source: Observable<T>) => {
      const displayNotification = (
        notification: INotification,
        res: any,
        notificationExtras: Partial<INotification>
      ) => {
        Notifier.notification$.next({
          ...notification,
          ...(extras instanceof Function
            ? extras(res)
            : notificationExtras || extras),
        });
      };

      return source.pipe(
        tap((res: any) => {
          if (
            showNotification === true ||
            showNotification === 'success' ||
            (showNotification instanceof Function && showNotification(res))
          ) {
            displayNotification(
              {
                type: 'success',
                heading: res.code,
                message: res.message,
                duration: 3000,
              },
              res,
              (extras as Record<NotificationType, INotification>)?.success
            );
          }
        }),
        catchError((err: HttpErrorResponse) => {
          if (
            err &&
            (showNotification === true ||
              showNotification === 'error' ||
              (showNotification instanceof Function && showNotification(err)))
          ) {
            displayNotification(
              {
                type: 'error',
                heading: err?.statusText,
                message: err.error?.message || err.message,
                primary: { text: 'Dismiss' },
              },
              err,
              (extras as Record<NotificationType, INotification>)?.error
            );
          }
          return throwError(err);
        })
      );
    };
  }
}