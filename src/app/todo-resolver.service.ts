import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TodoRequest} from './shared/model';
import {TodoService} from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<any> {

  constructor(private todoService: TodoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.todoService.getAllTodos();
  }
}
