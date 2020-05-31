import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoComponent} from './todo/todo.component';
import {TaskComponent} from './task/task.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DataGridComponent} from './data-grid/data-grid.component';
import {DataSortPipe} from './data-sort.pipe';
import {DataFilterPipe} from './data-filter.pipe';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {HttpInterceptorService} from './http-interceptor.service';
import {SharedModule} from './shared/shared.module';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng9LoadingSpinnerComponent } from './ng9-loading-spinner/ng9-loading-spinner.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskComponent,
    NavBarComponent,
    PageNotFoundComponent,
    DataGridComponent,
    DataSortPipe,
    DataFilterPipe,
    SignInComponent,
    SignUpComponent,
    Ng9LoadingSpinnerComponent,
    EditTaskComponent,
    ActivateComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [ScrollDispatcher, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
