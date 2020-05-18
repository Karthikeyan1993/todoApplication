import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  message = null;
  constructor(private fb: FormBuilder, private _Router: Router) { }

  ngOnInit() {
    this.signUp = this.fb.group({
      username: ["", Validators.required],
      name: ["", Validators.required],
      email: ["", Validators.required],
      mobile: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9 \'\-]+$'), Validators.minLength(8)]],
      repeatpassword: ["", Validators.required],
      address: ["", [Validators.required, Validators.maxLength(30)]]
    });
  }

  submit = (e) => {
    // if (this.signUp.valid) {
    //   if (this.signUp.controls['password'].value != this.signUp.controls['repeatpassword']) {
    //     this.message = 'password not matched';
    //   }
    //   this.message = null;
    //   if (!localStorage.getItem('users')) {
    //     localStorage.setItem('users', JSON.stringify([]));
    //   }
    //   let users = [];
    //   users = JSON.parse(localStorage.getItem('users'));
    //   if (!this.isAvailable(users, this.signUp.value)) {
    //     users.push(this.signUp.value);
    //     localStorage.setItem('users', JSON.stringify(users));
    //     alert('user profile created succesfully,Please login')
    //     this._Router.navigate(['auth/login']);
    //   } else {
    //     this.message = "Username or email already available";
    //   }

    // } else {
    //   this.message = 'Please provide your all details to login.';
    // }
  }

  isAvailable = (users, user) => {
    let obj = users.find((ele) => {
      return ele.username == user.username || ele.email == user.email;
    });
    return obj ? true : false;
  }
}
