import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ResetPasswordRequest} from '../shared/model';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  reset: FormGroup;
  @ViewChild('template') template;
  bsConfirmationModalRef: BsModalRef = null;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private authService: AuthService, public bsModalService: BsModalService) {
    this.reset = this.fb.group({
      usernameEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((ele) => {
      this.token = ele.get('token');
    });
  }

  onSubmit = () => {
    if (this.reset.valid) {
      const param: ResetPasswordRequest = {
        userNameOrEmail: this.reset.controls.usernameEmail.value,
        password: this.reset.controls.password.value,
        token: this.token
      };
      if (this.token) {
        this.authService.resetPassword(param)
          .subscribe((response) => {
            const initialState = {
              class: 'modal-lg modal-dialog-centered',
            };
            this.bsConfirmationModalRef = this.bsModalService.show(
              this.template,
              initialState
            );
            this.reset.reset();
            console.log('user password changed successfully', response);
          }, error => {
            console.log('Error while changing user password', error);
          });
      }
    }
  }

}
