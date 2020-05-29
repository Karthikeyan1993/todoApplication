import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  isSuccess: boolean;
  token: string;

  constructor(private router: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.router.queryParamMap.subscribe(ele => {
      this.token = ele.get('token');
      if (this.token) {
        console.log('token is available');
        this.authService.activateUserAccount(this.token)
          .subscribe((response) => {
            this.isSuccess = true;
            console.log('User account activated successfully', response);
          }, error => {
            this.isSuccess = false;
            console.log('error while activating user account', error);
          });
      }
    });
  }

}
