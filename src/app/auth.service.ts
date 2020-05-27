import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {SignUpRequest, SignInRequest, JwtAuthenticationResponse} from './shared/model';
import { AppSettings } from './shared/AppSettings';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SIGN_IN_URL = 'api/v1/auth/signin';
  private readonly SIGN_UP_URL = 'api/v1/auth/signup';
  private readonly PASSWORD_RESET_LINK = 'api/v1/auth/getResetPasswordLink/';
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
  }

  signIn = (param: SignInRequest): Observable<JwtAuthenticationResponse> => {
    return this.http.post<JwtAuthenticationResponse>(AppSettings.APP_BASE_URL + `${this.SIGN_IN_URL}`, param)
      .pipe(map((res: JwtAuthenticationResponse) => res),
        catchError((error) => {
          console.log('Error while SignInRequest', error);
          return throwError(error);
        }));
  }

  signUp = (param: SignUpRequest): Observable<any> => {
    return this.http.post<Observable<any>>(AppSettings.APP_BASE_URL + `${this.SIGN_UP_URL}`, param)
      .pipe(map((res) => res),
        catchError((error) => {
          console.log('Error while SignUpRequest', error);
          return throwError(error);
        }));
  }

  getResetPasswordLink = (emailOrUsername: string) => {
    return this.http.get(AppSettings.APP_BASE_URL + `${this.PASSWORD_RESET_LINK}` + emailOrUsername)
      .pipe(map((res) => res),
        catchError((error) => {
          console.log('Error while getPasswordResetLink', error);
          return throwError(error);
        }));
  }

  signOut = (): void => {
    if (localStorage.getItem(AppSettings.LOCAL_AUTH_TOKEN) !== null) {
      localStorage.removeItem(AppSettings.LOCAL_AUTH_TOKEN);
      this.isLoggedIn.next(false);
      this.router.navigate(['signin']).then(r => {
        console.log('Sign Out Successfully', r);
      });
    }
  }
}
