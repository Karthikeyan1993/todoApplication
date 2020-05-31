import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthGuard} from './auth.guard';
import {FreeGuard} from './free.guard';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ActivateComponent} from './activate/activate.component';
import {TodoResolverService} from './todo-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo'
  }, {
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthGuard],
    resolve: {todos: TodoResolverService}
  }, {
    path: 'signin',
    component: SignInComponent,
    canActivate: [FreeGuard]
  }, {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [FreeGuard]
  }, {
    path: 'forgot',
    component: ForgotPasswordComponent,
    canActivate: [FreeGuard]
  }, {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate: [FreeGuard]
  }, {
    path: 'activate',
    component: ActivateComponent,
    canActivate: [FreeGuard]
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
