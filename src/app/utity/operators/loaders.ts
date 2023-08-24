/* eslint-disable arrow-body-style */
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, finalize, map } from 'rxjs/operators';

export type LoaderType = string;

export class Loaders {
  private static loaders$ = new BehaviorSubject<Record<LoaderType, number>>(
    {} as Record<LoaderType, number>
  );

  public static isLoading(loaderId: LoaderType): Observable<boolean> {
    return Loaders.loaders$.asObservable().pipe(
      map((loaders) => {
        return loaders[loaderId] > 0;
      }),
      distinctUntilChanged((prev, curr) => {
        return !!prev === !!curr;
      })
    );
  }

  public static loading<T>(loaderId: LoaderType) {
    return (source: Observable<T>) => {
      Loaders.updateLoaders(loaderId, 1);

      return source.pipe(finalize(() => Loaders.updateLoaders(loaderId, -1)));
    };
  }

  private static get loaders(): Record<LoaderType, number> {
    return Loaders.loaders$.value;
  }

  static updateLoaders(loaderId: LoaderType, amount: number): void {
    Loaders.loaders$.next({
      ...Loaders.loaders,
      [loaderId]: (Loaders.loaders[loaderId] || 0) + amount,
    });
  }
}