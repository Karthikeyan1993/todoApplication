import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  reset: FormGroup

  constructor(private fb: FormBuilder) {
    this.reset = this.fb.group({
      usernameEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    if (this.reset.valid) {
      console.log(this.reset.value);
    }
  }

}
