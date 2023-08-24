import { Pipe, PipeTransform } from "@angular/core";
import { debounceTime } from "rxjs";
import { LoaderType, Loaders } from "../operators/loaders";

@Pipe({
    name: 'isLoading',
    standalone: true,
  })
  export class IsLoadingPipe implements PipeTransform {
    transform(loaderId: LoaderType) {
      return Loaders.isLoading(loaderId).pipe(debounceTime(100));
    }
  }