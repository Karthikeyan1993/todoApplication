import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';

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
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScrollingModule,
    AppRoutingModule
  ],
  providers: [ScrollDispatcher],
  bootstrap: [AppComponent]
})
export class AppModule {
}
