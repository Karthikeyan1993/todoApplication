import {Injectable} from '@angular/core';
import {AppSettings} from './shared/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() {
  }

  isAuthenticated = (param?: any) => {
    return localStorage.getItem(AppSettings.LOCAL_AUTH_TOKEN) !== null;
  }
}
