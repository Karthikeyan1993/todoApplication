import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, Validator} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  message;
  isUseNameAvailable = false;
  isEmailAvailable = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private _Router: Router) {
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

      }
    }
  }

  checkUserNameAlreadyAvailable = (key: string): void => {
    if (this.signUp.controls[key].valid) {
      console.log(this.signUp.controls[key].value);
    }
  }

  checkEmailAlreadyAvailable = (key: string): void => {
    if (this.signUp.controls[key].valid) {
      console.log(this.signUp.controls[key].value);
    }
  }
}
