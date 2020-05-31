import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot: FormGroup;
  bsConfirmationModalRef: BsModalRef = null;
  errorMessage = '';
  @ViewChild('template') template;

  constructor(private fb: FormBuilder, private authService: AuthService, public bsModalService: BsModalService) {
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
          this.errorMessage = '';
          const initialState = {
            class: 'modal-lg modal-dialog-centered',
          };
          this.bsConfirmationModalRef = this.bsModalService.show(
            this.template,
            initialState
          );
          this.forgot.reset();
          console.log('Email or Username validated successfully');
        }, error => {
          console.log(error);
          this.errorMessage = error.error.message;
          console.log('Error while validating username or email');
        });
    }
  }

}
