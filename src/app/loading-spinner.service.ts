import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  spinnerService$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  show = (param?: any): void => {
    this.spinnerService$.next(true);
  }
  hide = (param?: any): void => {
    this.spinnerService$.next(false);
  }
  getStatus = (param?: any): Observable<any> => {
    return this.spinnerService$.asObservable();
  }
}
