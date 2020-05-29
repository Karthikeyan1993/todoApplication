import {Component, OnInit} from '@angular/core';
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

  constructor(private auth: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
      if (this.isLoggedIn) {
        this.getUserProfile();
      }
    });
  }

  getUserProfile = (): void => {
    this.userService.getUserDetails().subscribe((response: UserDetailResponse) => {
      this.username = response.username;
      console.log('user profile retrieved successfully' , response);
    }, (error) => {
      console.log('error while retrieving user profile', error);
    });
  }

  logOut = (): void => {
    this.auth.signOut();
  }

}
