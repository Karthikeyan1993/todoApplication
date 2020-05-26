import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot:FormGroup
  constructor(private fb:FormBuilder) {
    this.forgot = this.fb.group(({
      usernameEmail:['',[Validators.required]]
    }))
  }

  ngOnInit(): void {
  }

  onSubmit = () =>{
    if(this.forgot.valid){
      console.log(this.forgot.value);
    }
  }

}
