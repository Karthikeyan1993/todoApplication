import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {AuthService} from '../auth.service';
import {UserService} from '../user.service';
import {UserDetailResponse} from '../shared/model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string;
  isLoggedIn: boolean;

  constructor(private auth: AuthService, private userService: UserService, private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
      if (this.isLoggedIn) {
        this.getUserProfile();
      }
    });
  }

  getUserProfile = (param?: any): void => {
    this.userService.getUserDetails().subscribe((response: UserDetailResponse) => {
      this.username = response.username;
    }, (error) => {
      console.log(error);
    });
  }

  logOut = (param?: any): void => {
    this.auth.signOut();
  }

}
