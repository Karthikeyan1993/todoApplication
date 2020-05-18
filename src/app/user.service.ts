import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserDetailResponse} from './shared/model';
import {AppSettings} from './shared/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_ME_URL = 'api/v1/users/active';

  constructor(private http: HttpClient) {
  }

  getUserDetails = (param?: any): Observable<UserDetailResponse> => {
    return this.http.get<UserDetailResponse>(AppSettings.APP_BASE_URL + `${this.USER_ME_URL}`)
      .pipe(map((response: UserDetailResponse) => response),
        catchError((error) => {
          console.log("Error while retrieving getting user detail", error);
          return throwError(error);
        }));
  }
}
