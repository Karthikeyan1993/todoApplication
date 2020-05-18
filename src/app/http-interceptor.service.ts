import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {AuthenticationService} from "./authentication.service";
import {AppSettings} from './shared/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private auth: AuthenticationService) {
  }

  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        headers: req.headers.set(AppSettings.HEADER_STRING, AppSettings.TOKEN_PREFIX + localStorage.getItem(AppSettings.LOCAL_AUTH_TOKEN))
      })
    }
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log("response received successfully");
      }
      return event;
    }), catchError((error: HttpErrorResponse) => {
      console.error("http request failed--->>>", req.url);
      return throwError(error);
    }));
  }
}
