import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, Validator} from '@angular/forms';
import {AuthService} from '../auth.service';
import {JwtAuthenticationResponse, SignInRequest} from '../shared/model';
import {Router} from '@angular/router';
import {AppSettings} from "../shared/AppSettings";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginFrm: FormGroup
  message;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginFrm = this.fb.group({
      userNameOrEmail: ['', Validators.required],
      password: ['', Validators.required
      ]
    });
  }

  submit = (event): void => {
    if (!this.loginFrm.invalid) {
      const param: SignInRequest = this.loginFrm.value;
      this.auth.signIn(param).subscribe((response: JwtAuthenticationResponse) => {
        this.handleToken(response);
        this.auth.isLoggedIn.next(true);
      }, (error => {
        console.log(error);
      }));
    }
  }

  private handleToken = (tokenResponse:JwtAuthenticationResponse):void=>{
    if (!localStorage.getItem(AppSettings.LOCAL_AUTH_TOKEN)){
      localStorage.setItem(AppSettings.LOCAL_AUTH_TOKEN,tokenResponse.accessToken);
      this.router.navigate(['todo']).then(r => console.log("User Token Received Successfully",r));
    }
  }
}
