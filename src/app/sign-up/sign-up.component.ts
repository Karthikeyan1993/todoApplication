import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {SignUpRequest} from '../shared/model';
import {AuthService} from '../auth.service';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  isUseNameAvailable = false;
  isEmailAvailable = false;
  errMessage = '';
  isSuccess = false;
  email;
  bsConfirmationModalRef: BsModalRef = null;
  @ViewChild('template') template;

  // tslint:disable-next-line:max-line-length
  constructor(
    public bsModalService: BsModalService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.signUp = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit = (): void => {
    if (!this.signUp.invalid) {
      if (!this.isEmailAvailable && !this.isUseNameAvailable) {
        const request: SignUpRequest = {
          username: this.signUp.controls.username.value,
          email: this.signUp.controls.email.value,
          password: this.signUp.controls.password.value,
        };
        this.authService.signUp(request).subscribe(
          (res) => {
            this.isSuccess = true;
            this.email = this.signUp.controls.email.value;
            const initialState = {
              email: this.email,
              class: 'modal-lg modal-dialog-centered',
            };
            this.bsConfirmationModalRef = this.bsModalService.show(
              this.template,
              initialState
            );
            this.signUp.reset();
            console.log('User account created successfully', res);
          },
          (error) => {
            console.log('Error while creating new user profile', error);
          }
        );
      }
    }
  }

  checkUserNameAlreadyAvailable = (key: string): void => {
    if (this.signUp.controls[key].valid) {
      this.userService
        .isUserNameAlreadyExists(this.signUp.controls[key].value)
        .subscribe(
          (ele) => {
            this.isUseNameAvailable = ele;
            if (ele) {
              this.errMessage = 'Username already used';
            } else {
              this.errMessage = '';
            }
          },
          (error) => {
            this.isUseNameAvailable = false;
            console.log('Error while checking username', error);
          }
        );
    }
  }

  checkEmailAlreadyAvailable = (key: string): void => {
    if (this.signUp.controls[key].valid) {
      this.userService
        .isEmailAlreadyExists(this.signUp.controls[key].value)
        .subscribe(
          (ele) => {
            this.isEmailAvailable = ele;
            if (ele) {
              this.errMessage = 'Email already used';
            } else {
              this.errMessage = '';
            }
          },
          (error) => {
            this.isEmailAvailable = false;
            console.log('Error while checking email', error);
          }
        );
    }
  }
}
