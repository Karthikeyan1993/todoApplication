import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthGuard} from "./auth.guard";
import {FreeGuard} from "./free.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo'
  }, {
    path: 'todo',
    component: TodoComponent,
    canActivate:[AuthGuard]
  }, {
    path: 'signin',
    component: SignInComponent,
    canActivate:[FreeGuard]
  }, {
    path: 'signup',
    component: SignUpComponent,
    canActivate:[FreeGuard]
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
