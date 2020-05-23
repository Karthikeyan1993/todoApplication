import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, Validator} from "@angular/forms";
import {Router} from '@angular/router';
import {UserService} from "../user.service";
import {SignUpRequest} from "../shared/model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  isUseNameAvailable = false;
  isEmailAvailable = false;
  errMessage = "";
  isSuccess = false;

  constructor(private fb: FormBuilder, private _Router: Router, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.signUp = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      repeatpassword: ["", Validators.required]
    });
  }

  submit = (event): void => {
    if (!this.signUp.invalid) {
      if (this.isEmailAvailable && this.isUseNameAvailable) {
        const request: SignUpRequest = {
          username: this.signUp.controls.key['username'].value,
          email: this.signUp.controls.key['email'].value,
          password: this.signUp.controls.key['password'].value
        }
        this.authService.signUp(request).subscribe((res) => {
          this.isSuccess = true;
        }, error => {
          console.log("Error while created new user profile")
        });
      }
    }
  }

  checkUserNameAlreadyAvailable = (key: string): void => {
    if (this.signUp.controls[key].valid) {
      this.userService.isUserNameAlreadyExists(this.signUp.controls[key].value)
        .subscribe((ele) => {
          this.isUseNameAvailable = ele;
          if (!ele) {
            this.errMessage = "Username already used";
          } else {
            this.errMessage = ''
          }
        }, error => {
          this.isUseNameAvailable = false;
          console.log("Error while checking username")
        });
    }
  }

  checkEmailAlreadyAvailable = (key: string): void => {
    if (this.signUp.controls[key].valid) {
      this.userService.isEmailAlreadyExists(this.signUp.controls[key].value)
        .subscribe((ele) => {
          this.isEmailAvailable = ele;
          if (!ele) {
            this.errMessage = "Email already used";
          } else {
            this.errMessage = ''
          }
        }, error => {
          this.isEmailAvailable = false;
          console.log("Error while checking email")
        });
    }
  }
}
