import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgot = this.fb.group(({
      usernameEmail: ['', [Validators.required]]
    }));
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    if (this.forgot.valid) {
      this.authService.getResetPasswordLink(this.forgot.controls.usernameEmail.value)
        .subscribe(ele => {
          console.log(ele);
        }, error => {
          console.log(error);
        });
    }
  }

}
