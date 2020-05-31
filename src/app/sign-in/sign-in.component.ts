import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {JwtAuthenticationResponse, SignInRequest} from '../shared/model';
import {Router} from '@angular/router';
import {AppSettings} from '../shared/AppSettings';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginFrm: FormGroup;
  message;
  errors = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginFrm = this.fb.group({
      userNameOrEmail: ['', Validators.required],
      password: ['', Validators.required
      ]
    });
  }

  submit = (): void => {
    if (!this.loginFrm.invalid) {
      const param: SignInRequest = this.loginFrm.value;
      this.auth.signIn(param).subscribe((response: JwtAuthenticationResponse) => {
        this.handleToken(response);
        this.auth.isLoggedIn.next(true);
      }, (error => {
        this.errors = [];
        this.errors.push(error.statusText);
        this.message = error.error.message;
      }));
    } else {
      this.collectErrors(this.loginFrm);
    }
  }


  collectErrors = (form?: FormGroup) => {
    for (const ele in form.controls) {
      if (form.controls[ele].status === 'INVALID') {
        if ('required' in form.controls[ele].errors) {
          this.errors.push(ele);
        }
      }
    }
    if (this.errors.length > 0) {
      this.message = 'Please provide all marked <span class=\'p-1 required\'>*</span> information';
    }
  }

  private handleToken = (tokenResponse: JwtAuthenticationResponse): void => {
    if (!localStorage.getItem(AppSettings.LOCAL_AUTH_TOKEN)) {
      localStorage.setItem(AppSettings.LOCAL_AUTH_TOKEN, tokenResponse.accessToken);
      this.router.navigate(['todo']).then(r => console.log('User Token Received Successfully', r));
    }
  }
}
